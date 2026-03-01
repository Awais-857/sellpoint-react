// src/components/VendorDashboard.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function VendorDashboard() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const userType = localStorage.getItem('userType');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        if (userType !== 'Vendor') {
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
                <h1>SellPoint Vendor</h1>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </nav>

            <div className="dashboard-content">
                <h2>Vendor Dashboard</h2>
                <p>Welcome back, {username}!</p>

                <div className="dashboard-card">
                    <h3>Store Management (from SRS UC-009 to UC-016)</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
                        <div style={{ padding: '15px', background: '#f7fafc', borderRadius: '5px' }}>
                            <strong>➕ Add Product</strong>
                            <p style={{ fontSize: '14px', marginTop: '5px' }}>List new products (UC-011)</p>
                        </div>
                        <div style={{ padding: '15px', background: '#f7fafc', borderRadius: '5px' }}>
                            <strong>📝 My Products</strong>
                            <p style={{ fontSize: '14px', marginTop: '5px' }}>Manage inventory (UC-012)</p>
                        </div>
                        <div style={{ padding: '15px', background: '#f7fafc', borderRadius: '5px' }}>
                            <strong>📦 Orders</strong>
                            <p style={{ fontSize: '14px', marginTop: '5px' }}>Process customer orders (UC-013)</p>
                        </div>
                        <div style={{ padding: '15px', background: '#f7fafc', borderRadius: '5px' }}>
                            <strong>💰 Revenue</strong>
                            <p style={{ fontSize: '14px', marginTop: '5px' }}>View earnings (UC-015)</p>
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

export default VendorDashboard;