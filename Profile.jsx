import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [userData, setUserData] = useState({
        username: user?.username || '',
        email: user?.email || '',
    });
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveProfile = () => {
        setTimeout(() => {
            setEditMode(false);
            setNotification({
                open: true,
                message: 'Profiel succesvol bijgewerkt!',
                severity: 'success'
            });
        }, 1000);
    };

    const handleCloseNotification = () => {
        setNotification(prev => ({
            ...prev,
            open: false
        }));
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="container">
            <h1 className="profile-title text-center">Mijn Profiel</h1>

            <div className="grid grid-cols-1">
                {/* Profielgegevens */}
                <div className="grid-item">
                    <div className="card p-3">
                        <div className="flex items-center mb-3">
                            <div className="profile-avatar mr-2">
                                <div className="avatar-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h2 className="profile-username">{user?.username}</h2>
                                <p className="profile-member-since text-secondary">
                                    Gebruiker sinds {new Date().toLocaleDateString('nl-NL', { year: 'numeric', month: 'long' })}
                                </p>
                            </div>
                        </div>

                        <hr className="divider mb-3" />

                        {editMode ? (
                            <form className="profile-form">
                                <div className="form-group">
                                    <label htmlFor="username" className="form-label">Gebruikersnaam</label>
                                    <div className="input-with-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24">
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                        </svg>
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            className="form-control"
                                            value={userData.username}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">E-mailadres</label>
                                    <div className="input-with-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24">
                                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                        </svg>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-control"
                                            value={userData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between mt-3">
                                    <button
                                        type="button"
                                        className="btn btn-outline"
                                        onClick={() => setEditMode(false)}
                                    >
                                        Annuleren
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleSaveProfile}
                                    >
                                        Opslaan
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div>
                                <ul className="profile-info-list">
                                    <li className="profile-info-item">
                                        <div className="profile-info-icon user-icon"></div>
                                        <div className="profile-info-content">
                                            <span className="profile-info-label">Gebruikersnaam</span>
                                            <span className="profile-info-value">{userData.username}</span>
                                        </div>
                                    </li>

                                    <li className="profile-info-item">
                                        <div className="profile-info-icon email-icon"></div>
                                        <div className="profile-info-content">
                                            <span className="profile-info-label">E-mailadres</span>
                                            <span className="profile-info-value">{userData.email || "Geen e-mailadres ingesteld"}</span>
                                        </div>
                                    </li>

                                    <li className="profile-info-item">
                                        <div className="profile-info-icon password-icon"></div>
                                        <div className="profile-info-content">
                                            <span className="profile-info-label">Wachtwoord</span>
                                            <span className="profile-info-value">••••••••</span>
                                        </div>
                                    </li>
                                </ul>

                                <div className="mt-3">
                                    <button
                                        className="btn btn-primary mr-2"
                                        onClick={() => setEditMode(true)}
                                    >
                                        Bewerk Profiel
                                    </button>
                                    <button
                                        className="btn btn-outline"
                                        onClick={handleLogout}
                                    >
                                        Uitloggen
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Recente Activiteit */}
                    <div className="card p-3 mt-3">
                        <h2 className="card-title">Recente Activiteit</h2>

                        <hr className="divider mb-2" />

                        <ul className="activity-list">
                            <li className="activity-item">
                                <div className="activity-title">Team Finder Voltooid</div>
                                <div className="activity-time">Je hebt de Team Finder voltooid en matches gevonden</div>
                            </li>

                            <li className="activity-item">
                                <div className="activity-title">Account Aangemaakt</div>
                                <div className="activity-time">Je hebt je account aangemaakt</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {notification.open && (
                <div className={`notification notification-${notification.severity}`}>
                    <div className="notification-icon"></div>
                    <div className="notification-message">{notification.message}</div>
                    <button
                        className="notification-close"
                        onClick={handleCloseNotification}
                    >
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;