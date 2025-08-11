import React from 'react';

const FacilityHeader = ({ onAddFacility, facilitiesCount }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Facility Management</h1>
          <p className="text-gray-600">Manage your facility details and settings</p>
        </div>
        <button
          onClick={onAddFacility}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Add New Facility
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-800">Total Facilities</h3>
          <p className="text-2xl font-bold text-green-600">{facilitiesCount}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800">Active Courts</h3>
          <p className="text-2xl font-bold text-blue-600">12</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-yellow-800">Pending Approvals</h3>
          <p className="text-2xl font-bold text-yellow-600">2</p>
        </div>
      </div>
    </div>
  );
};

export default FacilityHeader;
