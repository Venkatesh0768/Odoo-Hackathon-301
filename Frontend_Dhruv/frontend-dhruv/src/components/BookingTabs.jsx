// components/BookingTabs.jsx
import React from 'react';

const BookingTabs = ({ activeTab, onTabChange, upcomingCount, pastCount }) => {
  const tabs = [
    { id: 'upcoming', label: 'Upcoming Bookings', count: upcomingCount },
    { id: 'past', label: 'Past Bookings', count: pastCount }
  ];

  return (
    <div className="flex mb-6">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
            activeTab === tab.id
              ? 'bg-black text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } ${tab.id === 'upcoming' ? 'rounded-l-lg' : 'rounded-r-lg'}`}
        >
          {tab.label}
          {tab.count > 0 && (
            <span className="ml-2 bg-white text-black px-2 py-1 rounded-full text-xs">
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default BookingTabs;
