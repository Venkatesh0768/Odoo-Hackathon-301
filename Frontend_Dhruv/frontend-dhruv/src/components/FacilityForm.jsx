import React, { useState } from 'react';
import SportsGrid from './SportsGrid';
import AmenitiesGrid from './AmenitiesGrid';
import PhotoUpload from './PhotoUpload';

const FacilityForm = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    sports: [],
    amenities: [],
    photos: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFacility = {
      id: Date.now(),
      ...formData
    };
    onSave(newFacility);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Add New Facility</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {/* Basic Information */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Facility Name</label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Enter facility name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Enter location address"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Describe your facility..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>

          {/* Sports Supported */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4">Sports Supported</h3>
            <SportsGrid
              selectedSports={formData.sports}
              onSportsChange={(sports) => setFormData({...formData, sports})}
            />
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4">Amenities</h3>
            <AmenitiesGrid
              selectedAmenities={formData.amenities}
              onAmenitiesChange={(amenities) => setFormData({...formData, amenities})}
            />
          </div>

          {/* Photo Gallery */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4">Photo Gallery</h3>
            <PhotoUpload
              photos={formData.photos}
              onPhotosChange={(photos) => setFormData({...formData, photos})}
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FacilityForm;
