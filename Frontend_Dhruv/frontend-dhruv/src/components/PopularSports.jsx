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
    <section className="px-0 py-20 bg-gray-50">
      <h2 className="text-5xl font-extrabold mb-12 text-center text-gray-800 mt-2">Popular Sports</h2>
      <div className="flex flex-wrap justify-center">
        {sports.map((sport, idx) => (
          <div
            key={idx}
            className={`${sport.color} flex flex-col items-center justify-center w-48 h-44 mx-4 my-4 text-white rounded-2xl shadow-lg cursor-pointer hover:scale-105 transition`}
          >
            <span className="mb-3 text-5xl">{sport.icon}</span>
            <span className="font-bold text-xl">{sport.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularSports;