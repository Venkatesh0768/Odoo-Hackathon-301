// import React from "react";
// import Navbar from "../../components/Navbar";
// import Banner from "../../components/Banner";
// import PopularSports from "../../components/PopularSports";
// import FilterBar from "../../components/FilterBar";
// import VenueCard from "../../components/VenueCard";
// import Footer from "../../components/Footer";

// const Home = () => {
//   const venues = [
//     {
//       image: "https://source.unsplash.com/800x600/?badminton",
//       name: "Elite Sports Complex",
//       sports: ["Badminton", "Tennis"],
//       price: 25,
//       location: "Downtown",
//       rating: 4.8,
//       reviews: 124,
//     },
//     {
//       image: "https://source.unsplash.com/800x600/?football",
//       name: "Champions Football Arena",
//       sports: ["Football", "Soccer"],
//       price: 40,
//       location: "North Side",
//       rating: 4.9,
//       reviews: 89,
//     },
//   ];

//   return (
//     <>
//       <Navbar />
//       <Banner />
//       <PopularSports />
//       <FilterBar />
//       <section className="px-6 py-12">
//         <h2 className="text-2xl font-bold mb-6 text-center">Popular Venues Near You</h2>
//         <div className="flex flex-wrap justify-center gap-6">
//           {venues.map((venue, idx) => (
//             <VenueCard key={idx} {...venue} />
//           ))}
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// };

// export default Home;
import React, { useState, useEffect } from "react";

import Navbar from "../../components/Navbar";
import Banner from "../../components/Banner";
import PopularSports from "../../components/PopularSports";
import FilterBar from "../../components/FilterBar";
import VenueCard from "../../components/VenueCard";
import Pagination from "../../components/Pagination";
import InfoSection from "../../components/InfoSection";
import Footer from "../../components/Footer";

import venueData from "./venues.json";

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

  return (
    <>
      <Navbar />
      <Banner />
      <PopularSports />
      <div className="my-6">
        <FilterBar />
      </div>
      <section className="flex flex-wrap justify-center gap-6 px-6 pb-12">
        {currentVenues.map((venue) => (
          <VenueCard key={venue.id} {...venue} />
        ))}
      </section>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

      <InfoSection />

      <Footer />
    </>
  );
};

export default Home;