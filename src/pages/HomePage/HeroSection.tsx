'use client';

import React from 'react';
import SearchBar from '../../components/SearchBar';

const allCities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata",
  "Jaipur", "Ahmedabad", "Pune", "Lucknow", "Indore", "Surat",
];

const HeroSection: React.FC = () => {
  const handleCitySelect = (city: string) => {
    console.log("Selected City:", city);
    // You can add routing or filtering logic here based on selected city
  };

  return (
    <section
      className="relative h-[70vh] sm:h-[65vh] lg:h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/Venue.png')" }}
    >
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)] z-10"></div>

      <div className="relative z-20 flex h-full items-center justify-center px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl sm:max-w-2xl w-full">
          <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-md leading-tight">
            Find the Perfect Venue for Every Occasion
          </h1>
          <p className="mt-3 xs:mt-4 sm:mt-6 text-sm xs:text-base sm:text-lg md:text-xl text-gray-200 font-medium drop-shadow-sm">
            Weddings, parties, corporate events – explore verified venues, trusted vendors & top-tier services in one place.
          </p>

          {/* Reusable Search Bar Component */}
          <SearchBar cities={allCities} onSearch={handleCitySelect} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
