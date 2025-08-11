// components/SportTypeSelector.jsx - NEW component for sport selection
import React from 'react';

const SportTypeSelector = ({ selectedSport, onSportChange, className = "" }) => {
  const sports = [
    { name: 'Badminton', emoji: '🏸', value: 'BADMINTON' },
    { name: 'Tennis', emoji: '🎾', value: 'TENNIS' },
    { name: 'Basketball', emoji: '🏀', value: 'BASKETBALL' },
    { name: 'Football', emoji: '⚽', value: 'FOOTBALL' },
    { name: 'Volleyball', emoji: '🏐', value: 'VOLLEYBALL' },
    { name: 'Squash', emoji: '🥎', value: 'SQUASH' },
    { name: 'Table Tennis', emoji: '🏓', value: 'TABLE_TENNIS' },
    { name: 'Cricket', emoji: '🏏', value: 'CRICKET' }
  ];

  return (
    <div className={className}>
      <label className="block text-sm font-medium mb-2">Sport Type *</label>
      <select
        value={selectedSport}
        onChange={(e) => onSportChange(e.target.value)}
        required
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
      >
        <option value="">Select Sport Type</option>
        {sports.map(sport => (
          <option key={sport.value} value={sport.value}>
            {sport.emoji} {sport.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SportTypeSelector;
