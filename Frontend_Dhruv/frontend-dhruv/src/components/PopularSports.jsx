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

const PopularSports = () => {
  return (
    <section className="px-4 py-8 pb-20 bg-gray-50">
      {/* Heading */}
      <h2 className="text-2xl font-extrabold mb-8 text-center text-gray-800 tracking-tight">
        Popular Sports
      </h2>

      {/* Single Row Flex Container */}
      <div className="flex flex-row flex-nowrap justify-center gap-4 overflow-x-auto no-scrollbar max-w-full mx-auto">
        {sports.map((sport, idx) => (
          <div
            key={idx}
            className={`
              ${sport.color}
              flex flex-col items-center justify-center
              w-28 h-28
              text-white rounded-xl shadow-md
              cursor-pointer transform hover:scale-105
              transition duration-300 border-2 border-white
              flex-shrink-0
            `}
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }}
          >
            <span className="mb-2 text-4xl drop-shadow-sm">{sport.icon}</span>
            <span className="font-semibold text-base tracking-wide truncate max-w-full text-center">
              {sport.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularSports;
