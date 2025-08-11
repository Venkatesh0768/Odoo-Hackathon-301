// components/FacilityForm.jsx - ADD these imports and updates
import React, { useState, useCallback, useEffect } from 'react';
import { facilitiesAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { getCoordinatesFromAddress } from '../utils/geocoding';

const FacilityForm = ({ onClose, onSave, editingFacility = null }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: editingFacility?.name || '',
    description: editingFacility?.description || '',
    address: editingFacility?.address || '',
    city: editingFacility?.city || '',
    state: editingFacility?.state || '',
    zipCode: editingFacility?.zipCode || '',
    latitude: editingFacility?.latitude || 0,
    longitude: editingFacility?.longitude || 0
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoSuccess, setGeoSuccess] = useState(false);

  // Debounced geocoding function
  const debouncedGeocode = useCallback(
    debounce(async (address, city, state, zipCode) => {
      if (address && city && state) {
        setGeoLoading(true);
        const result = await getCoordinatesFromAddress(address, city, state, zipCode);
        
        if (result.success) {
          setFormData(prev => ({
            ...prev,
            latitude: result.latitude,
            longitude: result.longitude
          }));
          setGeoSuccess(true);
          setTimeout(() => setGeoSuccess(false), 3000);
        }
        setGeoLoading(false);
      }
    }, 1500),
    []
  );

  // Auto-geocode when address fields change
  useEffect(() => {
    if (formData.address && formData.city && formData.state) {
      debouncedGeocode(formData.address, formData.city, formData.state, formData.zipCode);
    }
  }, [formData.address, formData.city, formData.state, formData.zipCode, debouncedGeocode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'latitude' || name === 'longitude' ? parseFloat(value) || 0 : value
    });
  };

  const handleManualGeocode = async () => {
    if (!formData.address || !formData.city || !formData.state) {
      setError('Please fill in address, city, and state fields first');
      return;
    }

    setGeoLoading(true);
    const result = await getCoordinatesFromAddress(
      formData.address, 
      formData.city, 
      formData.state, 
      formData.zipCode
    );
    
    if (result.success) {
      setFormData(prev => ({
        ...prev,
        latitude: result.latitude,
        longitude: result.longitude
      }));
      setGeoSuccess(true);
      setTimeout(() => setGeoSuccess(false), 3000);
    } else {
      setError(result.error || 'Failed to get coordinates');
    }
    setGeoLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ownerId: user?.id || user?._id || '',
        name: formData.name,
        description: formData.description,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        latitude: formData.latitude,
        longitude: formData.longitude
      };

      console.log('Submitting facility data:', payload);

      let result;
      if (editingFacility) {
        result = await facilitiesAPI.updateFacility(editingFacility._id, payload);
      } else {
        result = await facilitiesAPI.createFacility(payload);
      }

      console.log('API response:', result);
      onSave(result.data || result);
      
    } catch (error) {
      console.error('Error saving facility:', error);
      setError(error.message || 'Failed to save facility');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              {editingFacility ? 'Edit Facility' : 'Add New Facility'}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Basic Information */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Facility Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter facility name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Address *</label>
                <input
                  type="text"
                  name="address"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Street address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            {/* Location Details - IMPROVED LAYOUT */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">State *</label>
                <select
                  name="state"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option value="">Select State</option>
                  <option value="AP">Andhra Pradesh</option>
                  <option value="AR">Arunachal Pradesh</option>
                  <option value="AS">Assam</option>
                  <option value="BR">Bihar</option>
                  <option value="CG">Chhattisgarh</option>
                  <option value="GA">Goa</option>
                  <option value="GJ">Gujarat</option>
                  <option value="HR">Haryana</option>
                  <option value="HP">Himachal Pradesh</option>
                  <option value="JH">Jharkhand</option>
                  <option value="KA">Karnataka</option>
                  <option value="KL">Kerala</option>
                  <option value="MP">Madhya Pradesh</option>
                  <option value="MH">Maharashtra</option>
                  <option value="MN">Manipur</option>
                  <option value="ML">Meghalaya</option>
                  <option value="MZ">Mizoram</option>
                  <option value="NL">Nagaland</option>
                  <option value="OR">Odisha</option>
                  <option value="PB">Punjab</option>
                  <option value="RJ">Rajasthan</option>
                  <option value="SK">Sikkim</option>
                  <option value="TN">Tamil Nadu</option>
                  <option value="TG">Telangana</option>
                  <option value="TR">Tripura</option>
                  <option value="UP">Uttar Pradesh</option>
                  <option value="UK">Uttarakhand</option>
                  <option value="WB">West Bengal</option>
                  <option value="AN">Andaman and Nicobar Islands</option>
                  <option value="CH">Chandigarh</option>
                  <option value="DN">Dadra and Nagar Haveli and Daman and Diu</option>
                  <option value="DL">Delhi</option>
                  <option value="JK">Jammu and Kashmir</option>
                  <option value="LA">Ladakh</option>
                  <option value="LD">Lakshadweep</option>
                  <option value="PY">Puducherry</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">PIN Code *</label>
                <input
                  type="text"
                  name="zipCode"
                  required
                  pattern="[0-9]{6}"
                  title="Please enter a valid 6-digit PIN code (e.g., 390014)"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="390014"
                  maxLength="6"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                name="description"
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Describe your facility..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Location Coordinates - AUTO-FILLED */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Location Coordinates</h3>
              <div className="flex items-center gap-3">
                {geoLoading && (
                  <div className="flex items-center gap-2 text-blue-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-sm">Getting coordinates...</span>
                  </div>
                )}
                {geoSuccess && (
                  <div className="flex items-center gap-2 text-green-600">
                    <span>✅</span>
                    <span className="text-sm">Coordinates updated!</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleManualGeocode}
                  disabled={geoLoading}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg text-sm"
                >
                  📍 Get Coordinates
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Latitude</label>
                <input
                  type="number"
                  name="latitude"
                  step="any"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50"
                  placeholder="Auto-filled from address"
                  value={formData.latitude}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Longitude</label>
                <input
                  type="number"
                  name="longitude"
                  step="any"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50"
                  placeholder="Auto-filled from address"
                  value={formData.longitude}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              💡 Coordinates are automatically filled when you enter the address. Click "Get Coordinates" to refresh.
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-green-300"
            >
              {loading ? 'Saving...' : (editingFacility ? 'Update Facility' : 'Create Facility')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default FacilityForm;
