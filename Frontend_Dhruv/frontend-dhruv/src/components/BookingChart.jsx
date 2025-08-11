import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BookingChart = () => {
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookingData();
  }, []);

  const fetchBookingData = async () => {
    try {
      // TODO: Replace with actual API endpoint
      // const response = await fetch('/analytics/booking-trends/daily/');
      // const data = await response.json();
      
      // Mock data for development
      const mockData = [
        { day: 'Mon', bookings: 12 },
        { day: 'Tue', bookings: 18 },
        { day: 'Wed', bookings: 15 },
        { day: 'Thu', bookings: 25 },
        { day: 'Fri', bookings: 30 },
        { day: 'Sat', bookings: 35 },
        { day: 'Sun', bookings: 28 }
      ];

      setBookingData(mockData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching booking data:', error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-[#e5e5e5]">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Weekly Booking Trends</h3>
      
      {loading ? (
        <div className="h-72 bg-gray-100 rounded animate-pulse"></div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={bookingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="bookings" fill="#10B981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default BookingChart;
