import React from "react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
        <div className="bg-white p-6 rounded-xl shadow border border-[#e5e5e5]">
          <p className="text-gray-600">User profile information will appear here...</p>
          {/* TODO: Add profile form when backend is ready */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
