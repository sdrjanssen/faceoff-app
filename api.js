import axios from 'axios';

// NOVI backend configuratie met URL
export const noviApi = axios.create({
    baseURL: 'https://api.datavortex.nl/faceoff',
    headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'faceoff:pOI2Xpyw05TZpPZ91gPG'
    }
});

// Sports DB API configuratie
export const sportsDBApi = axios.create({
    baseURL: 'https://www.thesportsdb.com/api/v1/json/3/',
});

// Auth token instellen voor NOVI API
export const setAuthToken = (token) => {
    if (token) {
        noviApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete noviApi.defaults.headers.common['Authorization'];
    }
};