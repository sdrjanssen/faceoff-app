import { noviApi, setAuthToken } from './api';

// De permanente JWT token
const PERMANENT_JWT = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsInVzZXJJZCI6OTg4LCJhcHBsaWNhdGlvbk5hbWUiOiJmYWNlb2ZmIiwic3ViIjoidGVzdHVzZXIiLCJpYXQiOjE3NDQ5NzkzODgsImV4cCI6MTc0NTg0MzM4OH0.-RjBRmKdSvEnTbHoj23Js4VaVGvbZpA991cxQqUWKSE";

// Initialiseer auth token bij het laden van het bestand
setAuthToken(PERMANENT_JWT);

export const registerUser = async (userData) => {
    try {
        // Registreren op /users endpoint
        const response = await noviApi.post('/users', userData);
        return response.data;
    } catch (error) {
        console.error('Registration error:', error.response?.data || error);
        throw error.response?.data || { message: 'Er is een fout opgetreden bij het registreren' };
    }
};

export const loginUser = async (credentials) => {
    try {
        // Bij gebruik van een permanente token, simuleren we het inloggen
        // en geven direct de gegevens terug

        // Het token is al ingesteld in de API headers bij het laden van het bestand

        // We gebruiken hier de meegestuurde credentials om de gebruiker te identificeren
        const userData = {
            username: credentials.username,
            // Andere gebruikersgegevens kunnen hier worden toegevoegd
        };

        // Token opslaan in localStorage
        localStorage.setItem('token', PERMANENT_JWT);
        localStorage.setItem('user', JSON.stringify(userData));

        return { accessToken: PERMANENT_JWT, user: userData };
    } catch (error) {
        console.error('Login error:', error.response?.data || error);
        throw error.response?.data || { message: 'Ongeldige inloggegevens' };
    }
};

export const logoutUser = () => {
    // Bij gebruik van een permanente token, verwijderen we alleen de lokale opslag
    // maar behouden de token in de API headers
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : { username: 'testuser' }; // Fallback naar testuser
};

export const isAuthenticated = () => {
    // Altijd geauthenticeerd met permanente token
    return true;
};