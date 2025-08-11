// components/CourtHeader.jsx - UPDATED with facility filter
import React from 'react';

const CourtHeader = ({ 
  onAddCourt, 
  courtsCount, 
  activeCount, 
  filters, 
  onFiltersChange, 
  facilities 
}) => {
  const sports = [
    'All', 'TENNIS', 'BADMINTON', 'BASKETBALL', 'FOOTBALL', 
    'VOLLEYBALL', 'SQUASH', 'TABLE_TENNIS', 'CRICKET'
  ];

  const formatSportName = (sport) => {
    if (sport === 'All') return 'All Sports';
    return sport.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Court Management</h1>
          <p className="text-gray-600">Manage your courts, pricing, and availability</p>
        </div>
        <button
          onClick={onAddCourt}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <span>+</span>
          Add New Court
        </button>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-800">Total Courts</h3>
          <p className="text-2xl font-bold text-green-600">{courtsCount}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800">Active Courts</h3>
          <p className="text-2xl font-bold text-blue-600">{activeCount}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-yellow-800">Facilities</h3>
          <p className="text-2xl font-bold text-yellow-600">{facilities.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sport Type</label>
          <select
            value={filters.sport}
            onChange={(e) => onFiltersChange({...filters, sport: e.target.value})}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            {sports.map(sport => (
              <option key={sport} value={sport}>{formatSportName(sport)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Facility</label>
          <select
            value={filters.facility}
            onChange={(e) => onFiltersChange({...filters, facility: e.target.value})}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="All">All Facilities</option>
            {facilities.map(facility => (
              <option key={facility._id || facility.id} value={facility._id || facility.id}>
                {facility.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CourtHeader;
