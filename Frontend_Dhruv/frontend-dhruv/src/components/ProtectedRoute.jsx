// components/ProtectedRoute.jsx - NEW component for JWT validation
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { tokenManager } from '../utils/tokenManager';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Validating access...</p>
        </div>
      </div>
    );
  }

  // Check if user has valid token
  const token = tokenManager.getToken();
  if (!token || tokenManager.isTokenExpired(token)) {
    tokenManager.removeToken();
    return <Navigate to="/login" replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    console.log('Access denied. User role:', user?.role, 'Required:', requiredRole);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
