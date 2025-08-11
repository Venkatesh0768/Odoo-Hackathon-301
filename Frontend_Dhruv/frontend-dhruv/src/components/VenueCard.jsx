import React from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

const VenueCard = ({ image, name, sports, price, location, rating, reviews }) => {
  // reusable stars rendering
  const renderStars = (rating) => {
    const stars = [];
    const filledStars = Math.floor(rating);
    const emptyStars = 5 - filledStars;

    for (let i = 0; i < filledStars; i++) {
      stars.push(<FaStar key={`filled-${i}`} className="text-yellow-400" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
    }
    return stars;
  };

  return (
    <div className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl border border-gray-200 w-full max-w-[320px] flex flex-col">
      {/* Image */}
      <div className="relative w-full h-[180px]">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover rounded-t-2xl"
        />
        {/* Price Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
            ${price}/hr
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 justify-between px-6 pt-4 pb-6">
        <div>
          {/* Venue Name */}
          <h3 className="text-base font-bold text-gray-800 mb-2">{name}</h3>

          {/* Sports Tags */}
          <div className="flex flex-wrap gap-2 mb-2">
            {sports.map((sport, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-full font-medium"
              >
                {sport}
              </span>
            ))}
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-600 mb-2 text-sm">
            <FaMapMarkerAlt className="w-4 h-4 mr-1" />
            {location}
          </div>

          {/* Rating */}
          <div className="flex items-center mb-4">
            {renderStars(rating)}
            <span className="ml-2 text-sm text-gray-600">
              {rating} ({reviews} reviews)
            </span>
          </div>
        </div>

        {/* Book Button */}
        <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-semibold py-2 transition-all duration-300">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default VenueCard;
