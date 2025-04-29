import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchTeams, searchPlayers } from '../services/sportsDB';
import './PlayerSearch.css';

const PlayerSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('teams');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searched, setSearched] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!searchTerm.trim()) return;

        setLoading(true);
        setError(null);
        setSearched(true);

        try {
            if (searchType === 'teams') {
                // Verbeterde teamzoekfunctie die de fallback gebruikt
                const teamsData = await searchTeams(searchTerm);
                setResults(teamsData || []);
            } else {
                // Verbeterde spelerzoekfunctie
                const playersData = await searchPlayers(searchTerm);
                setResults(playersData || []);
            }
        } catch (err) {
            console.error('Search error:', err);
            setError('Er is een fout opgetreden bij het zoeken. Probeer het later opnieuw.');
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleTabChange = (tabType) => {
        setSearchType(tabType);
        setResults([]);
        setSearched(false);
    };

    const handleTeamClick = (teamId) => {
        navigate(`/teams/${teamId}`);
    };

    return (
        <div className="player-search-container">
            <h1 className="search-title">Zoek Teams & Spelers</h1>

            <div className="search-tabs">
                <button
                    className={`tab-button ${searchType === 'teams' ? 'active' : ''}`}
                    onClick={() => handleTabChange('teams')}
                >
                    Teams
                </button>
                <button
                    className={`tab-button ${searchType === 'players' ? 'active' : ''}`}
                    onClick={() => handleTabChange('players')}
                >
                    Spelers
                </button>
            </div>

            <div className="search-bar">
                <div className="search-input-container">
                    <span className="search-icon"></span>
                    <input
                        type="text"
                        className="search-input"
                        placeholder={searchType === 'teams' ? "Zoek teams (bijv. Arsenal, Liverpool)" : "Zoek spelers (bijv. Salah, De Bruyne)"}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                </div>
                <button
                    className="search-button"
                    onClick={handleSearch}
                    disabled={loading || !searchTerm.trim()}
                >
                    Zoeken
                </button>
            </div>

            {loading && (
                <div className="loading-container">
                    <div className="spinner"></div>
                </div>
            )}

            {error && <div className="alert alert-error">{error}</div>}

            {!loading && searched && results.length === 0 && (
                <div className="alert alert-info">
                    Geen resultaten gevonden voor "{searchTerm}".
                </div>
            )}

            {!loading && results.length > 0 && (
                <div className="search-results">
                    <h2 className="results-count">
                        {results.length} {searchType === 'teams' ? 'Teams' : 'Spelers'} gevonden
                    </h2>

                    <div className="results-grid">
                        {searchType === 'teams' ? (
                            // Teams weergeven
                            results.map((team) => (
                                <div
                                    key={team.idTeam}
                                    className="team-card"
                                    onClick={() => handleTeamClick(team.idTeam)}
                                >
                                    <div className="team-card-inner">
                                        <div className="team-card-media">
                                            <img
                                                src={team.strTeamBadge}
                                                alt={team.strTeam}
                                                className="team-logo"
                                            />
                                        </div>
                                        <div className="team-card-content">
                                            <h3 className="team-name">{team.strTeam}</h3>
                                            <p className="team-league">{team.strLeague}</p>
                                            <p className="team-location">{team.strStadiumLocation}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            // Spelers weergeven
                            results.map((player) => (
                                <div key={player.idPlayer} className="player-card">
                                    <div className="player-card-inner">
                                        <div className="player-image">
                                            <img
                                                src={player.strCutout || player.strThumb || 'https://via.placeholder.com/100x150?text=No+Image'}
                                                alt={player.strPlayer}
                                                className="player-photo"
                                            />
                                        </div>
                                        <div className="player-info">
                                            <h3 className="player-name">{player.strPlayer}</h3>
                                            <p className="player-team">Team: {player.strTeam}</p>
                                            <p className="player-position">Positie: {getPositionTranslation(player.strPosition) || 'Onbekend'}</p>
                                            <p className="player-nationality">Nationaliteit: {player.strNationality || 'Onbekend'}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
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

export default PlayerSearch;