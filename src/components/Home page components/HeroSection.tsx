'use client';

import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const allCities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata",
  "Jaipur", "Ahmedabad", "Pune", "Lucknow", "Indore", "Surat",
];

const HeroSection: React.FC = () => {
  const [query, setQuery] = useState("");

  const filteredCities = allCities.filter(city =>
    city.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section
      className="relative h-[70vh] sm:h-[65vh] lg:h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/Hero-Section-Image.jpg')" }}
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

          {/* Search Bar with Button */}
          <div className="mt-5 xs:mt-6 sm:mt-10 max-w-full sm:max-w-xl mx-auto relative z-30">
            <div className="backdrop-blur-md bg-white/85 border border-pink-200 rounded-2xl p-3 xs:p-4 shadow-lg">
              <div className="relative flex">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Type a city name..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-9 xs:pl-10 pr-3 xs:pr-4 py-2 xs:py-3 rounded-l-xl border border-gray-300 text-xs xs:text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                  />
                  <Search className="absolute left-2 xs:left-3 top-2.5 xs:top-3.5 text-pink-500 w-4 xs:w-5 h-4 xs:h-5" />
                </div>
                <button className="bg-pink-600 hover:bg-pink-500 text-white px-4 xs:px-5 rounded-r-xl text-xs xs:text-sm font-medium transition">
                  Search
                </button>
              </div>

              {query && (
                <ul className="absolute left-0 right-0 mt-1 xs:mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-52 overflow-y-auto text-xs xs:text-sm">
                  {filteredCities.length > 0 ? (
                    filteredCities.map((city, idx) => (
                      <li
                        key={idx}
                        className="px-3 xs:px-4 py-2 text-gray-700 hover:bg-pink-50 cursor-pointer flex items-center gap-2"
                      >
                        <MapPin className="w-3 xs:w-4 h-3 xs:h-4 text-pink-500" /> {city}
                      </li>
                    ))
                  ) : (
                    <li className="px-3 xs:px-4 py-2 text-gray-500">No matches</li>
                  )}
                </ul>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
