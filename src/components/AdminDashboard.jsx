// src/components/AdminDashboard.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function AdminDashboard() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const userType = localStorage.getItem('userType');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        // Extra safety - if not admin, redirect
        if (userType !== 'Admin') {
            navigate('/dashboard');
        }
    }, [navigate, userType]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <nav className="dashboard-nav">
                <h1>SellPoint Admin</h1>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </nav>

            <div className="dashboard-content">
                <h2>Admin Dashboard</h2>
                <p>Welcome back, {username}!</p>

                <div className="dashboard-card">
                    <h3>Admin Controls (from SRS UC-001 to UC-008)</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
                        <div style={{ padding: '15px', background: '#f7fafc', borderRadius: '5px' }}>
                            <strong>👥 Vendor Management</strong>
                            <p style={{ fontSize: '14px', marginTop: '5px' }}>Approve/reject vendors (UC-002)</p>
                        </div>
                        <div style={{ padding: '15px', background: '#f7fafc', borderRadius: '5px' }}>
                            <strong>📁 Categories</strong>
                            <p style={{ fontSize: '14px', marginTop: '5px' }}>Manage product categories (UC-004)</p>
                        </div>
                        <div style={{ padding: '15px', background: '#f7fafc', borderRadius: '5px' }}>
                            <strong>📦 All Orders</strong>
                            <p style={{ fontSize: '14px', marginTop: '5px' }}>Monitor all orders (UC-005)</p>
                        </div>
                        <div style={{ padding: '15px', background: '#f7fafc', borderRadius: '5px' }}>
                            <strong>⚖️ Disputes</strong>
                            <p style={{ fontSize: '14px', marginTop: '5px' }}>Resolve disputes (UC-006)</p>
                        </div>
                        <div style={{ padding: '15px', background: '#f7fafc', borderRadius: '5px' }}>
                            <strong>📊 Reports</strong>
                            <p style={{ fontSize: '14px', marginTop: '5px' }}>Sales analytics (UC-007)</p>
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