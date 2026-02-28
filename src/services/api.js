// src/services/api.js
// This file handles all communication with your backend API

import axios from 'axios';

// Create a custom axios instance with your backend URL
const api = axios.create({
    // IMPORTANT: Use YOUR backend port (from when you ran the API)
    baseURL: 'https://localhost:7215/api',  // Change port if yours is different
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor - automatically adds token to every request
api.interceptors.request.use(
    config => {
        // Get token from localStorage (where we'll save it after login)
        const token = localStorage.getItem('token');
        if (token) {
            // Add token to request headers
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;