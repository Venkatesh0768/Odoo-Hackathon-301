// context/AuthContext.jsx - UPDATE with OTP & JWT support
import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../utils/api';
import { tokenManager } from '../utils/tokenManager';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const token = tokenManager.getToken();
      
      if (!token || tokenManager.isTokenExpired(token)) {
        setUser(null);
        setIsAuthenticated(false);
        tokenManager.removeToken();
        return;
      }

      // Validate token with backend
      const result = await authAPI.validateToken(token);
      
      if (result.success) {
        setUser(result.data.user || result.data);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        tokenManager.removeToken();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      setIsAuthenticated(false);
      tokenManager.removeToken();
    } finally {
      setLoading(false);
    }
  };
const signup = async (userData) => {
  try {
    setError(null);
    setLoading(true);
    
    const response = await authAPI.signup(userData);
    
    if (response && (response.success !== false)) {
      console.log('Signup successful, redirecting to login');
      return { 
        success: true, 
        message: 'Registration successful! Please login to continue.',
        shouldRedirectToLogin: true 
      };
    } else {
      throw new Error(response.message || 'Signup failed');
    }
  } catch (error) {
    console.error('Signup error:', error);
    setError(error.message);
    return { success: false, error: error.message };
  } finally {
    setLoading(false);
  }
};

// context/AuthContext.jsx - Add specific error handling
const login = async (credentials) => {
  try {
    setError(null);
    setLoading(true);
    
    const response = await authAPI.login(credentials);
    
    if (response && response.success !== false) {
      console.log('Login successful, attempting to send OTP...');
      
      // Add a small delay to ensure backend is ready
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const otpResult = await authAPI.sendOTP(credentials.email);
      
      if (otpResult.success) {
        setPendingEmail(credentials.email);
        setShowOTPVerification(true);
        setLoading(false);
        
        return { 
          success: true, 
          requiresOTP: true,
          message: 'OTP sent to your email. Please verify to continue.' 
        };
      } else {
        // More specific error handling
        const errorMessage = otpResult.error || 'Failed to send OTP';
        console.error('OTP Send Failed:', errorMessage);
        
        if (errorMessage.includes('Network error')) {
          setError('Network connection failed. Please check your internet connection.');
        } else {
          setError(`OTP sending failed: ${errorMessage}`);
        }
        
        return { success: false, error: errorMessage };
      }
    } else {
      throw new Error(response.message || 'Login failed');
    }
  } catch (error) {
    console.error('Login process error:', error);
    setError(error.message);
    return { success: false, error: error.message };
  } finally {
    if (!showOTPVerification) {
      setLoading(false);
    }
  }
};

  const verifyOTPAndAuthenticate = async (otpData) => {
    try {
      setLoading(true);
      
      // OTP verification returns JWT token
      if (otpData.token || otpData.accessToken) {
        const token = otpData.token || otpData.accessToken;
        
        // Store JWT token
        tokenManager.setToken(token);
        
        // Validate and get user data
        const result = await authAPI.validateToken(token);
        
        if (result.success) {
          setUser(result.data.user || result.data);
          setIsAuthenticated(true);
          setShowOTPVerification(false);
          setPendingEmail('');
          
          return { success: true };
        } else {
          throw new Error('Token validation failed');
        }
      } else {
        throw new Error('No token received after OTP verification');
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
      setError(error.message);
      tokenManager.removeToken();
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      tokenManager.removeToken();
      setShowOTPVerification(false);
      setPendingEmail('');
    }
  };

  const closeOTPVerification = () => {
    setShowOTPVerification(false);
    setPendingEmail('');
    setLoading(false);
  };

  const value = {
    user,
    loading,
    error,
    signup,
    login,
    logout,
    isAuthenticated,
    isOwner: user?.role === 'OWNER',
    isUser: user?.role === 'USER',
    isAdmin: user?.role === 'ADMIN',
    
    // OTP related
    showOTPVerification,
    pendingEmail,
    verifyOTPAndAuthenticate,
    closeOTPVerification
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
