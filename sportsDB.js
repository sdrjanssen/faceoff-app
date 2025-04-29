import { sportsDBApi } from './api';

// Premier League ID = 4328 in TheSportsDB
const EPL_LEAGUE_ID = 4328;

// Alle Premier League teams ophalen
export const getAllEPLTeams = async () => {
    try {
        const response = await sportsDBApi.get(`lookup_all_teams.php?id=${4328}`);
        const teams = response.data.teams || [];
        return teams;
    } catch (error) {
        console.error('Error fetching EPL teams:', error);
        return [];
    }
};

// Details van een specifiek team ophalen
export const getTeamDetails = async (teamId) => {
    try {
        const response = await sportsDBApi.get(`lookupteam.php?id=${teamId}`);
        if (response.data.teams && response.data.teams.length > 0) {
            return response.data.teams[0];
        } else {
            throw new Error('Team niet gevonden');
        }
    } catch (error) {
        console.error('Error fetching team details:', error);
        throw new Error('Kon teamdetails niet ophalen');
    }
};

// Spelers van een team ophalen
export const getTeamPlayers = async (teamId) => {
    try {
        const response = await sportsDBApi.get(`lookup_all_players.php?id=${teamId}`);
        return response.data.player || [];
    } catch (error) {
        console.error('Error fetching team players:', error);
        throw new Error('Kon spelers niet ophalen');
    }
};

// Zoeken naar teams (gebruikt ALLEEN de API)
export const searchTeams = async (query) => {
    try {
        const response = await sportsDBApi.get(`searchteams.php?t=${encodeURIComponent(query)}`);

        if (response.data.teams && response.data.teams.length > 0) {
            // Filter de resultaten om alleen EPL teams te behouden
            const eplTeams = response.data.teams.filter(team =>
                team.idLeague === EPL_LEAGUE_ID.toString() ||
                team.strLeague === "English Premier League"
            );

            if (eplTeams.length > 0) {
                return eplTeams;
            }
        }

        const allTeamsResponse = await sportsDBApi.get(`lookup_all_teams.php?id=${EPL_LEAGUE_ID}`);

        if (allTeamsResponse.data.teams && allTeamsResponse.data.teams.length > 0) {
            // Zoek door de teams
            const searchTerm = query.toLowerCase();
            const filteredTeams = allTeamsResponse.data.teams.filter(team => {
                const teamName = team.strTeam.toLowerCase();
                return teamName.includes(searchTerm);
            });

            return filteredTeams;
        }

        // geen resultaten van de API
        return [];
    } catch (error) {
        console.error('Error searching teams:', error);
        return [];
    }
};

// Functie voor spelers zoeken
export const searchPlayers = async (query) => {
    try {
        // Directe zoekopdracht
        const response = await sportsDBApi.get(`searchplayers.php?p=${query}`);

        // Als er resultaten zijn, filter dan de voetbalspelers
        if (response.data.player && response.data.player.length > 0) {
            return response.data.player.filter(player => player.strSport === 'Soccer');
        }

        // Probeer op delen van naam
        if (query.includes(' ')) {
            const nameParts = query.split(' ');

            // Probeer op achternaam
            if (nameParts.length > 1) {
                const lastName = nameParts[nameParts.length - 1];
                if (lastName.length >= 3) { // Alleen als achternaam minstens 3 tekens is
                    const lastNameResponse = await sportsDBApi.get(`searchplayers.php?p=${lastName}`);
                    if (lastNameResponse.data.player && lastNameResponse.data.player.length > 0) {
                        // Filter op voetbal en filter verder op basis van volledige naam
                        return lastNameResponse.data.player
                            .filter(player => player.strSport === 'Soccer')
                            .filter(player => {
                                const playerName = player.strPlayer.toLowerCase();
                                return nameParts.some(part =>
                                    part.length >= 3 && playerName.includes(part.toLowerCase())
                                );
                            });
                    }
                }
            }

            // Probeer op voornaam
            if (nameParts[0].length >= 3) {
                const firstNameResponse = await sportsDBApi.get(`searchplayers.php?p=${nameParts[0]}`);
                if (firstNameResponse.data.player && firstNameResponse.data.player.length > 0) {
                    return firstNameResponse.data.player
                        .filter(player => player.strSport === 'Soccer')
                        .filter(player => {
                            const playerName = player.strPlayer.toLowerCase();
                            return nameParts.some(part =>
                                part.length >= 3 && playerName.includes(part.toLowerCase())
                            );
                        });
                }
            }
        }

        // Standaard: lege array teruggeven als niets werkt
        return [];
    } catch (error) {
        console.error('Error searching players:', error);
        throw new Error('Kon spelers niet zoeken');
    }
};

// Competitiestand ophalen voor Premier League
export const getLeagueStandings = async () => {
    try {
        const response = await sportsDBApi.get(`lookuptable.php?l=${4328}&s=2024-2025`);
        return response.data.table || [];
    } catch (error) {
        console.error('Error fetching standings:', error);
        throw new Error('Kon competitiestand niet ophalen');
    }
};

// Functie om komende wedstrijden op te halen
export const getUpcomingEvents = async () => {
    try {
        // Haal eerst alle Premier League teams op
        const teams = await getAllEPLTeams();

        // Array om alle wedstrijden in op te slaan
        let allEvents = [];

        // ophalen events per team tot 5 teams
        const teamsToQuery = teams.slice(0, 5);

        for (const team of teamsToQuery) {
            try {
                // Haal wedstrijden op voor dit team
                const response = await sportsDBApi.get(`eventsnext.php?id=${team.idTeam}`);
                if (response.data.events && response.data.events.length > 0) {
                    // Voeg wedstrijden toe aan de verzameling
                    allEvents = [...allEvents, ...response.data.events];
                }
            } catch (err) {
                console.warn(`Kon geen wedstrijden ophalen voor team ${team.strTeam}`, err);
                // We gaan door met andere teams als er één faalt
            }
        }

        // Filter dubbele wedstrijden
        const uniqueEvents = allEvents.filter((event, index, self) =>
            index === self.findIndex((e) => e.idEvent === event.idEvent)
        );

        // Converteer naar het gewenste formaat voor de TV-gids
        return uniqueEvents.map(event => ({
            id: event.idEvent,
            homeTeam: event.strHomeTeam,
            homeTeamId: event.idHomeTeam,
            awayTeam: event.strAwayTeam,
            awayTeamId: event.idAwayTeam,
            date: event.dateEvent,
            time: event.strTime || "15:00", // Standaardtijd als deze niet beschikbaar is
            channel: determineChannel(event), // Helper functie om kanaal te bepalen
            isNational: isNationalBroadcast(event) // Helper functie voor nationale uitzending
        }));
    } catch (error) {
        console.error('Error fetching upcoming events:', error);
        return [];
    }
};

// Helper functie om een kanaal te bepalen
function determineChannel(event) {
    const channels = ["Sky Sports", "BT Sport", "Amazon Prime", "BBC"];
    const channelIndex = parseInt(event.idEvent.slice(-2)) % channels.length;
    return channels[channelIndex];
}

// Helper functie om te bepalen of het een nationale uitzending is
function isNationalBroadcast(event) {
    const eventNumber = parseInt(event.idEvent.slice(-3));
    return eventNumber % 10 < 6;
}