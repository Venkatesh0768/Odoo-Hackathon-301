// components/CourtForm.jsx - UPDATED for your API schema
import React, { useState, useEffect } from 'react';
import { courtsAPI, facilitiesAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import SportTypeSelector from './SportTypeSelector';

const CourtForm = ({ onClose, onSave, editingCourt = null }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    facilityId: editingCourt?.facilityId || '',
    name: editingCourt?.name || '',
    sportType: editingCourt?.sportType || '',
    pricePerHour: editingCourt?.pricePerHour || 0,
    operatingHours: editingCourt?.operatingHours || '6:00 AM - 10:00 PM',
    availabilityIds: editingCourt?.availabilityIds || [],
    bookingIds: editingCourt?.bookingIds || [],
    matchIds: editingCourt?.matchIds || []
  });
  
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load user's facilities on component mount
  useEffect(() => {
    loadFacilities();
  }, []);

  const loadFacilities = async () => {
    try {
      const response = await facilitiesAPI.getAllFacilities();
      const userFacilities = (response.data || response).filter(
        facility => facility.ownerId === (user?.id || user?._id)
      );
      setFacilities(userFacilities);
    } catch (error) {
      console.error('Error loading facilities:', error);
      setError('Failed to load facilities');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'pricePerHour' ? parseFloat(value) || 0 : value
    });
  };

  const handleSportChange = (sportType) => {
    setFormData({
      ...formData,
      sportType
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Prepare payload according to your API schema
      const payload = {
        facilityId: formData.facilityId,
        name: formData.name,
        sportType: formData.sportType,
        pricePerHour: formData.pricePerHour,
        operatingHours: formData.operatingHours,
        availabilityIds: formData.availabilityIds,
        bookingIds: formData.bookingIds,
        matchIds: formData.matchIds
      };

      console.log('Submitting court data:', payload);

      let result;
      if (editingCourt) {
        result = await courtsAPI.updateCourt(editingCourt._id || editingCourt.id, payload);
      } else {
        result = await courtsAPI.createCourt(payload);
      }

      console.log('API response:', result);
      onSave(result.data || result);
      
    } catch (error) {
      console.error('Error saving court:', error);
      setError(error.message || 'Failed to save court');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              {editingCourt ? 'Edit Court' : 'Add New Court'}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
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
            <h3 className="text-lg font-bold mb-4">Court Information</h3>
            
            {/* Facility Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Select Facility *</label>
              <select
                name="facilityId"
                required
                value={formData.facilityId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Choose a facility</option>
                {facilities.map(facility => (
                  <option key={facility._id || facility.id} value={facility._id || facility.id}>
                    📍 {facility.name} - {facility.city}
                  </option>
                ))}
              </select>
              {facilities.length === 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  No facilities found. Please create a facility first.
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Court Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., Tennis Court 1"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Price per Hour (₹) *</label>
                <input
                  type="number"
                  name="pricePerHour"
                  required
                  min="0"
                  step="0.01"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="500"
                  value={formData.pricePerHour}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <SportTypeSelector
                selectedSport={formData.sportType}
                onSportChange={handleSportChange}
              />
              <div>
                <label className="block text-sm font-medium mb-2">Operating Hours</label>
                <input
                  type="text"
                  name="operatingHours"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="6:00 AM - 10:00 PM"
                  value={formData.operatingHours}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4">Additional Details</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                📝 <strong>Note:</strong> The following fields will be automatically managed by the system:
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• <strong>Availability IDs:</strong> Managed through booking system</li>
                <li>• <strong>Booking IDs:</strong> Auto-populated when bookings are made</li>
                <li>• <strong>Match IDs:</strong> Connected when matches are scheduled</li>
              </ul>
            </div>
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
              disabled={loading || !formData.facilityId}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-green-300"
            >
              {loading ? 'Saving...' : (editingCourt ? 'Update Court' : 'Create Court')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourtForm;
