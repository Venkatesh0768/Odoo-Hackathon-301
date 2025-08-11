// components/AccountStats.jsx
import React from 'react';

const AccountStats = () => {
  const stats = [
    { label: 'Facilities', value: 2, color: 'green' },
    { label: 'Courts', value: 8, color: 'blue' },
    { label: 'Total Bookings', value: 156, color: 'yellow' },
    { label: 'Monthly Revenue', value: '$8.5K', color: 'purple' }
  ];

  const getColorClasses = (color) => {
    const colors = {
      green: 'bg-green-50 text-green-800',
      blue: 'bg-blue-50 text-blue-800',
      yellow: 'bg-yellow-50 text-yellow-800',
      purple: 'bg-purple-50 text-purple-800'
    };
    return colors[color] || 'bg-gray-50 text-gray-800';
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-bold mb-4">Account Statistics</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
          Cancel
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AccountStats;
