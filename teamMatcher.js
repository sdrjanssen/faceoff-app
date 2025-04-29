// Team finder vragen en opties data - aangepast voor voetbal
export const teamFinderQuestions = [
    {
        id: 1,
        question: "Hoe belangrijk is een aanvallende speelstijl voor jou?",
        options: [
            { id: 'offensive-1', text: "Niet belangrijk", value: 1 },
            { id: 'offensive-2', text: "Enigszins belangrijk", value: 2 },
            { id: 'offensive-3', text: "Belangrijk", value: 3 },
            { id: 'offensive-4', text: "Zeer belangrijk", value: 4 },
            { id: 'offensive-5', text: "Essentieel", value: 5 }
        ],
        category: "playStyle"
    },
    {
        id: 2,
        question: "Hoe belangrijk is een sterke verdediging voor jou?",
        options: [
            { id: 'defensive-1', text: "Niet belangrijk", value: 1 },
            { id: 'defensive-2', text: "Enigszins belangrijk", value: 2 },
            { id: 'defensive-3', text: "Belangrijk", value: 3 },
            { id: 'defensive-4', text: "Zeer belangrijk", value: 4 },
            { id: 'defensive-5', text: "Essentieel", value: 5 }
        ],
        category: "playStyle"
    },
    {
        id: 3,
        question: "Hoe belangrijk is de geschiedenis en traditie van een club voor jou?",
        options: [
            { id: 'history-1', text: "Niet belangrijk", value: 1 },
            { id: 'history-2', text: "Enigszins belangrijk", value: 2 },
            { id: 'history-3', text: "Belangrijk", value: 3 },
            { id: 'history-4', text: "Zeer belangrijk", value: 4 },
            { id: 'history-5', text: "Essentieel", value: 5 }
        ],
        category: "history"
    },
    {
        id: 4,
        question: "Hoe belangrijk is een recent succesvol team voor jou?",
        options: [
            { id: 'success-1', text: "Niet belangrijk", value: 1 },
            { id: 'success-2', text: "Enigszins belangrijk", value: 2 },
            { id: 'success-3', text: "Belangrijk", value: 3 },
            { id: 'success-4', text: "Zeer belangrijk", value: 4 },
            { id: 'success-5', text: "Essentieel", value: 5 }
        ],
        category: "success"
    },
    {
        id: 5,
        question: "Welke regio in Engeland heeft jouw voorkeur?",
        options: [
            { id: 'region-1', text: "Londen", value: "london" },
            { id: 'region-2', text: "Manchester", value: "manchester" },
            { id: 'region-3', text: "Liverpool/Merseyside", value: "liverpool" },
            { id: 'region-4', text: "Noord-Engeland", value: "northEngland" },
            { id: 'region-5', text: "Midlands", value: "midlands" },
            { id: 'region-6', text: "Zuid-Engeland", value: "southEngland" },
            { id: 'region-7', text: "Geen voorkeur", value: "noPreference" }
        ],
        category: "location"
    },
    {
        id: 6,
        question: "Volg je liever een team met jonge talenten of ervaren spelers?",
        options: [
            { id: 'team-1', text: "Voornamelijk jonge talenten", value: "young" },
            { id: 'team-2', text: "Mix met nadruk op jonge spelers", value: "mostlyYoung" },
            { id: 'team-3', text: "Evenwichtige mix", value: "balanced" },
            { id: 'team-4', text: "Mix met nadruk op ervaren spelers", value: "mostlyVeteran" },
            { id: 'team-5', text: "Voornamelijk ervaren spelers", value: "veteran" }
        ],
        category: "teamComposition"
    },
    {
        id: 7,
        question: "Hoe belangrijk is het hebben van supersterren in het team voor jou?",
        options: [
            { id: 'stars-1', text: "Niet belangrijk", value: 1 },
            { id: 'stars-2', text: "Enigszins belangrijk", value: 2 },
            { id: 'stars-3', text: "Belangrijk", value: 3 },
            { id: 'stars-4', text: "Zeer belangrijk", value: 4 },
            { id: 'stars-5', text: "Essentieel", value: 5 }
        ],
        category: "stars"
    }
];

// Hardcoded team data met attributen voor matching - aangepast voor Premier League teams
// In een echte applicatie zou je deze data uit een database halen of API
export const teamAttributes = [
    {
        id: "133604",
        name: "Manchester United",
        offensiveStyle: 4,
        defensiveStyle: 3,
        history: 5,
        success: 3,
        region: "manchester",
        teamComposition: "balanced",
        stars: 4,
        topPlayers: ["Bruno Fernandes", "Marcus Rashford", "Mason Mount"],
        description: "Een van de meest succesvolle clubs in Engeland met een rijke historie. Manchester United staat bekend om hun aanvallende speelstijl en grote fanbase wereldwijd."
    },
    {
        id: "133602",
        name: "Arsenal",
        offensiveStyle: 4,
        defensiveStyle: 4,
        history: 4,
        success: 4,
        region: "london",
        teamComposition: "mostlyYoung",
        stars: 4,
        topPlayers: ["Bukayo Saka", "Martin Ødegaard", "Declan Rice"],
        description: "Een Londense topclub met een rijke historie en sterke jeugdopleiding. Arsenal speelt technisch, aanvallend voetbal onder leiding van Mikel Arteta."
    },
    {
        id: "133610",
        name: "Liverpool",
        offensiveStyle: 5,
        defensiveStyle: 4,
        history: 5,
        success: 5,
        region: "liverpool",
        teamComposition: "balanced",
        stars: 4,
        topPlayers: ["Mohamed Salah", "Virgil van Dijk", "Alexis Mac Allister"],
        description: "Een van de meest succesvolle Engelse clubs met een passionele fanbase. Liverpool staat bekend om hun hoge pressing en intensieve speelstijl."
    },
    {
        id: "133613",
        name: "Chelsea",
        offensiveStyle: 3,
        defensiveStyle: 4,
        history: 4,
        success: 4,
        region: "london",
        teamComposition: "balanced",
        stars: 4,
        topPlayers: ["Enzo Fernández", "Cole Palmer", "Reece James"],
        description: "Een Londense topclub met veel internationale successen in de recente geschiedenis. Chelsea investeert flink in talentvolle spelers."
    },
    {
        id: "133615",
        name: "Manchester City",
        offensiveStyle: 5,
        defensiveStyle: 4,
        history: 3,
        success: 5,
        region: "manchester",
        teamComposition: "veteran",
        stars: 5,
        topPlayers: ["Erling Haaland", "Kevin De Bruyne", "Phil Foden"],
        description: "De dominante ploeg in Engeland van de afgelopen jaren, geleid door Pep Guardiola. Man City staat bekend om hun verzorgde, dominante speelstijl."
    },
    {
        id: "133616",
        name: "Tottenham Hotspur",
        offensiveStyle: 4,
        defensiveStyle: 3,
        history: 3,
        success: 3,
        region: "london",
        teamComposition: "mostlyYoung",
        stars: 3,
        topPlayers: ["Son Heung-min", "James Maddison", "Dejan Kulusevski"],
        description: "Een ambitieuze Londense club met een modern stadion. Tottenham combineert balbezit met een snelle omschakeling en heeft veel talent uit de jeugdopleiding."
    },
    {
        id: "133611",
        name: "Newcastle United",
        offensiveStyle: 3,
        defensiveStyle: 4,
        history: 4,
        success: 3,
        region: "northEngland",
        teamComposition: "balanced",
        stars: 3,
        topPlayers: ["Bruno Guimarães", "Alexander Isak", "Anthony Gordon"],
        description: "Een club met passionele supporters en rijke traditie uit het noorden van Engeland. Newcastle heeft ambitieuze eigenaren en is bezig met een opwaartse trend."
    },
    {
        id: "133632",
        name: "Everton",
        offensiveStyle: 2,
        defensiveStyle: 4,
        history: 4,
        success: 2,
        region: "liverpool",
        teamComposition: "balanced",
        stars: 2,
        topPlayers: ["Dominic Calvert-Lewin", "Jarrad Branthwaite", "Jordan Pickford"],
        description: "Een van de oudste clubs in Engeland met een rijke traditie. Everton speelt met veel strijd en is trots op hun identiteit als 'volksclub' uit Liverpool."
    },
    {
        id: "133624",
        name: "Aston Villa",
        offensiveStyle: 4,
        defensiveStyle: 3,
        history: 4,
        success: 3,
        region: "midlands",
        teamComposition: "balanced",
        stars: 3,
        topPlayers: ["Ollie Watkins", "Moussa Diaby", "Emiliano Martínez"],
        description: "Een club met rijke historie uit Birmingham. Aston Villa is een van de oprichters van de Engelse competitie en speelt attractief voetbal onder Unai Emery."
    },
    {
        id: "133619",
        name: "West Ham United",
        offensiveStyle: 3,
        defensiveStyle: 3,
        history: 3,
        success: 2,
        region: "london",
        teamComposition: "mostlyVeteran",
        stars: 2,
        topPlayers: ["Mohammed Kudus", "Lucas Paquetá", "Jarrod Bowen"],
        description: "Een echte volksclub uit het oosten van Londen met een grote aanhang en rijke traditie. West Ham speelt met veel strijd en passie."
    },
    {
        id: "133626",
        name: "Brighton & Hove Albion",
        offensiveStyle: 4,
        defensiveStyle: 3,
        history: 2,
        success: 3,
        region: "southEngland",
        teamComposition: "mostlyYoung",
        stars: 2,
        topPlayers: ["Kaoru Mitoma", "Pervis Estupiñán", "João Pedro"],
        description: "Een moderne club uit het zuiden van Engeland die bekendstaat om hun verzorgde, aanvallende voetbal en slimme transferbeleid."
    },
    {
        id: "133635",
        name: "Leicester City",
        offensiveStyle: 3,
        defensiveStyle: 3,
        history: 3,
        success: 3,
        region: "midlands",
        teamComposition: "balanced",
        stars: 2,
        topPlayers: ["Jamie Vardy", "Wilfred Ndidi", "Kiernan Dewsbury-Hall"],
        description: "Een club die in 2016 voor een van de grootste verrassingen in de voetbalgeschiedenis zorgde door de Premier League te winnen. Leicester staat bekend om hun goede scouting."
    }
];

// Functie om teams te matchen met gebruikersvoorkeuren
export const matchTeamsToPreferences = (preferences) => {
    // Bereken voor elk team een score op basis van hoe goed het overeenkomt met de voorkeuren
    const teamScores = teamAttributes.map(team => {
        let score = 0;
        let maxPossibleScore = 0;

        // Offensieve stijl match
        if (preferences.offensive) {
            const offensiveMatch = 5 - Math.abs(team.offensiveStyle - preferences.offensive);
            score += offensiveMatch * preferences.offensive; // Weeg op basis van hoe belangrijk dit is voor de gebruiker
            maxPossibleScore += 5 * preferences.offensive;
        }

        // Defensieve stijl match
        if (preferences.defensive) {
            const defensiveMatch = 5 - Math.abs(team.defensiveStyle - preferences.defensive);
            score += defensiveMatch * preferences.defensive;
            maxPossibleScore += 5 * preferences.defensive;
        }

        // Geschiedenis match
        if (preferences.history) {
            const historyMatch = 5 - Math.abs(team.history - preferences.history);
            score += historyMatch * preferences.history;
            maxPossibleScore += 5 * preferences.history;
        }

        // Succes match
        if (preferences.success) {
            const successMatch = 5 - Math.abs(team.success - preferences.success);
            score += successMatch * preferences.success;
            maxPossibleScore += 5 * preferences.success;
        }

        // Regio match
        if (preferences.region && preferences.region !== "noPreference") {
            const regionMatch = team.region === preferences.region ? 5 : 0;
            score += regionMatch * 3; // Weeg regio als een gemiddeld belangrijk criterium
            maxPossibleScore += 5 * 3;
        }

        // Team samenstelling match
        if (preferences.teamComposition) {
            // Bereken hoe dicht de teamsamenstelling bij de voorkeur ligt
            const compositionOptions = ["young", "mostlyYoung", "balanced", "mostlyVeteran", "veteran"];
            const prefIndex = compositionOptions.indexOf(preferences.teamComposition);
            const teamIndex = compositionOptions.indexOf(team.teamComposition);

            if (prefIndex !== -1 && teamIndex !== -1) {
                const compositionMatch = 5 - Math.abs(teamIndex - prefIndex);
                score += compositionMatch * 3; // Weeg teamsamenstelling als een gemiddeld belangrijk criterium
                maxPossibleScore += 5 * 3;
            }
        }

        // Supersterren match
        if (preferences.stars) {
            const starsMatch = 5 - Math.abs(team.stars - preferences.stars);
            score += starsMatch * preferences.stars;
            maxPossibleScore += 5 * preferences.stars;
        }

        // Bereken een percentage match (0-100%)
        const percentageMatch = maxPossibleScore > 0 ? (score / maxPossibleScore) * 100 : 0;

        return {
            team,
            score,
            percentageMatch: Math.round(percentageMatch)
        };
    });

    // Sorteer de teams op basis van hun score (van hoog naar laag)
    const sortedTeams = teamScores.sort((a, b) => b.percentageMatch - a.percentageMatch);

    // Retourneer de top 3 teams
    return sortedTeams.slice(0, 3);
};