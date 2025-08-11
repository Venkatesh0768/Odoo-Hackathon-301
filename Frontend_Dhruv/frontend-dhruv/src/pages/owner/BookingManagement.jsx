// pages/owner/BookingManagement.jsx
import React, { useState, useEffect } from 'react';
import OwnerSidebar from '../../components/OwnerSidebar';
import BookingHeader from '../../components/BookingHeader';
import BookingTabs from '../../components/BookingTabs';
import BookingCard from '../../components/BookingCard';
import { bookingsAPI, courtsAPI, facilitiesAPI } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [courts, setCourts] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filter states
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  
  const { user } = useAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Load all related data
      const [bookingsResponse, courtsResponse, facilitiesResponse] = await Promise.all([
        bookingsAPI.getAllBookings(),
        courtsAPI.getAllCourts(),
        facilitiesAPI.getAllFacilities()
      ]);
      
      const allBookings = bookingsResponse.data || bookingsResponse;
      const allCourts = courtsResponse.data || courtsResponse;
      const allFacilities = facilitiesResponse.data || facilitiesResponse;
      
      // Filter facilities by current owner
      const userFacilities = allFacilities.filter(
        facility => facility.ownerId === (user?.id || user?._id)
      );
      
      // Filter courts by user's facilities
      const userFacilityIds = userFacilities.map(f => f._id || f.id);
      const userCourts = allCourts.filter(
        court => userFacilityIds.includes(court.facilityId)
      );
      
      // Filter bookings by user's courts
      const userCourtIds = userCourts.map(c => c._id || c.id);
      const userBookings = allBookings.filter(
        booking => userCourtIds.includes(booking.courtId)
      );
      
      setBookings(userBookings);
      setCourts(userCourts);
      setFacilities(userFacilities);
      
      console.log('Loaded bookings:', userBookings);
    } catch (error) {
      console.error('Error loading bookings data:', error);
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await bookingsAPI.updateBookingStatus(bookingId, newStatus);
      
      // Update local state
      setBookings(prev => 
        prev.map(booking => 
          (booking._id || booking.id) === bookingId 
            ? { ...booking, status: newStatus }
            : booking
        )
      );
      
      console.log(`Booking ${bookingId} status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating booking status:', error);
      setError('Failed to update booking status');
    }
  };

  // Filter bookings based on tab, search, and status
  const filteredBookings = bookings.filter(booking => {
    // Tab filter (upcoming vs past)
    const now = new Date();
    const bookingDate = new Date(booking.bookingDate || booking.date);
    const isUpcoming = bookingDate >= now || booking.status === 'Confirmed' || booking.status === 'Pending';
    
    if (activeTab === 'upcoming' && !isUpcoming) return false;
    if (activeTab === 'past' && isUpcoming) return false;
    
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const userName = (booking.userName || booking.user?.name || '').toLowerCase();
      const court = courts.find(c => (c._id || c.id) === booking.courtId);
      const courtName = (court?.name || '').toLowerCase();
      
      if (!userName.includes(searchLower) && !courtName.includes(searchLower)) {
        return false;
      }
    }
    
    // Status filter
    if (selectedStatus !== 'All Status' && booking.status !== selectedStatus) {
      return false;
    }
    
    return true;
  });

  // Get court and facility details for a booking
  const getCourtForBooking = (courtId) => {
    return courts.find(c => (c._id || c.id) === courtId);
  };

  const getFacilityForCourt = (courtFacilityId) => {
    return facilities.find(f => (f._id || f.id) === courtFacilityId);
  };

  // Calculate stats
  const upcomingBookings = bookings.filter(b => {
    const bookingDate = new Date(b.bookingDate || b.date);
    return bookingDate >= new Date() || b.status === 'Confirmed' || b.status === 'Pending';
  });
  
  const totalRevenue = bookings
    .filter(b => b.status === 'Completed')
    .reduce((sum, b) => sum + (b.totalAmount || b.amount || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <OwnerSidebar />
        <div className="flex-1 ml-64 p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading bookings...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <OwnerSidebar />
      <div className="flex-1 ml-64 p-6">
        <BookingHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          bookingsCount={bookings.length}
          upcomingCount={upcomingBookings.length}
          totalRevenue={totalRevenue}
        />
        
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <BookingTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          upcomingCount={upcomingBookings.length}
          pastCount={bookings.length - upcomingBookings.length}
        />

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {activeTab === 'upcoming' ? 'No upcoming bookings' : 'No past bookings'}
              </h3>
              <p className="text-gray-600">
                {bookings.length === 0 
                  ? 'All bookings will appear here once customers make reservations.'
                  : 'All bookings matching your filters will appear here.'
                }
              </p>
            </div>
          ) : (
            filteredBookings.map(booking => {
              const court = getCourtForBooking(booking.courtId);
              const facility = court ? getFacilityForCourt(court.facilityId) : null;
              
              return (
                <BookingCard
                  key={booking._id || booking.id}
                  booking={booking}
                  court={court}
                  facility={facility}
                  onStatusUpdate={handleStatusUpdate}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingManagement;
