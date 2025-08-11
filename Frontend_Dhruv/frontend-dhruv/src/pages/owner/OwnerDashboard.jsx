import React from "react";
import OwnerSidebar from "../../components/OwnerSidebar";
import SummaryCards from "../../components/SummaryCards";
import BookingChart from "../../components/BookingChart";
import EarningsChart from "../../components/EarningsChart";

const OwnerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <OwnerSidebar />
      
      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, Facility Owner!</h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your facility today.</p>
        </header>

        {/* Summary Cards Row */}
        <SummaryCards />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <BookingChart />
          <EarningsChart />
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
