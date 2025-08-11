import React, { useState } from "react";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));

  return (
    <section className="relative w-full h-[600px] bg-black overflow-hidden flex items-center">
      {/* Slide Image */}
      <img
        src={heroSlides[currentSlide].image}
        alt={heroSlides[currentSlide].title}
        className="absolute w-full h-full object-cover"
        style={{ zIndex: 1, filter: 'brightness(0.6)' }} // Adds dark overlay effect
      />

      {/* Overlay Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-8">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 max-w-4xl leading-snug drop-shadow-lg">
          {heroSlides[currentSlide].title}
        </h1>
        <div className="flex gap-6 mb-10">
          <button className="bg-green-500 px-10 py-4 rounded-full font-semibold text-lg text-white shadow hover:bg-green-600 transition duration-200">
            Search for a Venue
          </button>
          <button
            className="border border-white px-10 py-4 rounded-full font-semibold text-lg text-white bg-white bg-opacity-10 hover:bg-white hover:text-black transition duration-200"
          >
            View Popular Venues
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-10 -translate-y-1/2 text-white text-5xl font-bold bg-black/30 p-4 rounded-full hover:bg-black/60 z-20 transition"
        aria-label="Previous Slide"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-10 -translate-y-1/2 text-white text-5xl font-bold bg-black/30 p-4 rounded-full hover:bg-black/60 z-20 transition"
        aria-label="Next Slide"
      >
        ›
      </button>

      {/* Dot Navigation */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-6 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-6 h-6 rounded-full border-2 border-white ${
              currentSlide === index ? "bg-white" : "bg-transparent"
            } transition`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Banner;
