// components/FacilityCard.jsx - NEW component to display facilities
import React, { useState } from 'react';

const FacilityCard = ({ facility, onEdit, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this facility?')) {
      setLoading(true);
      try {
        await onDelete(facility._id || facility.id);
      } catch (error) {
        console.error('Error deleting facility:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{facility.name}</h3>
          <p className="text-gray-600 text-sm mt-1">
            📍 {facility.address}, {facility.city}, {facility.state} {facility.zipCode}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(facility)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            ✏️ Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            {loading ? '⏳' : '🗑️'} Delete
          </button>
        </div>
      </div>

      {/* Description */}
      {facility.description && (
        <div className="mb-4">
          <p className="text-gray-700 text-sm">{facility.description}</p>
        </div>
      )}

      {/* Location Info */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-gray-50 p-3 rounded-lg">
          <h4 className="font-medium text-gray-900">City</h4>
          <p className="text-gray-600">{facility.city}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <h4 className="font-medium text-gray-900">State</h4>
          <p className="text-gray-600">{facility.state}</p>
        </div>
      </div>

      {/* Coordinates (if available) */}
      {(facility.latitude !== 0 || facility.longitude !== 0) && (
        <div className="mt-4 bg-green-50 p-3 rounded-lg">
          <h4 className="font-medium text-green-800 text-sm">GPS Coordinates</h4>
          <p className="text-green-600 text-sm">
            📍 {facility.latitude}, {facility.longitude}
          </p>
        </div>
      )}

      {/* Creation Date */}
      <div className="mt-4 text-xs text-gray-500">
        Created: {new Date(facility.createdAt || Date.now()).toLocaleDateString()}
      </div>
    </div>
  );
};

export default FacilityCard;
