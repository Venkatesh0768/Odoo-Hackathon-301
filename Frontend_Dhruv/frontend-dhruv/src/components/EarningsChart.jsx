import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EarningsChart = () => {
  const [earningsData, setEarningsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEarningsData();
  }, []);

  const fetchEarningsData = async () => {
    try {
      // TODO: Replace with actual API endpoint
      // const response = await fetch('/analytics/earnings-summary/');
      // const data = await response.json();
      
      // Mock data for development
      const mockData = [
        { month: 'Jan', earnings: 5000 },
        { month: 'Feb', earnings: 5200 },
        { month: 'Mar', earnings: 4800 },
        { month: 'Apr', earnings: 6200 },
        { month: 'May', earnings: 7500 },
        { month: 'Jun', earnings: 8500 }
      ];

      setEarningsData(mockData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching earnings data:', error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-[#e5e5e5]">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Monthly Earnings</h3>
      
      {loading ? (
        <div className="h-72 bg-gray-100 rounded animate-pulse"></div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={earningsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${value}`, 'Earnings']} />
            <Line 
              type="monotone" 
              dataKey="earnings" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default EarningsChart;
