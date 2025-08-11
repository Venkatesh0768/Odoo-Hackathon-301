// import React from "react";

// const FilterBar = () => {
//   return (
//     <div className="flex flex-wrap justify-center gap-4 px-6">
//       <select className="border rounded px-4 py-2">
//         <option>Sport Type</option>
//       </select>
//       <select className="border rounded px-4 py-2">
//         <option>Price Range</option>
//       </select>
//       <select className="border rounded px-4 py-2">
//         <option>Venue Type</option>
//       </select>
//       <select className="border rounded px-4 py-2">
//         <option>Rating</option>
//       </select>
//     </div>
//   );
// };

// export default FilterBar;
// const FilterBar = () => {
//   return (
//     <div className="flex flex-row justify-center items-center gap-8 px-4 py-8 bg-white mb-8">
//       <select className="appearance-none border-2 border-black bg-white text-gray-800 font-semibold px-6 py-3 w-44 rounded-xl shadow focus:outline-none focus:border-brown-700 transition">
//         <option value="" disabled>Sport Type</option>
//         {/* Add actual sport options here */}
//       </select>
//       <select className="appearance-none border-2 border-black bg-white text-gray-800 font-semibold px-6 py-3 w-44 rounded-xl shadow focus:outline-none focus:border-brown-700 transition">
//         <option value="" disabled>Price Range</option>
//         {/* Add price range options here */}
//       </select>
//       <select className="appearance-none border-2 border-black bg-white text-gray-800 font-semibold px-6 py-3 w-44 rounded-xl shadow focus:outline-none focus:border-brown-700 transition">
//         <option value="" disabled>Venue Type</option>
//         {/* Add venue type options here */}
//       </select>
//       <select className="appearance-none border-2 border-black bg-white text-gray-800 font-semibold px-6 py-3 w-44 rounded-xl shadow focus:outline-none focus:border-brown-700 transition">
//         <option value="" disabled>Rating</option>
//         {/* Add rating options here */}
//       </select>
//     </div>
//   );
// };

// export default FilterBar;

import React from "react";

const FilterBar = () => {
  return (
    <section className="py-8 bg-white border-b border-[#e5e5e5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          
          {/* Sport Type */}
          <select
            className="w-full md:w-48 border border-[#e5e5e5] bg-white 
                       text-gray-600 font-semibold px-4 py-3 rounded-xl shadow-sm 
                       focus:outline-none focus:border-[#8B4513] transition
                       appearance-none bg-[url('data:image/svg+xml;utf8,<svg fill=%23666666 height=20 viewBox=\'0 0 20 20\' width=20 xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M5.25 7.5l4.5 4.5 4.5-4.5H5.25z\'/></svg>')] bg-no-repeat bg-right-3 bg-center"
          >
            <option value="">Sport Type</option>
            <option value="all">All Sports</option>
            <option value="badminton">Badminton</option>
            <option value="football">Football</option>
            <option value="tennis">Tennis</option>
            <option value="basketball">Basketball</option>
          </select>

          {/* Price Range */}
          <select
            className="w-full md:w-48 border border-[#e5e5e5] bg-white 
                       text-gray-600 font-semibold px-4 py-3 rounded-xl shadow-sm 
                       focus:outline-none focus:border-[#8B4513] transition
                       appearance-none bg-[url('data:image/svg+xml;utf8,<svg fill=%23666666 height=20 viewBox=\'0 0 20 20\' width=20 xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M5.25 7.5l4.5 4.5 4.5-4.5H5.25z\'/></svg>')] bg-no-repeat bg-right-3 bg-center"
          >
            <option value="">Price Range</option>
            <option value="all">All Prices</option>
            <option value="0-25">$0 - $25</option>
            <option value="25-50">$25 - $50</option>
            <option value="50+">$50+</option>
          </select>

          {/* Venue Type */}
          <select
            className="w-full md:w-48 border border-[#e5e5e5] bg-white 
                       text-gray-600 font-semibold px-4 py-3 rounded-xl shadow-sm 
                       focus:outline-none focus:border-[#8B4513] transition
                       appearance-none bg-[url('data:image/svg+xml;utf8,<svg fill=%23666666 height=20 viewBox=\'0 0 20 20\' width=20 xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M5.25 7.5l4.5 4.5 4.5-4.5H5.25z\'/></svg>')] bg-no-repeat bg-right-3 bg-center"
          >
            <option value="">Venue Type</option>
            <option value="all">All Types</option>
            <option value="indoor">Indoor</option>
            <option value="outdoor">Outdoor</option>
          </select>

          {/* Rating */}
          <select
            className="w-full md:w-48 border border-[#e5e5e5] bg-white 
                       text-gray-600 font-semibold px-4 py-3 rounded-xl shadow-sm 
                       focus:outline-none focus:border-[#8B4513] transition
                       appearance-none bg-[url('data:image/svg+xml;utf8,<svg fill=%23666666 height=20 viewBox=\'0 0 20 20\' width=20 xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M5.25 7.5l4.5 4.5 4.5-4.5H5.25z\'/></svg>')] bg-no-repeat bg-right-3 bg-center"
          >
            <option value="">Rating</option>
            <option value="all">All Ratings</option>
            <option value="4+">4+ Stars</option>
            <option value="4.5+">4.5+ Stars</option>
          </select>

        </div>
      </div>
    </section>
  );
};

export default FilterBar;

