// components/ContactInfoDisplay.jsx
import React from 'react';

const ContactInfoDisplay = ({ user }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
      <h3 className="text-lg font-bold mb-4">Contact Information</h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-600">📧</span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Primary email</p>
            <p className="font-medium">{user?.email}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600">📞</span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Business phone</p>
            <p className="font-medium">{user?.phoneNumber}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
            <span className="text-yellow-600">📍</span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Business Address</p>
            <p className="font-medium">123 Main Street</p>
            <p className="text-sm text-gray-600">Anytown, ST 12345</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoDisplay;
