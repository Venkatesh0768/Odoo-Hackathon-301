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
import React from "react";

const FilterBar = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 px-6">
      <select className="border rounded px-4 py-2 w-36">
        <option value="">Sport Type</option>
      </select>
      <select className="border rounded px-4 py-2 w-36">
        <option value="">Price Range</option>
      </select>
      <select className="border rounded px-4 py-2 w-36">
        <option value="">Venue Type</option>
      </select>
      <select className="border rounded px-4 py-2 w-36">
        <option value="">Rating</option>
      </select>
    </div>
  );
};

export default FilterBar;
