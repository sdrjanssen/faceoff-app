import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
    const { login, authError, setAuthError } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Haal eventuele berichten uit de location state
    useEffect(() => {
        if (location.state?.message) {
            setMessage(location.state.message);
        }
        // Reset auth error wanneer component mount
        return () => setAuthError(null);
    }, [location.state, setAuthError]);

    // Controleer of er een doorverwijzing is na inloggen
    const from = location.state?.from?.pathname || '/';

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Gebruikersnaam is verplicht';
        }

        if (!formData.password) {
            newErrors.password = 'Wachtwoord is verplicht';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Reset error voor dit veld bij typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setLoading(true);
            await login(formData);
            navigate(from, { replace: true });
        } catch (err) {
            console.error('Login error:', err);
            // AuthError wordt al gezet in de context
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Inloggen</h1>

                {authError && (
                    <div className="alert alert-danger">
                        {authError}
                    </div>
                )}

                {message && (
                    <div className="alert alert-success">
                        {message}
                    </div>
                )}

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">Gebruikersnaam</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className={`form-control ${errors.username ? 'form-control-error' : ''}`}
                            value={formData.username}
                            onChange={handleChange}
                            autoComplete="username"
                            autoFocus
                        />
                        {errors.username && <div className="error-message">{errors.username}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Wachtwoord</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className={`form-control ${errors.password ? 'form-control-error' : ''}`}
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                        />
                        {errors.password && <div className="error-message">{errors.password}</div>}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={loading}
                    >
                        {loading ? 'Inloggen...' : 'Inloggen'}
                    </button>

                    <div className="login-links">
                        <Link to="/register" className="register-link">
                            Nog geen account? Registreer hier
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;