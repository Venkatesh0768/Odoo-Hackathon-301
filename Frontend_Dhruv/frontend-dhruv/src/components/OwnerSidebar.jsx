import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const OwnerSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { 
      name: 'Dashboard', 
      path: '/owner/dashboard', 
      icon: '📊' 
    },
    { 
      name: 'Facility Management', 
      path: '/owner/facility-management', 
      icon: '🏢' 
    },
    { 
      name: 'Court Management', 
      path: '/owner/court-management', 
      icon: '🏟️' 
    },
    { 
      name: 'Bookings', 
      path: '/owner/bookings', 
      icon: '📅' 
    },
    { 
      name: 'Profile', 
      path: '/owner/profile', 
      icon: '👤' 
    }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-black text-white p-6">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-green-500">QuickCourt</h1>
        <p className="text-sm text-gray-400">Owner Dashboard</p>
      </div>

      {/* Menu Items */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
              location.pathname === item.path
                ? 'bg-green-500 text-white'
                : 'hover:bg-gray-800 text-gray-300'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default OwnerSidebar;
