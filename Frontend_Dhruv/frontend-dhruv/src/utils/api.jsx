// utils/api.jsx
const API_BASE_URL = 'https://05565dc42f72.ngrok-free.app/api/v1';

const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        ...options.headers,
      },
      credentials: 'include',
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

export const authAPI = {
  login: async (credentials) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  signup: async (userData) => {
    return apiCall('/auth/signup', {
      method: 'POST',  
      body: JSON.stringify(userData),
    });
  },

  logout: async () => {
    return apiCall('/auth/logout', {
      method: 'POST',
    });
  },

  getCurrentUser: async () => {
    return apiCall('/auth/me');
  }
};

// ADD these new facility API methods
export const facilitiesAPI = {
  createFacility: async (facilityData) => {
    return apiCall('/facilities', {
      method: 'POST',
      body: JSON.stringify(facilityData),
    });
  },

  getAllFacilities: async () => {
    return apiCall('/facilities');
  },

  getFacilityById: async (id) => {
    return apiCall(`/facilities/${id}`);
  },

  updateFacility: async (id, facilityData) => {
    return apiCall(`/facilities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(facilityData),
    });
  },

  deleteFacility: async (id) => {
    return apiCall(`/facilities/${id}`, {
      method: 'DELETE',
    });
  }
};

export const courtsAPI = {
  createCourt: async (courtData) => {
    return apiCall('/courts', {
      method: 'POST',
      body: JSON.stringify(courtData),
    });
  },

  getAllCourts: async () => {
    return apiCall('/courts');
  },

  getCourtById: async (id) => {
    return apiCall(`/courts/${id}`);
  },

  updateCourt: async (id, courtData) => {
    return apiCall(`/courts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(courtData),
    });
  },

  deleteCourt: async (id) => {
    return apiCall(`/courts/${id}`, {
      method: 'DELETE',
    });
  }
};

export const bookingsAPI = {
  getAllBookings: async () => {
    return apiCall('/bookings');
  },

  getBookingById: async (id) => {
    return apiCall(`/bookings/${id}`);
  },

  getBookingsByOwner: async (ownerId) => {
    return apiCall(`/bookings/owner/${ownerId}`);
  },

  updateBookingStatus: async (id, status) => {
    return apiCall(`/bookings/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  cancelBooking: async (id) => {
    return apiCall(`/bookings/${id}/cancel`, {
      method: 'PUT',
    });
  },

  getBookingsByDateRange: async (startDate, endDate) => {
    return apiCall(`/bookings/range?start=${startDate}&end=${endDate}`);
  }
};

export const profileAPI = {
  getOwnerProfile: async (ownerId) => {
    return apiCall(`/owners/${ownerId}/profile`);
  },

  updateOwnerProfile: async (ownerId, profileData) => {
    return apiCall(`/owners/${ownerId}/profile`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  updatePersonalInfo: async (ownerId, personalData) => {
    return apiCall(`/owners/${ownerId}/personal`, {
      method: 'PUT',
      body: JSON.stringify(personalData),
    });
  },

  updateBusinessInfo: async (ownerId, businessData) => {
    return apiCall(`/owners/${ownerId}/business`, {
      method: 'PUT',
      body: JSON.stringify(businessData),
    });
  },

  getOwnerStats: async (ownerId) => {
    return apiCall(`/owners/${ownerId}/stats`);
  }
};