// In VendorDashboard.jsx, add state to fetch profile
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Dashboard.css';

function VendorDashboard() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const userType = localStorage.getItem('userType');
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        if (userType !== 'Vendor') {
            navigate('/dashboard');
            return;
        }

        // Fetch vendor profile
        const fetchProfile = async () => {
            try {
                const response = await api.get('/profile/me');
                setProfile(response.data);
            } catch (err) {
                console.error('Failed to fetch profile', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate, userType]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="dashboard-container">
                <div className="dashboard-content">
                    <p>Loading profile...</p>
                </div>
            </div>
        );
    }

    // Show pending approval message if vendor not approved
    if (profile && profile.approvalStatus !== 'Approved') {
        return (
            <div className="dashboard-container">
                <nav className="dashboard-nav">
                    <h1>SellPoint Vendor</h1>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </nav>

                <div className="dashboard-content">
                    <h2>Welcome, {username}!</h2>

                    <div className="dashboard-card" style={{ background: '#fef3c7', border: '1px solid #fbbf24' }}>
                        <h3 style={{ color: '#92400e' }}>⏳ Account Pending Approval</h3>
                        <p>Your vendor application is currently under review.</p>
                        <p>You will receive an email once your account is approved.</p>
                        <p>Status: <strong>{profile?.approvalStatus || 'Pending'}</strong></p>
                    </div>

                    <div className="info-card">
                        <h3>Application Details</h3>
                        <p><strong>Business Name:</strong> {profile?.businessName}</p>
                        <p><strong>Tax ID:</strong> {profile?.taxID}</p>
                        <p><strong>Business Email:</strong> {profile?.businessEmail || 'Not provided'}</p>
                        <p><strong>Website:</strong> {profile?.website || 'Not provided'}</p>
                    </div>
                </div>
            </div>
        );
    }

    // Regular vendor dashboard for approved vendors
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

                <div className="info-card">
                    <h3>Business Information</h3>
                    <p><strong>Business Name:</strong> {profile?.businessName}</p>
                    <p><strong>Tax ID:</strong> {profile?.taxID}</p>
                    <p><strong>Status:</strong> <span style={{ color: '#059669' }}>Approved ✓</span></p>
                </div>
            </div>
        </div>
    );
}

export default VendorDashboard;