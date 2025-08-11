// components/BookingCard.jsx
import React, { useState } from 'react';

const BookingCard = ({ booking, court, facility, onStatusUpdate }) => {
  const [loading, setLoading] = useState(false);

  const getStatusColor = (status) => {
    const colors = {
      'Confirmed': 'bg-green-500',
      'Pending': 'bg-yellow-500',
      'Completed': 'bg-blue-500',
      'Cancelled': 'bg-red-500'
    };
    return colors[status] || 'bg-gray-500';
  };

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    // Assuming timeString is in HH:MM format
    const [hours, minutes] = timeString.split(':');
    const hour12 = hours % 12 || 12;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handleStatusUpdate = async (newStatus) => {
    setLoading(true);
    try {
      await onStatusUpdate(booking._id || booking.id, newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-4 hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">
            {getSportEmoji(court?.sportType)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {booking.userName || booking.user?.name || 'Guest User'}
            </h3>
            <p className="text-gray-600 text-sm">
              {court?.name} - {facility?.name}
            </p>
          </div>
        </div>
        <div className={`${getStatusColor(booking.status)} text-white text-xs px-3 py-1 rounded-full`}>
          {booking.status}
        </div>
      </div>

      {/* Booking Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-400">📍</span>
          <div>
            <p className="text-xs text-gray-500">Location</p>
            <p className="text-sm font-medium">{facility?.city}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">📅</span>
          <div>
            <p className="text-xs text-gray-500">Date</p>
            <p className="text-sm font-medium">
              {formatDate(booking.bookingDate || booking.date)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">⏰</span>
          <div>
            <p className="text-xs text-gray-500">Time</p>
            <p className="text-sm font-medium">
              {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">💰</span>
          <div>
            <p className="text-xs text-gray-500">Amount</p>
            <p className="text-sm font-medium text-green-600">
              ₹{booking.totalAmount || booking.amount}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
        <div className="flex gap-2">
          {booking.status === 'Pending' && (
            <>
              <button
                onClick={() => handleStatusUpdate('Confirmed')}
                disabled={loading}
                className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-2 rounded-lg text-sm flex-1 transition-colors"
              >
                {loading ? '⏳' : '✅'} Confirm
              </button>
              <button
                onClick={() => handleStatusUpdate('Cancelled')}
                disabled={loading}
                className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-4 py-2 rounded-lg text-sm flex-1 transition-colors"
              >
                {loading ? '⏳' : '❌'} Cancel
              </button>
            </>
          )}
          {booking.status === 'Confirmed' && (
            <button
              onClick={() => handleStatusUpdate('Completed')}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg text-sm flex-1 transition-colors"
            >
              {loading ? '⏳' : '✅'} Mark Complete
            </button>
          )}
        </div>
      )}

      {/* Booking ID */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          Booking ID: {booking._id?.slice(-8) || booking.id?.slice(-8)}
        </p>
      </div>
    </div>
  );
};

export default BookingCard;
