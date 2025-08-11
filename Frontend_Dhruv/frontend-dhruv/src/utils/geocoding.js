// utils/geocoding.js - FIXED with CORS proxy
export const getCoordinatesFromAddress = async (address, city, state, zipCode) => {
  try {
    // Construct full address
    const fullAddress = `${address}, ${city}, ${state}, ${zipCode}, India`;
    
    // Using CORS proxy + OpenStreetMap Nominatim API
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}&limit=1`;
    
    const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
    const data = await response.json();
    
    if (data && data.length > 0) {
      const result = data[0];
      return {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
        success: true
      };
    } else {
      // Fallback: Try with just city and state
      const simplifiedAddress = `${city}, ${state}, India`;
      const fallbackApiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(simplifiedAddress)}&limit=1`;
      
      const fallbackResponse = await fetch(proxyUrl + encodeURIComponent(fallbackApiUrl));
      const fallbackData = await fallbackResponse.json();
      
      if (fallbackData && fallbackData.length > 0) {
        const result = fallbackData[0];
        return {
          latitude: parseFloat(result.lat),
          longitude: parseFloat(result.lon),
          success: true,
          approximate: true
        };
      }
    }
    
    return { success: false, error: 'Address not found' };
  } catch (error) {
    console.error('Geocoding error:', error);
    return { success: false, error: 'Failed to get coordinates' };
  }
};
