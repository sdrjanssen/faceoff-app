import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTeamDetails, getTeamPlayers } from '../services/sportsDB';
import { teamAttributes } from '../services/teamMatcher';
import './TeamDetails.css';

const TeamDetails = () => {
    const { teamId } = useParams();
    const [team, setTeam] = useState(null);
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [teamAttribute, setTeamAttribute] = useState(null);

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                setLoading(true);

                // Team details ophalen
                const teamData = await getTeamDetails(teamId);
                setTeam(teamData);

                // Spelers ophalen
                const playersData = await getTeamPlayers(teamId);

                // Sorteer spelers op populariteit/kwaliteit
                const sortedPlayers = playersData.sort((a, b) => b.strSigning - a.strSigning);
                setPlayers(sortedPlayers);

                // Team attributen vinden (voor de matchmaker)
                const attributes = teamAttributes.find(t => t.id === teamId);
                setTeamAttribute(attributes);

                setLoading(false);
            } catch (err) {
                console.error('Error fetching team data:', err);
                setError('Er is een fout opgetreden bij het ophalen van de teamgegevens.');
                setLoading(false);
            }
        };

        fetchTeamData();
    }, [teamId]);

    if (loading) {
        return (
            <div className="container">
                <div className="loading-container">
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <div className="alert alert-danger">
                    {error}
                </div>
            </div>
        );
    }

    if (!team) {
        return (
            <div className="container">
                <div className="alert alert-warning">
                    Team niet gevonden.
                </div>
            </div>
        );
    }

    return (
        <div className="container team-detail-container">
            {/* Team Header */}
            <div className="grid team-header-grid">
                <div className="team-logo-container">
                    <img
                        src={team.strTeamBadge}
                        alt={team.strTeam}
                        className="team-badge"
                    />
                </div>

                <div className="team-info-container">
                    <h1 className="team-title">{team.strTeam}</h1>

                    <div className="team-location">
                        <svg className="location-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 7 12 7s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
                        </svg>
                        <h3 className="stadium-location">
                            {team.strStadium}, {team.strStadiumLocation}
                        </h3>
                    </div>

                    <div className="team-tags">
                        <div className="chip">
                            <svg className="chip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM7 10.82C5.84 10.4 5 9.3 5 8V7h2v3.82zM19 8c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
                            </svg>
                            Opgericht in {team.intFormedYear}
                        </div>
                        <div className="chip">
                            <svg className="chip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                            </svg>
                            Competitie: {team.strLeague}
                        </div>
                        {teamAttribute && (
                            <div className={`chip ${teamAttribute.success >= 4 ? 'chip-success' : teamAttribute.success >= 3 ? 'chip-primary' : 'chip-default'}`}>
                                <svg className="chip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M14.24 12.96l2.53 1.94-1.09-3.35 2.75-1.84-3.39-.29-1.56-3.21-1.46 3.33-3.36.29 2.8 1.76-1.1 3.39 2.82-2.02zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                                </svg>
                                {teamAttribute.success >= 4 ? 'Top team' : teamAttribute.success >= 3 ? 'Subtopper' : 'Middenmoter'}
                            </div>
                        )}
                    </div>

                    <p className="team-description">
                        {team.strDescriptionNL || team.strDescriptionEN}
                    </p>
                </div>
            </div>

            <hr className="divider my-4" />

            {/* Team Kenmerken */}
            {teamAttribute && (
                <>
                    <h2 className="section-title mt-4">Team Kenmerken</h2>

                    <div className="grid team-attributes-grid">
                        <div className="grid-item">
                            <div className="card p-2">
                                <h3 className="attribute-title">Speelstijl</h3>
                                <div className="attribute-row">
                                    <span className="attribute-label">Aanvallend:</span>
                                    <div className="rating-dots">
                                        {[...Array(5)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`rating-dot ${i < teamAttribute.offensiveStyle ? 'active' : 'inactive'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="attribute-row">
                                    <span className="attribute-label">Verdedigend:</span>
                                    <div className="rating-dots">
                                        {[...Array(5)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`rating-dot ${i < teamAttribute.defensiveStyle ? 'active' : 'inactive'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid-item">
                            <div className="card p-2">
                                <h3 className="attribute-title">Team Samenstelling</h3>
                                <p className="attribute-description mb-2">
                                    {teamAttribute.teamComposition === 'young' && 'Voornamelijk jonge talenten'}
                                    {teamAttribute.teamComposition === 'mostlyYoung' && 'Mix met nadruk op jonge spelers'}
                                    {teamAttribute.teamComposition === 'balanced' && 'Evenwichtige mix van ervaring en talent'}
                                    {teamAttribute.teamComposition === 'mostlyVeteran' && 'Mix met nadruk op ervaren spelers'}
                                    {teamAttribute.teamComposition === 'veteran' && 'Voornamelijk ervaren spelers'}
                                </p>
                                <div className="attribute-row">
                                    <span className="attribute-label">Supersterren:</span>
                                    <div className="rating-dots">
                                        {[...Array(5)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`rating-dot ${i < teamAttribute.stars ? 'active' : 'inactive'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid-item">
                            <div className="card p-2">
                                <h3 className="attribute-title">Historie & Succes</h3>
                                <div className="attribute-row">
                                    <span className="attribute-label">Geschiedenis:</span>
                                    <div className="rating-dots">
                                        {[...Array(5)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`rating-dot ${i < teamAttribute.history ? 'active' : 'inactive'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="attribute-row">
                                    <span className="attribute-label">Recent succes:</span>
                                    <div className="rating-dots">
                                        {[...Array(5)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`rating-dot ${i < teamAttribute.success ? 'active' : 'inactive'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Top Spelers */}
            <h2 className="section-title mt-4">Top Spelers</h2>

            <div className="grid players-grid">
                {players.slice(0, 6).map((player) => (
                    <div className="grid-item" key={player.idPlayer}>
                        <div className="card player-card">
                            <img
                                src={player.strCutout || player.strThumb || 'https://via.placeholder.com/100x150?text=No+Image'}
                                alt={player.strPlayer}
                                className="player-image"
                            />
                            <div className="card-body">
                                <h3 className="player-name">{player.strPlayer}</h3>
                                <p className="player-position text-secondary">
                                    Positie: {getPositionTranslation(player.strPosition) || 'Onbekend'}
                                </p>
                                <p className="player-nationality text-secondary">
                                    Nationaliteit: {player.strNationality || 'Onbekend'}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Stadion Informatie */}
            <h2 className="section-title mt-6">Stadion Informatie</h2>

            <div className="grid stadium-grid">
                <div className="grid-item stadium-image-container">
                    <img
                        src={team.strStadiumThumb || 'https://via.placeholder.com/600x400?text=No+Stadium+Image'}
                        alt={team.strStadium}
                        className="stadium-image"
                    />
                </div>

                <div className="grid-item stadium-info-container">
                    <h3 className="stadium-name">{team.strStadium}</h3>

                    <p className="stadium-detail">
                        Locatie: {team.strStadiumLocation}
                    </p>

                    <p className="stadium-detail">
                        Capaciteit: {team.intStadiumCapacity || 'Onbekend'}
                    </p>

                    <p className="stadium-description">
                        {team.strStadiumDescription || 'Geen beschrijving beschikbaar.'}
                    </p>
                </div>
            </div>
        </div>
    );
};

// Helper functie om voetbalposities te vertalen
function getPositionTranslation(position) {
    if (!position) return 'Onbekend';

    const positionMap = {
        'Goalkeeper': 'Keeper',
        'Defender': 'Verdediger',
        'Midfielder': 'Middenvelder',
        'Forward': 'Aanvaller',
        'Left Back': 'Linksback',
        'Right Back': 'Rechtsback',
        'Centre-Back': 'Centrale Verdediger',
        'Central Midfield': 'Centrale Middenvelder',
        'Defensive Midfield': 'Verdedigende Middenvelder',
        'Attacking Midfield': 'Aanvallende Middenvelder',
        'Left Winger': 'Linkervleugelspeler',
        'Right Winger': 'Rechtervleugelspeler',
        'Centre-Forward': 'Spits',
    };

    return positionMap[position] || position;
}

export default TeamDetails;