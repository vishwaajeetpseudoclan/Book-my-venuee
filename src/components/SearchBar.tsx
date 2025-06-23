'use client';

import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  cities: string[];
  placeholder?: string;
  onSearch?: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ cities, placeholder = "Type a city name...", onSearch }) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (city: string) => {
    setQuery(city);
    setShowSuggestions(false);
    if (onSearch) onSearch(city); // Triggers filter on selection
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (onSearch) onSearch(query.trim()); // Allow searching even if city not in list
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setShowSuggestions(true);

    if (val.trim() === "" && onSearch) {
      onSearch(""); // Reset filter when input is cleared
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 xs:mt-6 sm:mt-10 max-w-full sm:max-w-xl mx-auto relative z-30">
      <div className="backdrop-blur-md bg-white/85 border border-pink-200 rounded-2xl p-3 xs:p-4 shadow-lg">
        <div className="relative flex">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder={placeholder}
              value={query}
              onChange={handleChange}
              onFocus={() => setShowSuggestions(true)}
              className="w-full pl-9 xs:pl-10 pr-3 xs:pr-4 py-2 xs:py-3 rounded-l-xl border border-gray-300 text-xs xs:text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
            />
            <Search className="absolute left-2 xs:left-3 top-2.5 xs:top-3.5 text-pink-500 w-4 xs:w-5 h-4 xs:h-5" />
          </div>
          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-500 text-white px-4 xs:px-5 rounded-r-xl text-xs xs:text-sm font-medium transition"
          >
            Search
          </button>
        </div>

        {/* Suggestions */}
        {showSuggestions && query && (
          <ul className="absolute left-0 right-0 mt-1 xs:mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-52 overflow-y-auto text-xs xs:text-sm">
            {filteredCities.length > 0 ? (
              filteredCities.map((city, idx) => (
                <li
                  key={idx}
                  className="px-3 xs:px-4 py-2 text-gray-700 hover:bg-pink-50 cursor-pointer flex items-center gap-2"
                  onClick={() => handleSelect(city)}
                >
                  <MapPin className="w-3 xs:w-4 h-3 xs:h-4 text-pink-500" /> {city}
                </li>
              ))
            ) : (
              <li className="px-3 xs:px-4 py-2 text-gray-500 cursor-default">No match found</li>
            )}
          </ul>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
