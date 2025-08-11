// import React from "react";

// const Banner = () => {
//   return (
//     <section className="relative h-[400px] flex flex-col justify-center items-center text-white text-center overflow-hidden bg-gradient-to-br from-green-700 via-black to-blue-900">
//       {/* Optional background shape */}
//       <div className="absolute inset-0 opacity-20 pointer-events-none bg-banner-pattern"></div>
      
//       {/* Main Headline */}
//       <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight drop-shadow-lg">
//         Join the Game, Book with Ease
//       </h1>

//       {/* Supporting tagline */}
//       <p className="max-w-lg mx-auto text-lg md:text-xl mb-7 opacity-90">
//         Discover sports venues near you & secure your spot instantly.
//       </p>

//       {/* CTAs */}
//       <div className="flex flex-row gap-4 justify-center">
//         <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow-md transition">
//           Search for a Venue
//         </button>
//         <button className="border border-white hover:bg-white hover:text-black px-6 py-3 rounded-full font-semibold shadow-md transition">
//           View Popular Venues
//         </button>
//       </div>

//       {/* Optional: Decorative Elements */}
//       <div className="absolute left-12 bottom-8 opacity-40 pointer-events-none select-none">
//         <img src="https://img.icons8.com/color/96/whistle.png" alt="Sports Icon" width={56}/>
//       </div>
//       <div className="absolute right-12 top-8 opacity-30 pointer-events-none select-none">
//         <img src="https://img.icons8.com/color/96/soccer-ball.png" alt="Sports Icon" width={56}/>
//       </div>
//     </section>
//   );
// };

// export default Banner;


import React, { useState } from "react";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero section slides
  const heroSlides = [
    {
      image: "/modern-badminton-court.png",
      title: "Book Your Favorite Sports Venue Anytime, Anywhere",
    },
    {
      image: "/outdoor-football-stadium.png",
      title: "Premium Sports Facilities at Your Fingertips",
    },
    {
      image: "/professional-indoor-tennis-court.png",
      title: "Join the Game, Book with Ease",
    },
  ];

  // Go to the next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  // Go to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? heroSlides.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative w-full h-[600px] overflow-hidden bg-black">
      {/* Current Slide */}
      <img
        src={heroSlides[currentSlide].image}
        alt={heroSlides[currentSlide].title}
        className="w-full h-full object-cover"
      />

      {/* Overlay content */}
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl md:text-6xl font-bold text-white mb-6 max-w-2xl">
          {heroSlides[currentSlide].title}
        </h1>
        <div className="flex space-x-4">
          <button className="bg-green-500 px-10 py-4 rounded-full font-semibold text-lg hover:bg-green-600 transition">
            Search for a Venue
          </button>
          <button className="border border-white px-10 py-4 rounded-full font-semibold text-lg text-white hover:bg-gray-200 hover:text-black transition">
            View Popular Venues
          </button>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 text-white text-3xl font-bold bg-black/40 p-2 rounded-full hover:bg-black/60"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 text-white text-3xl font-bold bg-black/40 p-2 rounded-full hover:bg-black/60"
      >
        ›
      </button>

      {/* Dot navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Banner;
