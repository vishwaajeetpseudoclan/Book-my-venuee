import { useState } from "react";
import { Search, MapPin } from "lucide-react";

const allCities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata",
  "Jaipur", "Ahmedabad", "Pune", "Lucknow", "Indore", "Surat",
];

const topVenueImages = [
  "Images/img1.jpeg",
  "Images/img2.jpeg",
  "Images/img3.jpeg",
];

const ExploreCities = () => {
  const [query, setQuery] = useState("");

  const filteredCities = allCities.filter(city =>
    city.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="relative bg-gradient-to-br from-pink-100 via-pink-50 to-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left Side */}
        <div className="space-y-8">
          <h2 className="text-5xl font-extrabold text-gray-900 leading-snug">
            Discover Venues by City
          </h2>

          {/* Glassmorphic Search Box */}
          <div className="relative max-w-xl">
            <div className="backdrop-blur-md bg-white/50 border border-pink-200 rounded-2xl p-4 shadow-lg">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type a city name..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                />
                <Search className="absolute left-4 top-3.5 text-pink-500 w-5 h-5" />
              </div>

              {query && (
                <ul className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-10 max-h-60 overflow-y-auto">
                  {filteredCities.length > 0 ? (
                    filteredCities.map((city, idx) => (
                      <li
                        key={idx}
                        className="px-4 py-2 text-gray-700 hover:bg-pink-50 cursor-pointer text-sm flex items-center gap-2"
                      >
                        <MapPin className="w-4 h-4 text-pink-500" /> {city}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-gray-500 text-sm">No matches</li>
                  )}
                </ul>
              )}
            </div>
          </div>

          {/* City Tags */}
          <div className="flex flex-wrap gap-3">
            {allCities.slice(0, 6).map((city, idx) => (
              <span
                key={idx}
                className="bg-white/70 backdrop-blur-md border border-pink-200 text-pink-600 px-4 py-1.5 rounded-full text-sm shadow hover:bg-pink-100 cursor-pointer transition flex items-center gap-1"
              >
                <MapPin className="w-4 h-4" /> {city}
              </span>
            ))}
            <button className="text-sm text-pink-600 underline hover:text-pink-700 transition">
              View All →
            </button>
          </div>
        </div>

        {/* Right Side – Creative Venue Cards */}
        <div className="relative w-full h-[550px] hidden lg:block">
          <div className="grid grid-cols-3 gap-6 relative z-10">
            <div className="relative w-56 h-80 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 translate-y-10">
              <img src={topVenueImages[0]} alt="Venue 1" className="object-cover w-full h-full" />
            </div>
            <div className="relative w-60 h-84 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300 z-20 -translate-y-5">
              <img src={topVenueImages[1]} alt="Venue 2" className="object-cover w-full h-full" />
            </div>
            <div className="relative w-56 h-80 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 translate-y-10">
              <img src={topVenueImages[2]} alt="Venue 3" className="object-cover w-full h-full" />
            </div>
          </div>

          {/* Subtle floating circle background behind cards */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[500px] h-[500px] rounded-full bg-pink-100 opacity-30 blur-3xl"></div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default ExploreCities;
