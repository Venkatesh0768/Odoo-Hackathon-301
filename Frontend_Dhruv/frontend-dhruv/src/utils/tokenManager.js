// utils/tokenManager.js - NEW FILE for JWT management
const TOKEN_KEY = 'quickcourt_token';
const REFRESH_TOKEN_KEY = 'quickcourt_refresh_token';

export const tokenManager = {
  // Get JWT token from localStorage
  getToken: () => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  // Set JWT token to localStorage
  setToken: (token) => {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error('Error setting token:', error);
    }
  },

  // Remove JWT token from localStorage
  removeToken: () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  },

  // Check if token exists
  hasToken: () => {
    return !!tokenManager.getToken();
  },

  // Decode JWT token (basic decode without verification)
  decodeToken: (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  },

  // Check if token is expired
  isTokenExpired: (token) => {
    try {
      const decoded = tokenManager.decodeToken(token);
      if (!decoded || !decoded.exp) return true;
      
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  },

  // Get user info from token
  getUserFromToken: (token) => {
    try {
      return tokenManager.decodeToken(token);
    } catch (error) {
      console.error('Error getting user from token:', error);
      return null;
    }
  }
};
