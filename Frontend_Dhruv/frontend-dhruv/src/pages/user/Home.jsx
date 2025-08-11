import { useState, useEffect } from "react";
import Banner from "../../components/Banner";
import PopularSports from "../../components/PopularSports";
// import FilterBar from "../../components/FilterBar";
import VenueCard from "../../components/VenueCard";
import Pagination from "../../components/Pagination";
import InfoSection from "../../components/InfoSection";
import Footer from "../../components/Footer";

import venueData from "./venues.json";
import { useNavigate } from "react-router-dom";
const ITEMS_PER_PAGE = 6;

const Home = () => {
  const [venues, setVenues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Load dummy venue data initially
    setVenues(venueData);

    // Replace with API call once backend is ready
    /*
    import axios from "axios";
    axios.get("/api/venues")
      .then(res => setVenues(res.data))
      .catch(err => console.error(err));
    */
  }, []);

  // Calculate paginated venues
  const totalPages = Math.ceil(venues.length / ITEMS_PER_PAGE);
  const currentVenues = venues.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => setCurrentPage(page);
  const navigate = useNavigate();

  return (
    <>
      <Banner />
      <PopularSports />
      {/* <div className="my-6">
        <FilterBar />
      </div> */}

      {/* Venue Cards Section */}
      <section className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12">
            {currentVenues.map((venue) => (
              <VenueCard key={venue.id} {...venue} />
            ))}
          </div>
        </div>
      </section>

      {/* Pagination */}
      <div className="flex justify-center pb-12">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

       <div className="flex justify-center mb-10">
        <button
          className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 text-lg transition"
          onClick={() => navigate("/venues")}
        >
          See All Venues
        </button>
      </div>

      {/* Info Section */}
      <InfoSection />

      <Footer />
    </>
  );
};

export default Home;
