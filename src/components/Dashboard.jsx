// src/components/Dashboard.jsx
// This is the Dashboard (shown after login)

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('userEmail');

    // Check if user is logged in - runs when component loads
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // If no token, redirect to login
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        // Clear all stored data
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userId');

        // Redirect to login
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <nav className="dashboard-nav">
                <h1>SellPoint</h1>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </nav>

            <div className="dashboard-content">
                <h2>Welcome, {username}!</h2>

                <div className="dashboard-card">
                    <h3>Login Successful!</h3>
                    <p>You have successfully logged into the SellPoint prototype.</p>
                    <p>Your email: {email}</p>
                </div>

                <div className="info-card">
                    <h3>Prototype Information</h3>
                    <p>This dashboard confirms that:</p>
                    <ul>
                        <li>✅ Registration works</li>
                        <li>✅ Login works</li>
                        <li>✅ JWT Authentication works</li>
                        <li>✅ Protected routes work</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;