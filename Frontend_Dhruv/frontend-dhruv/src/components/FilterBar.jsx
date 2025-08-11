import React from "react";

const FilterBar = ({
  search,
  setSearch,
  sportType,
  setSportType,
  price,
  setPrice,
  venueType,
  setVenueType,
  rating,
  setRating,
  clearFilters,
  sportsList,
}) => {
  return (
    <section className="w-72 bg-white rounded-xl border border-[#e5e5e5] shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L14 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 018 17v-3.586L3.293 6.707A1 1 0 013 6V4z"
            />
          </svg>
          Filters
        </h2>
        <button
          className="text-sm text-gray-500 hover:text-green-600"
          onClick={clearFilters}
        >
          Clear All
        </button>
      </div>
      {/* Search Venues */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {/* Sport Type */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-gray-700">Sport Type</label>
        <select
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          value={sportType}
          onChange={(e) => setSportType(e.target.value)}
        >
          {sportsList.map((sport) => (
            <option key={sport} value={sport}>
              {sport}
            </option>
          ))}
        </select>
      </div>
      {/* Price Range */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-gray-700">
          Price Range (₹400 - ₹2000 per hour)
        </label>
        <input
          type="range"
          min={400}
          max={2000}
          step={50}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full accent-green-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>₹400</span>
          <span>₹2000</span>
        </div>
      </div>
      {/* Venue Type */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-gray-700">Venue Type</label>
        <div className="flex gap-4">
          <label className="inline-flex items-center gap-1">
            <input
              type="radio"
              name="venueType"
              value="all"
              checked={venueType === "all"}
              onChange={() => setVenueType("all")}
              className="accent-green-600"
            />
            <span>All</span>
          </label>
          <label className="inline-flex items-center gap-1">
            <input
              type="radio"
              name="venueType"
              value="indoor"
              checked={venueType === "indoor"}
              onChange={() => setVenueType("indoor")}
              className="accent-green-600"
            />
            <span>Indoor</span>
          </label>
          <label className="inline-flex items-center gap-1">
            <input
              type="radio"
              name="venueType"
              value="outdoor"
              checked={venueType === "outdoor"}
              onChange={() => setVenueType("outdoor")}
              className="accent-green-600"
            />
            <span>Outdoor</span>
          </label>
        </div>
      </div>
      {/* Minimum Rating */}
      <div>
        <label className="block mb-1 font-semibold text-gray-700">Minimum Rating</label>
        <div className="flex flex-col gap-2">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="rating"
              value=""
              checked={rating === ""}
              onChange={() => setRating("")}
              className="accent-green-600"
            />
            <span>All Ratings</span>
          </label>
          {[5, 4, 3, 2].map((starCount) => (
            <label key={starCount} className="inline-flex items-center gap-1">
              <input
                type="radio"
                name="rating"
                value={starCount === 5 ? "4.5" : starCount + ".0"}
                checked={rating === (starCount === 5 ? "4.5" : starCount + ".0")}
                onChange={() =>
                  setRating(starCount === 5 ? "4.5" : starCount + ".0")
                }
                className="accent-green-600"
              />
              <div className="flex text-yellow-400">
                {[...Array(starCount)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.922-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.175 0l-3.388 2.462c-.784.57-1.838-.196-1.539-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
                  </svg>
                ))}
              </div>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilterBar;
