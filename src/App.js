// src/App.js
// Main app component with routing - UPDATED with role-specific dashboards

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Dashboard from './components/Dashboard';  // This is now the router
import AdminDashboard from './components/AdminDashboard';
import VendorDashboard from './components/VendorDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Routes - Role Specific */}
          <Route path="/dashboard" element={<Dashboard />} />  {/* Router */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;