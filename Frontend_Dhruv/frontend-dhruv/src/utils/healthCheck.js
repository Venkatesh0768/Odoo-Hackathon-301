// utils/healthCheck.js - NEW file
const API_BASE_URL = 'https://dd183bddabf9.ngrok-free.app/api/v1';

export const healthCheck = {
  checkBackendStatus: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
        timeout: 5000, // 5 second timeout
      });

      if (response.ok) {
        console.log('✅ Backend is running');
        return { success: true };
      } else {
        console.error('❌ Backend responded with error:', response.status);
        return { success: false, error: `Backend error: ${response.status}` };
      }
    } catch (error) {
      console.error('❌ Backend health check failed:', error);
      return { success: false, error: 'Backend is not accessible' };
    }
  },

  checkNgrokStatus: () => {
    const ngrokUrl = API_BASE_URL;
    console.log('🔗 Using ngrok URL:', ngrokUrl);
    
    if (!ngrokUrl.includes('ngrok-free.app')) {
      console.warn('⚠️ Not using ngrok URL - make sure your backend is accessible');
    }
  }
};
