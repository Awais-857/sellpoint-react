// src/components/AdminDashboard.jsx
// Simplified for prototype - no vendor approval

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function AdminDashboard() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const userType = localStorage.getItem('userType');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        if (userType !== 'Admin') {
            navigate('/dashboard');
            return;
        }

        setLoading(false);
    }, [navigate, userType]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="dashboard-container">
                <nav className="dashboard-nav">
                    <h1>SellPoint Admin</h1>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </nav>
                <div className="dashboard-content">
                    <p>Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <nav className="dashboard-nav">
                <h1>SellPoint Admin</h1>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </nav>

            <div className="dashboard-content">
                <h2>Admin Dashboard</h2>
                <p>Welcome back, {username}!</p>

                {/* Admin Controls */}
                <div className="dashboard-card">
                    <h3>Admin Controls (Prototype Version)</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
                        <div style={{ padding: '15px', background: '#f7fafc', borderRadius: '5px' }}>
                            <strong>📁 Categories</strong>
                            <p style={{ fontSize: '14px', marginTop: '5px' }}>Manage product categories</p>
                        </div>
                        <div style={{ padding: '15px', background: '#f7fafc', borderRadius: '5px' }}>
                            <strong>📦 All Orders</strong>
                            <p style={{ fontSize: '14px', marginTop: '5px' }}>Monitor all orders</p>
                        </div>
                        <div style={{ padding: '15px', background: '#f7fafc', borderRadius: '5px' }}>
                            <strong>⚖️ Disputes</strong>
                            <p style={{ fontSize: '14px', marginTop: '5px' }}>Resolve disputes</p>
                        </div>
                        <div style={{ padding: '15px', background: '#f7fafc', borderRadius: '5px' }}>
                            <strong>📊 Reports</strong>
                            <p style={{ fontSize: '14px', marginTop: '5px' }}>Sales analytics</p>
                        </div>
                    </div>
                    <p style={{ marginTop: '20px', color: '#718096', fontStyle: 'italic' }}>
                        These features will be implemented in the final deliverable.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;