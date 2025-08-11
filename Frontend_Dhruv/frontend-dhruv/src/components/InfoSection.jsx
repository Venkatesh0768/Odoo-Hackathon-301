import React from "react";

const InfoSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center gap-8 bg-yellow-300 p-10 rounded-lg mx-6 my-12">
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-4">Your Gateway to Local Sports</h2>
        <p className="mb-6 max-w-lg">
          QuickCourt connects you with nearby courts and passionate players. Join matches, improve skills, and be part of the community.
        </p>
        <button className="bg-black text-yellow-300 px-6 py-3 rounded-full font-semibold hover:bg-gray-900 transition">
          Join a Match
        </button>
      </div>
      <div className="flex-1">
        <img
          src="https://images.unsplash.com/photo-1521412644187-c49fa049e84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="Sports gathering"
          className="rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default InfoSection;
