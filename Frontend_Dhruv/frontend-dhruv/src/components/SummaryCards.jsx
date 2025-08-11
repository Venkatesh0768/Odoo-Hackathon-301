import React, { useState, useEffect } from "react";

const SummaryCards = () => {
  const [summaryData, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummaryData();
  }, []);

  const fetchSummaryData = async () => {
    try {
      // TODO: Replace with actual API endpoint from your backend
      // const response = await fetch('/api/owner/summary-stats');
      // const data = await response.json();
      
      // Mock data for development
      const mockData = [
        {
          title: "Total Bookings",
          value: "156",
          change: "+12% from last month",
          icon: "📅",
          bgColor: "bg-green-500"
        },
        {
          title: "Active Courts", 
          value: "8",
          change: "2 under maintenance",
          icon: "🏟️",
          bgColor: "bg-blue-500"
        },
        {
          title: "Monthly Earnings",
          value: "$8,500",
          change: "+10% from last month", 
          icon: "💰",
          bgColor: "bg-yellow-400"
        },
        {
          title: "Active Users",
          value: "89",
          change: "+3% from last week",
          icon: "👥", 
          bgColor: "bg-emerald-500"
        }
      ];

      setSummaryData(mockData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching summary data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-lg border border-[#e5e5e5] animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryData.map((card, index) => (
        <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-[#e5e5e5] hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-4">
            <div className={`${card.bgColor} p-3 rounded-xl`}>
              <span className="text-2xl">{card.icon}</span>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">{card.title}</h3>
          <p className="text-2xl font-bold text-gray-800 mt-1">{card.value}</p>
          <p className="text-green-600 text-xs mt-2">{card.change}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
