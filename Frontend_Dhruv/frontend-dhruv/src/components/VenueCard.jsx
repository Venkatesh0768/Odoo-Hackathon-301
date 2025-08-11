import React from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const VenueCard = ({ id, image, name, sports, price, location, rating, reviews, type }) => {
  const navigate = useNavigate();

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

  const handleBookNow = () => {
    navigate(`/venue/${id}`);
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
        {/* Venue Type Badge */}
        {type && (
          <div className="absolute top-3 right-3 bg-gray-800 bg-opacity-75 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </div>
        )}
        {/* Price Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
            ₹{price} /hr
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
                className="bg-white text-black text-xs px-2 py-1 rounded-full font-semibold border border-gray-300"
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
            <span className="ml-2 text-sm text-gray-600 font-semibold">
              {rating} ({reviews})
            </span>
          </div>
        </div>

        {/* Book Button */}
        <button
          onClick={handleBookNow}
          className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold py-2 transition-all duration-300"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default VenueCard;
