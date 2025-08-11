// pages/owner/FacilityManagement.jsx - UPDATED with API integration
import React, { useState, useEffect } from 'react';
import OwnerSidebar from '../../components/OwnerSidebar';
import FacilityHeader from '../../components/FacilityHeader';
import FacilityForm from '../../components/FacilityForm';
import FacilityCard from '../../components/FacilityCard';
import { facilitiesAPI } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const FacilityManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingFacility, setEditingFacility] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { user } = useAuth();

  // Load facilities on component mount
  useEffect(() => {
    loadFacilities();
  }, []);

  const loadFacilities = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await facilitiesAPI.getAllFacilities();
      
      // Filter facilities by current owner if needed
      const userFacilities = response.data || response;
      
      // If API returns all facilities, filter by owner
      const ownerFacilities = userFacilities.filter(
        facility => facility.ownerId === (user?.id || user?._id)
      );
      
      setFacilities(ownerFacilities);
      console.log('Loaded facilities:', ownerFacilities);
    } catch (error) {
      console.error('Error loading facilities:', error);
      setError('Failed to load facilities');
      setFacilities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFacility = async (newFacility) => {
    try {
      console.log('Adding new facility:', newFacility);
      setFacilities(prev => [...prev, newFacility]);
      setShowAddForm(false);
      // Optionally reload from server to get latest data
      // await loadFacilities();
    } catch (error) {
      console.error('Error adding facility:', error);
      setError('Failed to add facility');
    }
  };

  const handleEditFacility = (facility) => {
    setEditingFacility(facility);
  };

  const handleUpdateFacility = async (updatedFacility) => {
    try {
      console.log('Updating facility:', updatedFacility);
      setFacilities(prev => 
        prev.map(facility => 
          facility._id === editingFacility._id ? updatedFacility : facility
        )
      );
      setEditingFacility(null);
    } catch (error) {
      console.error('Error updating facility:', error);
      setError('Failed to update facility');
    }
  };

  const handleDeleteFacility = async (facilityId) => {
    try {
      await facilitiesAPI.deleteFacility(facilityId);
      setFacilities(prev => prev.filter(facility => facility._id !== facilityId));
      console.log('Facility deleted successfully');
    } catch (error) {
      console.error('Error deleting facility:', error);
      setError('Failed to delete facility');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <OwnerSidebar />
        <div className="flex-1 ml-64 p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading facilities...</p>
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
        <FacilityHeader 
          onAddFacility={() => setShowAddForm(true)}
          facilitiesCount={facilities.length}
        />
        
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Add Facility Form */}
        {showAddForm && (
          <FacilityForm 
            onClose={() => setShowAddForm(false)}
            onSave={handleAddFacility}
          />
        )}

        {/* Edit Facility Form */}
        {editingFacility && (
          <FacilityForm 
            onClose={() => setEditingFacility(null)}
            onSave={handleUpdateFacility}
            editingFacility={editingFacility}
          />
        )}
        
        {/* Facilities List */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Your Facilities ({facilities.length})</h2>
          
          {facilities.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No Facilities Yet</h3>
              <p className="text-gray-600 mb-4">
                Start by adding your first facility to manage your sports venues.
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium"
              >
                Add Your First Facility
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilities.map(facility => (
                <FacilityCard
                  key={facility._id || facility.id}
                  facility={facility}
                  onEdit={handleEditFacility}
                  onDelete={handleDeleteFacility}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacilityManagement;
