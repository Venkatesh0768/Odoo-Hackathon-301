// App.jsx - UPDATE with JWT and ProtectedRoute
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import Home from './pages/user/Home';
import Login from './pages/user/Login';
import SignUp from './pages/user/SignUp';
import OwnerDashboard from './pages/owner/OwnerDashboard';
import FacilityManagement from './pages/owner/FacilityManagement';
import CourtManagement from './pages/owner/CourtManagement';
import BookingManagement from './pages/owner/BookingManagement';
import OwnerProfile from './pages/owner/OwnerProfile';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

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
      
      {/* Owner Protected Routes - All require JWT validation */}
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
      <Route 
        path="/owner/court-management" 
        element={
          <ProtectedRoute requiredRole="OWNER">
            <CourtManagement />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/owner/bookings" 
        element={
          <ProtectedRoute requiredRole="OWNER">
            <BookingManagement />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/owner/profile" 
        element={
          <ProtectedRoute requiredRole="OWNER">
            <OwnerProfile />
          </ProtectedRoute>
        } 
      />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};



function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
