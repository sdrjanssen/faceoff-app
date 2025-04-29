import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const Home = () => {
    const { isAuthenticated } = useAuth();

    // Functie om naar de juiste pagina te navigeren afhankelijk van authenticatie
    const getFeatureLink = (path) => {
        return isAuthenticated ? path : "/login";
    };

    return (
        <div className="home-container">
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">Welkom bij FACEOFF</h1>
                    <p className="hero-subtitle">
                        Vind jouw perfecte Premier League team, volg alle wedstrijden en blijf op de hoogte van voetbalnieuws.
                    </p>
                    {isAuthenticated ? (
                        <Link to="/team-finder" className="btn btn-primary hero-cta">
                            Start Team Finder
                        </Link>
                    ) : (
                        <Link to="/login" className="btn btn-primary hero-cta">
                            Log in om te starten
                        </Link>
                    )}
                </div>
            </section>

            <section className="features">
                <h2 className="section-title">Wat kun je doen met FACEOFF?</h2>

                <div className="feature-grid">
                    <Link to={getFeatureLink("/team-finder")} className="feature-card-link">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#0077C0">
                                    <path d="M13 10H3c-.55 0-1 .45-1 1s.45 1 1 1h10c.55 0 1-.45 1-1s-.45-1-1-1zm0-4H3c-.55 0-1 .45-1 1s.45 1 1 1h10c.55 0 1-.45 1-1s-.45-1-1-1zM3 16h6c.55 0 1-.45 1-1s-.45-1-1-1H3c-.55 0-1 .45-1 1s.45 1 1 1zm19.21-3.79L24 14l-1.79 1.79c-.32.32-.86.1-.86-.35V14H17c-.55 0-1-.45-1-1s.45-1 1-1h4.35v-1.44c0-.45.54-.67.85-.35z"/>
                                </svg>
                            </div>
                            <h3 className="feature-title">Team Finder</h3>
                            <p className="feature-description">
                                Ontdek welke Premier League-teams het beste bij jouw voorkeuren passen door een paar simpele vragen te beantwoorden.
                            </p>
                        </div>
                    </Link>

                    <Link to={getFeatureLink("/player-search")} className="feature-card-link">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#0077C0">
                                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                                </svg>
                            </div>
                            <h3 className="feature-title">Teams & Spelers</h3>
                            <p className="feature-description">
                                Zoek en bekijk gedetailleerde informatie over alle Premier League-teams en hun spelers.
                            </p>
                        </div>
                    </Link>

                    <Link to={getFeatureLink("/standings")} className="feature-card-link">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#0077C0">
                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                                </svg>
                            </div>
                            <h3 className="feature-title">Standen & Statistieken</h3>
                            <p className="feature-description">
                                Blijf op de hoogte van de laatste competitiestanden en speler statistieken.
                            </p>
                        </div>
                    </Link>

                    <Link to={getFeatureLink("/tv-guide")} className="feature-card-link">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#0077C0">
                                    <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/>
                                </svg>
                            </div>
                            <h3 className="feature-title">TV Gids</h3>
                            <p className="feature-description">
                                Bekijk wanneer en waar je de komende Premier League wedstrijden live kunt volgen.
                            </p>
                        </div>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;