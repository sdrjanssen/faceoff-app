import React, { useState, useEffect } from 'react';
import { getUpcomingEvents } from '../services/sportsDB';
import './TvGuide.css';

const TvGuide = () => {
    const [tvGuideData, setTvGuideData] = useState([]);
    const [selectedDate, setSelectedDate] = useState("Alle datums");
    const [selectedChannel, setSelectedChannel] = useState("Alle zenders");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [availableDates, setAvailableDates] = useState([]);
    const [availableChannels, setAvailableChannels] = useState(["Alle zenders"]);

    // Haal TV-gids data op bij het laden van de component
    useEffect(() => {
        const fetchTvGuideData = async () => {
            try {
                setLoading(true);

                // Haal wedstrijden op via de Sports DB API
                const events = await getUpcomingEvents();

                if (!events || events.length === 0) {
                    setError('Geen wedstrijden gevonden in de TV-gids. Probeer het later nogmaals.');
                    setTvGuideData([]);
                    setLoading(false);
                    return;
                }

                setTvGuideData(events);

                // Verzamel unieke datums
                const dates = [...new Set(events.map(event => event.date))].sort();
                setAvailableDates(dates);

                // Verzamel unieke kanalen
                const channels = ["Alle zenders", ...new Set(events.map(event => event.channel))];
                setAvailableChannels(channels);

                setLoading(false);
            } catch (err) {
                console.error('Fout bij het ophalen van TV-gids data:', err);
                setError('Er is een fout opgetreden bij het ophalen van de TV-gids.');
                setLoading(false);
            }
        };

        fetchTvGuideData();
    }, []);

    // Filter de TV gids op basis van de geselecteerde filters
    const filteredGuide = tvGuideData.filter(item => {
        const dateMatch = selectedDate === "Alle datums" || item.date === selectedDate;
        const channelMatch = selectedChannel === "Alle zenders" || item.channel === selectedChannel;
        return dateMatch && channelMatch;
    });

    // Groepeer wedstrijden per datum
    const groupedByDate = filteredGuide.reduce((acc, game) => {
        if (!acc[game.date]) {
            acc[game.date] = [];
        }
        acc[game.date].push(game);
        return acc;
    }, {});

    // Helper functie om een datum te formatteren in Nederlands
    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString('nl-NL', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
            });
        } catch (e) {
            console.error('Error formatting date:', e);
            return dateString;
        }
    };

    return (
        <div className="tv-guide-container">
            <h1 className="tv-guide-title">Premier League TV Gids</h1>

            <p className="tv-guide-description">
                Bekijk wanneer en waar je Premier League wedstrijden live kunt kijken.
            </p>

            {/* Filters - alleen tonen als er data is */}
            {!loading && !error && tvGuideData.length > 0 && (
                <div className="filters-card">
                    <div className="filters-grid">
                        <div className="filter-group">
                            <label htmlFor="date-select" className="filter-label">Datum</label>
                            <select
                                id="date-select"
                                className="filter-select"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            >
                                <option value="Alle datums">Alle datums</option>
                                {availableDates.map(date => (
                                    <option key={date} value={date}>
                                        {formatDate(date)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="channel-select" className="filter-label">Zender</label>
                            <select
                                id="channel-select"
                                className="filter-select"
                                value={selectedChannel}
                                onChange={(e) => setSelectedChannel(e.target.value)}
                            >
                                {availableChannels.map(channel => (
                                    <option key={channel} value={channel}>
                                        {channel}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                </div>
            ) : error ? (
                <div className="alert alert-error">
                    {error}
                </div>
            ) : tvGuideData.length === 0 ? (
                <div className="alert alert-info">
                    Er zijn momenteel geen wedstrijden beschikbaar in de TV-gids.
                </div>
            ) : filteredGuide.length === 0 ? (
                <div className="alert alert-info">
                    Geen wedstrijden gevonden voor de geselecteerde filters.
                </div>
            ) : (
                // Wedstrijden weergeven, gegroepeerd per datum
                Object.entries(groupedByDate).map(([date, games]) => (
                    <div key={date} className="date-section">
                        <div className="date-header">
                            <div className="date-icon"></div>
                            <h2 className="date-title">
                                {formatDate(date)}
                            </h2>
                        </div>

                        <div className="games-grid">
                            {games.map(game => (
                                <div key={game.id} className="game-card">
                                    <div className="game-card-inner">
                                        {/* Tijdstip en kanaal informatie */}
                                        <div className="game-header">
                                            <div className="game-time">
                                                <span className="time-icon"></span>
                                                <span>{game.time}</span>
                                            </div>
                                            <div className="game-channel">
                                                <span className="channel-icon"></span>
                                                <span>{game.channel}</span>
                                                {game.isNational && (
                                                    <span className="national-badge">
                                                        Nationale uitzending
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Wedstrijd informatie */}
                                        <div className="game-match">
                                            {/* Away Team */}
                                            <div className="team away-team">
                                                <div className="team-name">{game.awayTeam}</div>
                                            </div>

                                            {/* VS */}
                                            <div className="versus">
                                                <div className="versus-icon"></div>
                                                <div className="versus-text">VS</div>
                                            </div>

                                            {/* Home Team */}
                                            <div className="team home-team">
                                                <div className="team-name">{game.homeTeam}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default TvGuide;