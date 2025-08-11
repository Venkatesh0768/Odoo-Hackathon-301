import React from "react";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="shadow-md sticky top-0 bg-white z-50">
      {/* Outer container with padding & max-width */}
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
        
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-green-500 w-3 h-3 rounded-full"></div>
          <span className="text-lg font-bold">QuickCourt</span>
        </div>

        {/* Search bar */}
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-96">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search for a venue..."
            className="bg-transparent outline-none flex-1"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-green-500">Home</a>
          <a href="#" className="hover:text-green-500">Venues</a>
          <a href="#" className="hover:text-green-500">My Bookings</a>
          <a href="#" className="hover:text-green-500">Profile</a>
          <img
            src="https://i.pravatar.cc/40"
            alt="user"
            className="w-10 h-10 rounded-full border"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
