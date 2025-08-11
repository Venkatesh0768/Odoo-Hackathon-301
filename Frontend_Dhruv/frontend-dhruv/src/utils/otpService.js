// utils/otpService.js - FIXED for your specific errors
const API_BASE_URL = 'https://dd183bddabf9.ngrok-free.app/api/v1';

export const otpService = {
  sendOTP: async (email) => {
    try {
      console.log('Sending OTP to:', email); // Debug log
      
      const response = await fetch(`${API_BASE_URL}/auth/otp/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          'Accept': 'application/json',
        },
        credentials: 'include', // Important for CORS
        body: JSON.stringify({ email }),
      });

      console.log('OTP Response status:', response.status); // Debug log

      if (!response.ok) {
        const errorText = await response.text();
        console.error('OTP Send Error:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('OTP sent successfully:', data); // Debug log
      return { success: true, data };

    } catch (error) {
      console.error('OTP Service Error:', error);
      
      // Provide specific error messages
      if (error.message.includes('Failed to fetch')) {
        return { 
          success: false, 
          error: 'Network error: Please check your internet connection and server status' 
        };
      }
      
      return { success: false, error: error.message };
    }
  },

  verifyOTP: async (email, otp) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/otp/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, otp }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Invalid OTP' }));
        throw new Error(errorData.message || 'OTP verification failed');
      }

      const data = await response.json();
      return { success: true, data };

    } catch (error) {
      console.error('OTP Verification Error:', error);
      return { success: false, error: error.message };
    }
  }
};
