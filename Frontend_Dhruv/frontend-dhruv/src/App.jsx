// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import Home from './pages/user/Home';
import Login from './pages/user/Login';
import SignUp from './pages/user/SignUp';
import OwnerDashboard from './pages/owner/OwnerDashboard';
import FacilityManagement from './pages/owner/FacilityManagement';
// import CourtManagement from './pages/owner/CourtManagement';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
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

const AppRoutes = () => {
  const { isAuthenticated, isOwner } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to={isOwner ? "/owner/dashboard" : "/"} /> : <Login />} 
      />
      <Route 
        path="/signup" 
        element={isAuthenticated ? <Navigate to={isOwner ? "/owner/dashboard" : "/"} /> : <SignUp />} 
      />
      
      {/* User Routes */}
      <Route path="/" element={<Home/>} />
      
      {/* Owner Protected Routes - ✅ FIXED: Using OWNER */}
      <Route 
        path="/owner/dashboard" 
        element={
          <ProtectedRoute requiredRole="OWNER">
            <OwnerDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/owner/facility-management" 
        element={
          <ProtectedRoute requiredRole="OWNER">
            <FacilityManagement />
          </ProtectedRoute>
        } 
      />
      {/* <Route 
        path="/owner/court-management" 
        element={
          <ProtectedRoute requiredRole="OWNER">
            <CourtManagement />
          </ProtectedRoute>
        } 
      /> */}

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
