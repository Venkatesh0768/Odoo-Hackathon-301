// pages/owner/CourtManagement.jsx - UPDATED with API integration
import React, { useState, useEffect } from 'react';
import OwnerSidebar from '../../components/OwnerSidebar';
import CourtHeader from '../../components/CourtHeader';
import CourtForm from '../../components/CourtForm';
import CourtCard from '../../components/CourtCard';
import { courtsAPI, facilitiesAPI } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const CourtManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCourt, setEditingCourt] = useState(null);
  const [courts, setCourts] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    sport: 'All',
    facility: 'All'
  });
  
  const { user } = useAuth();

  // Load courts and facilities on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Load both courts and facilities
      const [courtsResponse, facilitiesResponse] = await Promise.all([
        courtsAPI.getAllCourts(),
        facilitiesAPI.getAllFacilities()
      ]);
      
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
      
      setCourts(userCourts);
      setFacilities(userFacilities);
      
      console.log('Loaded courts:', userCourts);
      console.log('Loaded facilities:', userFacilities);
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Failed to load courts and facilities');
      setCourts([]);
      setFacilities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourt = async (newCourt) => {
    try {
      console.log('Adding new court:', newCourt);
      setCourts(prev => [...prev, newCourt]);
      setShowAddForm(false);
      // Optionally reload from server to get latest data
      // await loadData();
    } catch (error) {
      console.error('Error adding court:', error);
      setError('Failed to add court');
    }
  };

  const handleEditCourt = (court) => {
    setEditingCourt(court);
  };

  const handleUpdateCourt = async (updatedCourt) => {
    try {
      console.log('Updating court:', updatedCourt);
      setCourts(prev => 
        prev.map(court => 
          (court._id || court.id) === (editingCourt._id || editingCourt.id) 
            ? updatedCourt 
            : court
        )
      );
      setEditingCourt(null);
    } catch (error) {
      console.error('Error updating court:', error);
      setError('Failed to update court');
    }
  };

  const handleDeleteCourt = async (courtId) => {
    try {
      await courtsAPI.deleteCourt(courtId);
      setCourts(prev => prev.filter(court => (court._id || court.id) !== courtId));
      console.log('Court deleted successfully');
    } catch (error) {
      console.error('Error deleting court:', error);
      setError('Failed to delete court');
    }
  };

  // Filter courts based on selected filters
  const filteredCourts = courts.filter(court => {
    const matchesSport = filters.sport === 'All' || court.sportType === filters.sport;
    const matchesFacility = filters.facility === 'All' || court.facilityId === filters.facility;
    return matchesSport && matchesFacility;
  });

  // Get facility details for a court
  const getFacilityForCourt = (courtFacilityId) => {
    return facilities.find(f => (f._id || f.id) === courtFacilityId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <OwnerSidebar />
        <div className="flex-1 ml-64 p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading courts...</p>
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
        <CourtHeader 
          onAddCourt={() => setShowAddForm(true)}
          courtsCount={courts.length}
          activeCount={courts.length} // All courts are active in this schema
          filters={filters}
          onFiltersChange={setFilters}
          facilities={facilities}
        />
        
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Add Court Form */}
        {showAddForm && (
          <CourtForm 
            onClose={() => setShowAddForm(false)}
            onSave={handleAddCourt}
          />
        )}

        {/* Edit Court Form */}
        {editingCourt && (
          <CourtForm 
            onClose={() => setEditingCourt(null)}
            onSave={handleUpdateCourt}
            editingCourt={editingCourt}
          />
        )}
        
        {/* Courts List */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">
            Your Courts ({filteredCourts.length})
          </h2>
          
          {filteredCourts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-4xl mb-4">🏟️</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {courts.length === 0 ? 'No Courts Yet' : 'No Courts Match Filters'}
              </h3>
              <p className="text-gray-600 mb-4">
                {courts.length === 0 
                  ? 'Start by adding your first court to manage your sports venues.'
                  : 'Try adjusting your filters to see more courts.'
                }
              </p>
              {courts.length === 0 && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium"
                >
                  Add Your First Court
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourts.map(court => (
                <CourtCard
                  key={court._id || court.id}
                  court={court}
                  facility={getFacilityForCourt(court.facilityId)}
                  onEdit={handleEditCourt}
                  onDelete={handleDeleteCourt}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourtManagement;
