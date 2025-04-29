import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { registerUser } from '../services/auth';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const password = watch('password', '');

    const onSubmit = async (data) => {
        try {
            setError('');
            setLoading(true);

            // Verzoek voor registratie versturen
            await registerUser({
                username: data.username,
                email: data.email,
                password: data.password,
                role: ["user"]
            });

            // Na succesvolle registratie naar inlogpagina navigeren
            navigate('/login', {
                state: { message: 'Registratie succesvol! Je kunt nu inloggen.' }
            });
        } catch (err) {
            setError(err.message || 'Er is een fout opgetreden bij het registreren');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h1 className="register-title">Registreren</h1>

                {error && <div className="alert alert-error">{error}</div>}

                <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">Gebruikersnaam</label>
                        <input
                            type="text"
                            id="username"
                            className={`form-control ${errors.username ? 'form-control-error' : ''}`}
                            {...register('username', {
                                required: 'Gebruikersnaam is verplicht',
                                minLength: {
                                    value: 3,
                                    message: 'Gebruikersnaam moet minimaal 3 karakters bevatten'
                                }
                            })}
                            autoComplete="username"
                            autoFocus
                        />
                        {errors.username && <div className="error-message">{errors.username.message}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">E-mailadres</label>
                        <input
                            type="email"
                            id="email"
                            className={`form-control ${errors.email ? 'form-control-error' : ''}`}
                            {...register('email', {
                                required: 'E-mailadres is verplicht',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Ongeldig e-mailadres'
                                }
                            })}
                            autoComplete="email"
                        />
                        {errors.email && <div className="error-message">{errors.email.message}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Wachtwoord</label>
                        <input
                            type="password"
                            id="password"
                            className={`form-control ${errors.password ? 'form-control-error' : ''}`}
                            {...register('password', {
                                required: 'Wachtwoord is verplicht',
                                minLength: {
                                    value: 6,
                                    message: 'Wachtwoord moet minimaal 6 karakters bevatten'
                                }
                            })}
                            autoComplete="new-password"
                        />
                        {errors.password && <div className="error-message">{errors.password.message}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label">Wachtwoord bevestigen</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className={`form-control ${errors.confirmPassword ? 'form-control-error' : ''}`}
                            {...register('confirmPassword', {
                                required: 'Bevestig je wachtwoord',
                                validate: value => value === password || 'Wachtwoorden komen niet overeen'
                            })}
                        />
                        {errors.confirmPassword && <div className="error-message">{errors.confirmPassword.message}</div>}
                    </div>

                    <button
                        type="submit"
                        className="register-submit-btn"
                        disabled={loading}
                    >
                        {loading ? 'Registreren...' : 'Registreren'}
                    </button>

                    <div className="register-links">
                        <Link to="/login" className="login-link">
                            Heb je al een account? Log hier in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;