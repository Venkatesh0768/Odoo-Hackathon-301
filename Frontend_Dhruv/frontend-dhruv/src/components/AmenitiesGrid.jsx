import React from 'react';

const AmenitiesGrid = ({ selectedAmenities, onAmenitiesChange }) => {
  const amenities = [
    { name: 'Parking', icon: '🅿️' },
    { name: 'Changing Rooms', icon: '🚿' },
    { name: 'Cafeteria', icon: '🍽️' },
    { name: 'Equipment Rental', icon: '🏏' },
    { name: 'Air Conditioning', icon: '❄️' },
    { name: 'First Aid', icon: '🩹' },
    { name: 'Pro Shop', icon: '🛍️' },
    { name: 'Lounge', icon: '🛋️' }
  ];

  const toggleAmenity = (amenityName) => {
    const newAmenities = selectedAmenities.includes(amenityName)
      ? selectedAmenities.filter(a => a !== amenityName)
      : [...selectedAmenities, amenityName];
    onAmenitiesChange(newAmenities);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {amenities.map(amenity => (
        <button
          key={amenity.name}
          type="button"
          onClick={() => toggleAmenity(amenity.name)}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedAmenities.includes(amenity.name)
              ? 'border-green-500 bg-green-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="text-2xl mb-2">{amenity.icon}</div>
          <p className="text-sm font-medium">{amenity.name}</p>
        </button>
      ))}
    </div>
  );
};

export default AmenitiesGrid;
