import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { teamFinderQuestions, matchTeamsToPreferences } from '../services/teamMatcher';
import { getTeamDetails } from '../services/sportsDB';
import './TeamFinder.css';

const TeamFinder = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const totalSteps = teamFinderQuestions.length;
    const isLastQuestion = activeStep === totalSteps - 1;
    const currentQuestion = teamFinderQuestions[activeStep];

    const handleAnswerSelect = (questionId, answer) => {
        setAnswers({
            ...answers,
            [questionId]: answer
        });
    };

    const handleNext = () => {
        if (isLastQuestion) {
            calculateResults();
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setAnswers({});
        setResults(null);
    };

    const calculateResults = async () => {
        setLoading(true);
        setError(null);

        try {
            // Converteer antwoorden naar het juiste formaat voor de matcher
            const preferences = {
                offensive: answers[1]?.value,
                defensive: answers[2]?.value,
                history: answers[3]?.value,
                success: answers[4]?.value,
                region: answers[5]?.value,
                teamComposition: answers[6]?.value,
                stars: answers[7]?.value,
            };

            // Verkrijg gematcht teams van de matcher service
            const matchedTeams = matchTeamsToPreferences(preferences);

            // Voor elk gematcht team, haal de meest actuele teamgegevens op
            const enrichedResults = [];

            for (const match of matchedTeams) {
                try {
                    // Haal team details op uit API
                    const teamDetails = await getTeamDetails(match.team.id);

                    // Voeg gecombineerde informatie toe aan de resultaten
                    enrichedResults.push({
                        team: {
                            ...match.team,
                            // Voeg recente team details toe of gebruik de bestaande gegevens
                            name: teamDetails?.strTeam || match.team.name,
                            badge: teamDetails?.strTeamBadge || `https://www.thesportsdb.com/images/media/team/badge/small/${match.team.id}.png`
                        },
                        percentageMatch: match.percentageMatch
                    });
                } catch (err) {
                    console.error(`Error fetching details for team ${match.team.id}:`, err);
                    // Als we de details niet kunnen ophalen, gebruik dan de basisinformatie
                    enrichedResults.push(match);
                }
            }

            setResults(enrichedResults);
        } catch (err) {
            console.error('Error calculating results:', err);
            setError('Er is een fout opgetreden bij het berekenen van je resultaten.');
        } finally {
            setLoading(false);
        }
    };

    const handleViewTeamDetails = (teamId) => {
        navigate(`/teams/${teamId}`);
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
                <h2 className="loading-title">Je perfecte team matchen...</h2>
                <p className="loading-description">
                    We analyseren je voorkeuren om de beste NHL teams voor jou te vinden.
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <h2>Er is een fout opgetreden</h2>
                <p>{error}</p>
                <button
                    className="btn btn-primary"
                    onClick={handleReset}
                >
                    Opnieuw proberen
                </button>
            </div>
        );
    }

    if (results) {
        return (
            <div className="results-container">
                <h1 className="results-title">Jouw Top NHL Team Matches</h1>

                <p className="results-description">
                    Op basis van je voorkeuren hebben we de volgende teams gevonden die het beste bij je passen:
                </p>

                <div className="results-grid">
                    {results.map(({ team, percentageMatch }, index) => (
                        <div key={team.id} className="team-card">
                            <div className="match-percentage">
                                <span>{percentageMatch}%</span>
                            </div>

                            <div className="team-card-header">
                                <img
                                    src={team.badge || `https://www.thesportsdb.com/images/media/team/badge/small/${team.id}.png`}
                                    alt={team.name}
                                    className="team-logo"
                                />
                            </div>

                            <div className="team-card-body">
                                <h2 className="team-name">{index + 1}. {team.name}</h2>

                                <p className="team-description">{team.description}</p>

                                <h3 className="team-players-title">Top Spelers:</h3>

                                <ul className="team-players-list">
                                    {team.topPlayers && team.topPlayers.map((player, idx) => (
                                        <li key={idx} className="team-player-item">{player}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="team-card-footer">
                                <button
                                    className="btn btn-primary btn-block"
                                    onClick={() => handleViewTeamDetails(team.id)}
                                >
                                    Bekijk Team Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="reset-button-container">
                    <button
                        className="btn btn-outline"
                        onClick={handleReset}
                    >
                        Opnieuw starten
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="team-finder-container">
            <h1 className="team-finder-title">Vind Jouw Perfecte NHL Team</h1>

            <p className="team-finder-description">
                Beantwoord een paar vragen om te ontdekken welke NHL teams het beste bij jou passen.
            </p>

            <div className="question-card">
                <div className="stepper">
                    {teamFinderQuestions.map((question, index) => (
                        <div
                            key={question.id}
                            className={`step ${index === activeStep ? 'active' : ''} ${index < activeStep ? 'completed' : ''}`}
                        />
                    ))}
                </div>

                <div className="question-content">
                    <h2 className="question-title">
                        {currentQuestion.question}
                    </h2>

                    <div className="answer-options">
                        {currentQuestion.options.map((option) => (
                            <div
                                key={option.id}
                                className={`answer-option ${answers[currentQuestion.id]?.id === option.id ? 'selected' : ''}`}
                                onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                            >
                                <span>{option.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="question-actions">
                    <button
                        className="btn btn-outline"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                    >
                        Terug
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={handleNext}
                        disabled={!answers[currentQuestion.id]}
                    >
                        {isLastQuestion ? 'Resultaten bekijken' : 'Volgende'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeamFinder;