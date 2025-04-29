import React, { useState, useEffect } from 'react';
import { getLeagueStandings } from '../services/sportsDB';
import './Standings.css';

const Standings = () => {
    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Competitiestand ophalen
                const data = await getLeagueStandings();
                setStandings(data);

                setLoading(false);
            } catch (err) {
                console.error('Error fetching standings:', err);
                setError('Er is een fout opgetreden bij het ophalen van de competitiestand.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
                <div className="alert alert-error">{error}</div>
            </div>
        );
    }

    // Check if we have standings data
    const hasStandingsData = standings && standings.length > 0;

    return (
        <div className="container standings-container">
            <h1 className="standings-title">Premier League Competitiestand</h1>

            {!hasStandingsData ? (
                <div className="alert alert-info">
                    Er zijn momenteel geen standingsgegevens beschikbaar. Dit kan komen doordat de competitie nog niet is begonnen of omdat de service tijdelijk niet beschikbaar is.
                </div>
            ) : (
                <div className="standings-table-container">
                    <table className="standings-table">
                        <thead>
                        <tr>
                            <th>Positie</th>
                            <th>Team</th>
                            <th>GS</th>
                            <th>W</th>
                            <th>G</th>
                            <th>V</th>
                            <th>PNT</th>
                            <th>DV</th>
                            <th>DT</th>
                            <th>+/-</th>
                        </tr>
                        </thead>
                        <tbody>
                        {standings.map((team, index) => (
                            <tr key={team.idStanding || index}>
                                <td>{team.intRank || index + 1}</td>
                                <td>
                                    <div className="team-cell">
                                        {team.strTeamBadge && (
                                            <img
                                                src={team.strTeamBadge}
                                                alt={team.strTeam || "Team logo"}
                                                className="team-logo"
                                            />
                                        )}
                                        {team.strTeam || team.strName || "Onbekend team"}
                                    </div>
                                </td>
                                <td className="text-center">{team.intPlayed}</td>
                                <td className="text-center">{team.intWin}</td>
                                <td className="text-center">{team.intDraw}</td>
                                <td className="text-center">{team.intLoss}</td>
                                <td className="text-center points-cell">
                                    {team.intPoints}
                                </td>
                                <td className="text-center">{team.intGoalsFor}</td>
                                <td className="text-center">{team.intGoalsAgainst}</td>
                                <td className="text-center">
                                    {team.intGoalDifference ||
                                        (team.intGoalsFor && team.intGoalsAgainst ?
                                            team.intGoalsFor - team.intGoalsAgainst : 0)}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Standings;