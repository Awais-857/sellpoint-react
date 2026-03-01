// src/components/Register.jsx
// This is the Registration Form page with UserType selection

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Auth.css';

function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        userType: 'Customer'  // NEW: Default to Customer
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match!");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Send data to backend - includes userType now
            const response = await api.post('/auth/register', {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                username: formData.username,
                password: formData.password,
                phoneNumber: formData.phoneNumber,
                userType: formData.userType  // NEW: Send selected user type
            });

            alert('Registration successful! Please login.');
            navigate('/login');

        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Registration failed');
            } else {
                setError('Network error. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Create Account</h2>
                <p>Join SellPoint marketplace</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                placeholder="John"
                            />
                        </div>

                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                placeholder="Doe"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="john@example.com"
                        />
                    </div>

                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder="johndoe"
                        />
                    </div>

                    {/* NEW: User Type Selection */}
                    <div className="form-group">
                        <label>Register as</label>
                        <select
                            name="userType"
                            value={formData.userType}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                fontSize: '16px'
                            }}
                        >
                            <option value="Customer">Customer</option>
                            <option value="Vendor">Vendor</option>
                            <option value="Admin">Admin</option>
                        </select>
                        <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
                            {formData.userType === 'Vendor' &&
                                "Vendor accounts require admin approval before you can sell products."}
                            {formData.userType === 'Admin' &&
                                "Admin accounts have full system access. Use responsibly."}
                        </small>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Phone Number (Optional)</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="123-456-7890"
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>

                <p className="auth-link">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;