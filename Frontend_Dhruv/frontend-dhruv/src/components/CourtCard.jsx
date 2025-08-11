// components/CourtCard.jsx - UPDATED for your API schema
import React, { useState } from 'react';

const CourtCard = ({ court, facility, onEdit, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const getSportEmoji = (sportType) => {
    const emojis = {
      'TENNIS': '🎾',
      'BADMINTON': '🏸',
      'BASKETBALL': '🏀',
      'FOOTBALL': '⚽',
      'VOLLEYBALL': '🏐',
      'SQUASH': '🥎',
      'TABLE_TENNIS': '🏓',
      'CRICKET': '🏏'
    };
    return emojis[sportType] || '🏟️';
  };

  const formatSportType = (sportType) => {
    return sportType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this court?')) {
      setLoading(true);
      try {
        await onDelete(court._id || court.id);
      } catch (error) {
        console.error('Error deleting court:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-black text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{getSportEmoji(court.sportType)}</div>
          <div>
            <h3 className="text-lg font-bold">{court.name}</h3>
            <p className="text-gray-400 text-sm">{formatSportType(court.sportType)}</p>
          </div>
        </div>
        <div className="bg-green-500 text-xs px-2 py-1 rounded-full">
          Active
        </div>
      </div>

      {/* Facility Info */}
      {facility && (
        <div className="mb-4 bg-gray-800 p-3 rounded-lg">
          <p className="text-xs text-gray-400">Located at</p>
          <p className="text-sm text-white">{facility.name}</p>
          <p className="text-xs text-gray-400">{facility.city}, {facility.state}</p>
        </div>
      )}

      {/* Price */}
      <div className="bg-yellow-600 text-black px-3 py-2 rounded-lg inline-block mb-4">
        <span className="font-bold">₹{court.pricePerHour}/hour</span>
      </div>

      {/* Operating Hours */}
      <div className="mb-4">
        <p className="text-gray-400 text-sm">Operating Hours</p>
        <p className="text-white text-sm">{court.operatingHours}</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
        <div className="bg-gray-800 p-2 rounded">
          <p className="text-xs text-gray-400">Bookings</p>
          <p className="text-sm font-bold text-blue-400">{court.bookingIds?.length || 0}</p>
        </div>
        <div className="bg-gray-800 p-2 rounded">
          <p className="text-xs text-gray-400">Matches</p>
          <p className="text-sm font-bold text-green-400">{court.matchIds?.length || 0}</p>
        </div>
        <div className="bg-gray-800 p-2 rounded">
          <p className="text-xs text-gray-400">Slots</p>
          <p className="text-sm font-bold text-yellow-400">{court.availabilityIds?.length || 0}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(court)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm flex-1 transition-colors"
        >
          ✏️ Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 px-4 py-2 rounded text-sm flex-1 transition-colors"
        >
          {loading ? '⏳' : '🗑️'} Delete
        </button>
      </div>
    </div>
  );
};

export default CourtCard;
