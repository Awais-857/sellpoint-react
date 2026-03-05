// src/components/Dashboard.jsx
// This component redirects to role-specific dashboards

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const userType = localStorage.getItem('userType');
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Check if user is logged in
        if (!token) {
            navigate('/login');
            return;
        }

        // Redirect based on user type
        switch (userType) {
            case 'Admin':
                navigate('/admin-dashboard');
                break;
            case 'Vendor':
                navigate('/vendor-dashboard');
                break;
            case 'Customer':
                navigate('/customer-dashboard');
                break;
            default:
                // If no userType or invalid, redirect to login
                localStorage.clear();
                navigate('/login');
        }
    }, [navigate, userType, token]);

    // Show loading while redirecting
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <p>Redirecting to your dashboard...</p>
        </div>
    );
}

export default Dashboard;