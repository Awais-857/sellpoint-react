// src/components/CustomerDashboard.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function CustomerDashboard() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('userEmail');
    const userType = localStorage.getItem('userType');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        if (userType !== 'Customer') {
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
                <h1>SellPoint</h1>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </nav>

            <div className="dashboard-content">
                <h2>Welcome, {username}!</h2>

                <div className="dashboard-card">
                    <h3>Your Account (from SRS UC-017 to UC-026)</h3>
                    <p>Email: {email}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
                        <div style={{ padding: '15px', background: '#f7fafc', borderRadius: '5px' }}>
                            <strong>🛍️ Browse Products</strong>
                            <p style={{ fontSize: '14px', marginTop: '5px' }}>Shop from vendors (UC-020)</p>
                        </div>
                        <div style={{ padding: '15px', background: '#f7fafc', borderRadius: '5px' }}>
                            <strong>🛒 My Cart</strong>
                            <p style={{ fontSize: '14px', marginTop: '5px' }}>View and checkout (UC-021/022)</p>
                        </div>
                        <div style={{ padding: '15px', background: '#f7fafc', borderRadius: '5px' }}>
                            <strong>📦 Order History</strong>
                            <p style={{ fontSize: '14px', marginTop: '5px' }}>Track past orders (UC-025)</p>
                        </div>
                        <div style={{ padding: '15px', background: '#f7fafc', borderRadius: '5px' }}>
                            <strong>📍 Track Order</strong>
                            <p style={{ fontSize: '14px', marginTop: '5px' }}>Current order status (UC-024)</p>
                        </div>
                    </div>
                </div>

                <div className="info-card">
                    <h3>Prototype Information</h3>
                    <p>This dashboard confirms that:</p>
                    <ul>
                        <li>✅ Registration works (with UserType)</li>
                        <li>✅ Login works</li>
                        <li>✅ Password reset works</li>
                        <li>✅ Role-based redirect works</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CustomerDashboard;