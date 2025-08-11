// components/BookingHeader.jsx
import React from 'react';

const BookingHeader = ({ 
  searchTerm, 
  onSearchChange, 
  selectedStatus, 
  onStatusChange,
  bookingsCount,
  upcomingCount,
  totalRevenue 
}) => {
  const statuses = ['All Status', 'Confirmed', 'Pending', 'Completed', 'Cancelled'];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Booking Overview</h1>
          <p className="text-gray-600">View and manage all facility bookings</p>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-800">Total Bookings</h3>
          <p className="text-2xl font-bold text-green-600">{bookingsCount}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800">Upcoming Bookings</h3>
          <p className="text-2xl font-bold text-blue-600">{upcomingCount}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-yellow-800">Total Revenue</h3>
          <p className="text-2xl font-bold text-yellow-600">₹{totalRevenue?.toLocaleString()}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by user name or court..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
        </div>
        <div className="md:w-48">
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default BookingHeader;
