import React from "react";

const sports = [
  { name: "Badminton", color: "bg-emerald-500", icon: "🏸" },
  { name: "Football", color: "bg-blue-500", icon: "⚽" },
  { name: "Tennis", color: "bg-yellow-400", icon: "🎾" },
  { name: "Basketball", color: "bg-orange-500", icon: "🏀" },
  { name: "Volleyball", color: "bg-purple-400", icon: "🏐" },
  { name: "Squash", color: "bg-red-500", icon: "🎯" },
  { name: "Table Tennis", color: "bg-green-500", icon: "🏓" },
  { name: "Cricket", color: "bg-indigo-500", icon: "🏏" },
];

const PopularSports = () => (
  <section className="px-4 pt-8 pb-16 bg-gray-50">
    <h2 className="text-2xl font-extrabold mb-7 text-center text-gray-800 tracking-tight">
      Popular Sports
    </h2>
    <div className="flex flex-row flex-nowrap justify-center items-center gap-6 overflow-x-auto no-scrollbar max-w-full mx-auto">
      {sports.map((sport, idx) => (
        <div
          key={idx}
          className={`
            ${sport.color}
            flex flex-col items-center justify-center
            w-24 h-24
            sm:w-28 sm:h-28
            text-white rounded-xl shadow-lg
            cursor-pointer transform hover:scale-105
            transition duration-200 border-2 border-white
            flex-shrink-0
          `}
          style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.10)" }}
        >
          <span className="mb-1 text-3xl sm:text-4xl drop-shadow-sm">{sport.icon}</span>
          <span className="font-bold text-xs sm:text-base text-center tracking-wide mt-1">
            {sport.name}
          </span>
        </div>
      ))}
    </div>
  </section>
);

export default PopularSports;
