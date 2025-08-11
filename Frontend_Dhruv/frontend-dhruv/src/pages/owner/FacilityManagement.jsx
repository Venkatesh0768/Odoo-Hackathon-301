import React, { useState } from 'react';
import OwnerSidebar from '../../components/OwnerSidebar';
import FacilityHeader from '../../components/FacilityHeader';
import FacilityForm from '../../components/FacilityForm';

const FacilityManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [facilities, setFacilities] = useState([
    {
      id: 1,
      name: 'Premium Sports Complex',
      location: 'Downtown Area',
      description: 'Modern sports facility with state-of-the-art equipment',
      sports: ['Badminton', 'Tennis', 'Basketball'],
      amenities: ['Parking', 'Changing Rooms', 'Cafeteria'],
      photos: []
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <OwnerSidebar />
      <div className="flex-1 ml-64 p-6">
        <FacilityHeader 
          onAddFacility={() => setShowAddForm(true)}
          facilitiesCount={facilities.length}
        />
        
        {showAddForm && (
          <FacilityForm 
            onClose={() => setShowAddForm(false)}
            onSave={(newFacility) => {
              setFacilities([...facilities, newFacility]);
              setShowAddForm(false);
            }}
          />
        )}
        
        {/* Existing Facilities List */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Your Facilities</h2>
          <div className="space-y-4">
            {facilities.map(facility => (
              <div key={facility.id} className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-bold">{facility.name}</h3>
                <p className="text-gray-600 mb-2">{facility.location}</p>
                <p className="text-sm text-gray-500 mb-4">{facility.description}</p>
                <div className="flex gap-2 mb-2">
                  {facility.sports.map(sport => (
                    <span key={sport} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      {sport}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  {facility.amenities.map(amenity => (
                    <span key={amenity} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityManagement;
