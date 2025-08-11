// components/ProfileHeader.jsx
import React, { useState } from 'react';

const ProfileHeader = ({ user, onEditToggle, isEditing }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>
        <button
          onClick={onEditToggle}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          {isEditing ? 'Cancel Edit' : 'Edit Profile'}
        </button>
      </div>

      {/* Profile Summary */}
      <div className="mt-6 flex items-center gap-6">
        <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-600">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </span>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold">{user?.firstName} {user?.lastName}</h2>
          <p className="text-gray-600">Facility Owner</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
              Verified Owner
            </span>
          </div>
        </div>
        <div className="ml-auto text-right">
          <p className="text-sm text-gray-500">📅 Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
          <p className="text-sm text-gray-500">🏢 2 Facilities Managed</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
