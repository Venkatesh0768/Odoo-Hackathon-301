// import React from "react";
// import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

// const VenueCard = ({ image, name, sports, price, location, rating, reviews }) => {
//   return (
//     <div className="bg-white shadow-lg rounded-lg overflow-hidden w-80">
//       <div className="relative">
//         <img src={image} alt={name} className="w-full h-48 object-cover" />
//         <span className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
//           ${price}/hr
//         </span>
//       </div>
//       <div className="p-4">
//         <h3 className="font-bold text-lg">{name}</h3>
//         <div className="flex flex-wrap gap-2 text-sm text-blue-500 my-1">
//           {sports.map((s, i) => (
//             <span key={i}>{s}</span>
//           ))}
//         </div>
//         <div className="flex items-center text-gray-500 text-sm mt-1">
//           <FaMapMarkerAlt className="mr-1" /> {location}
//         </div>
//         <div className="flex items-center mt-1 text-yellow-500">
//           <FaStar className="mr-1" /> {rating}{" "}
//           <span className="text-gray-500 text-sm ml-1">({reviews} reviews)</span>
//         </div>
//         <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600">
//           Book Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VenueCard;
import React from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

const VenueCard = ({ image, name, sports, price, location, rating, reviews }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-80">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <span className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          ${price}/hr
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg">{name}</h3>
        <div className="flex flex-wrap gap-2 text-sm text-blue-500 my-1">
          {sports.map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </div>
        <div className="flex items-center text-gray-500 text-sm mt-1">
          <FaMapMarkerAlt className="mr-1" /> {location}
        </div>
        <div className="flex items-center mt-1 text-yellow-500">
          <FaStar className="mr-1" /> {rating.toFixed(1)}{" "}
          <span className="text-gray-500 text-sm ml-1">({reviews} reviews)</span>
        </div>
        <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default VenueCard;
