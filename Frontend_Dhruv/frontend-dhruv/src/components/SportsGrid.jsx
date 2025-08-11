import React from 'react';

const SportsGrid = ({ selectedSports, onSportsChange }) => {
  const sports = [
    { name: 'Badminton', emoji: '🏸', color: 'bg-emerald-500' },
    { name: 'Football', emoji: '⚽', color: 'bg-blue-500' },
    { name: 'Tennis', emoji: '🎾', color: 'bg-yellow-400' },
    { name: 'Basketball', emoji: '🏀', color: 'bg-orange-500' },
    { name: 'Volleyball', emoji: '🏐', color: 'bg-purple-500' },
    { name: 'Squash', emoji: '🥎', color: 'bg-red-500' },
    { name: 'Table Tennis', emoji: '🏓', color: 'bg-green-500' },
    { name: 'Cricket', emoji: '🏏', color: 'bg-indigo-500' }
  ];

  const toggleSport = (sportName) => {
    const newSports = selectedSports.includes(sportName)
      ? selectedSports.filter(s => s !== sportName)
      : [...selectedSports, sportName];
    onSportsChange(newSports);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {sports.map(sport => (
        <button
          key={sport.name}
          type="button"
          onClick={() => toggleSport(sport.name)}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedSports.includes(sport.name)
              ? 'border-green-500 bg-green-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className={`w-12 h-12 ${sport.color} rounded-lg flex items-center justify-center text-white text-xl mb-2 mx-auto`}>
            {sport.emoji}
          </div>
          <p className="text-sm font-medium">{sport.name}</p>
        </button>
      ))}
    </div>
  );
};

export default SportsGrid;
