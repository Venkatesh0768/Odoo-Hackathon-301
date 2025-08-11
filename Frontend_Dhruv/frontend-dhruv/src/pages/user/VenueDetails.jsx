import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaStar,
  FaMapMarkerAlt,
  FaWifi,
  FaCar,
  FaBolt,
  FaShieldAlt,
  FaCoffee,
  FaUserAlt,
  FaSnowflake,
  FaTint,
} from "react-icons/fa";
import venueData from "./venues.json";
import Footer from "../../components/Footer";

const VenueDetails = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    const foundVenue = venueData.find((v) => String(v.id) === id);
    setVenue(foundVenue || null);
  }, [id]);

  const renderStars = (count) => {
    const stars = [];
    const filledStars = Math.floor(count);
    const emptyStars = 5 - filledStars;
    for (let i = 0; i < filledStars; i++) {
      stars.push(<FaStar key={`filled-${i}`} className="text-yellow-400" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
    }
    return stars;
  };

  if (!venue) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
        Venue not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-16">
      {/* Header */}
      <header className="bg-gradient-to-tr from-green-600 via-blue-500 to-green-400 px-8 py-6 rounded-b-3xl shadow-lg">
        <h1 className="text-4xl font-extrabold mb-2 tracking-tight text-white">
          {venue.name}
        </h1>
        <div className="flex flex-wrap items-center gap-4 mb-2">
          <span className="flex items-center gap-2 text-slate-100 text-lg">
            <FaMapMarkerAlt />
            {venue.location}
            <span className="ml-2 px-2 py-[2px] rounded-full bg-black bg-opacity-20 text-xs">
              {venue.addressLine2 || "Near Metro Station"}
            </span>
          </span>
          <span className="flex items-center gap-2 ml-8">
            {renderStars(venue.rating)}
            <span className="text-yellow-100 font-bold">{venue.rating}</span>
            <span className="text-slate-200 text-sm">
              ({venue.reviews || 0} reviews)
            </span>
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 px-8 pt-8">
        {/* Venue Image Card */}
        <section className="bg-white shadow-2xl rounded-xl overflow-hidden flex flex-col">
          <div className="relative h-72 bg-gray-200">
            {venue.images && venue.images[0] ? (
              <img
                src={venue.images[0]}
                alt={venue.name}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold">
                No Image Available
              </div>
            )}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-lg">
              Images / Videos
            </div>
          </div>
          <div className="flex-1 flex flex-col px-8 py-6 space-y-3">
            <button className="w-full bg-emerald-600 text-white py-3 mt-2 rounded-lg font-semibold shadow hover:bg-emerald-700 active:scale-95 transition">
              Book This Venue
            </button>
            <div className="flex gap-5 pt-2 text-gray-700">
              <div>
                <div className="font-semibold text-sm mb-1">Operating Hours</div>
                <div className="text-sm">
                  {venue.operatingHours || "7:00AM - 11:00PM"}
                </div>
              </div>
              <div>
                <div className="font-semibold text-sm mb-1">Price</div>
                <div className="text-sm bg-amber-900 text-white px-2 py-1 rounded-full inline-block">
                  ₹{venue.price}/hour
                </div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-sm mb-1">Address</div>
              <div className="text-sm">{venue.location}</div>
              {venue.addressLine2 && (
                <div className="text-xs">{venue.addressLine2}</div>
              )}
              {venue.addressLine3 && (
                <div className="text-xs">{venue.addressLine3}</div>
              )}
            </div>
          </div>
        </section>

        {/* Info Cards */}
        <section className="space-y-8 w-full">
          {/* Sports Available */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-lg font-semibold mb-2 text-gray-700">
              Sports Available
            </div>
            <div className="flex gap-3 flex-wrap">
              {(venue.sports || []).map((sport) => (
                <span
                  key={sport}
                  className="px-4 py-2 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 font-semibold text-sm shadow-sm"
                >
                  {sport}
                </span>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-lg font-semibold mb-2 text-gray-700">
              Amenities
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
              <div className="flex flex-col items-center gap-2">
                <FaWifi className="text-green-600 text-xl" />{" "}
                <span className="text-sm">Free WiFi</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <FaCar className="text-green-600 text-xl" />{" "}
                <span className="text-sm">Parking</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <FaBolt className="text-green-600 text-xl" />{" "}
                <span className="text-sm">Equipment</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <FaShieldAlt className="text-green-600 text-xl" />{" "}
                <span className="text-sm">Security</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <FaCoffee className="text-green-600 text-xl" />{" "}
                <span className="text-sm">Cafeteria</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <FaUserAlt className="text-green-600 text-xl" />{" "}
                <span className="text-sm">Changing Room</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <FaSnowflake className="text-green-600 text-xl" />{" "}
                <span className="text-sm">Air Conditioning</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <FaTint className="text-green-600 text-xl" />{" "}
                <span className="text-sm">Water</span>
              </div>
            </div>
          </div>

          {/* About Venue */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-lg font-semibold mb-2 text-gray-700">
              About Venue
            </div>
            <ul className="list-disc ml-6 text-gray-700">
              {(venue.about || [
                "Top-notch facilities and equipment for all sports",
                "Professional coaching available",
                "Tournament facilities available",
                "Equipment available on rent",
              ]).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* Reviews */}
      <section className="max-w-5xl mx-auto mt-10 px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-xl font-semibold mb-4 text-gray-700">
            Player Reviews & Ratings
          </div>
          <div className="space-y-6">
            {(venue.reviewsList || []).length === 0 && (
              <p className="text-gray-500">No reviews yet.</p>
            )}
            {(venue.reviewsList || [
              {
                name: "Rajesh Patel",
                rating: 5,
                date: "10 Jan 2024, 6:30 PM",
                comment: "Nice hall, well maintained",
              },
            ]).map((review, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-gray-900">
                    {review.name}
                  </span>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex items-center mb-1">
                  {renderStars(review.rating)}
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition font-medium shadow">
              Load more reviews
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VenueDetails;
