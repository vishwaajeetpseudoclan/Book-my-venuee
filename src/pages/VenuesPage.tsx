'use client';

import { useState, useMemo } from "react";
import useVenueData from "../hooks/useVenueData";
import VenueCard from "../components/VenueCards";
import SearchBar from "../components/SearchBar"; // Adjust path if needed

export default function AllVenuesPage() {
  const venues = useVenueData();
  const [filter, setFilter] = useState("");

  // Extract only unique city names
  const allCities = useMemo(() => {
    const cities = venues.map(v => v.location?.trim());
    return Array.from(new Set(cities)).filter(Boolean).sort();
  }, [venues]);

  // Filter only when filter is applied
  const filteredVenues = filter
    ? venues.filter((venue) =>
        venue.location.toLowerCase().includes(filter.toLowerCase())
      )
    : venues;

  // Group filtered venues by type
  const groupedByType: Record<string, typeof venues> = {};
  filteredVenues.forEach((venue) => {
    const types = Array.isArray(venue.type) ? venue.type : venue.type.split(",");
    types.forEach((typeRaw) => {
      const type = typeRaw.trim();
      if (!groupedByType[type]) groupedByType[type] = [];
      groupedByType[type].push(venue);
    });
  });

  const sortedTypes = Object.keys(groupedByType).sort();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">All Venues</h1>

      {/* Integrated and fixed SearchBar */}
      <SearchBar
        cities={allCities}
        placeholder="Search by city"
        onSearch={(city) => setFilter(city)}
      />

      {sortedTypes.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No venues match your filter.</p>
      ) : (
        sortedTypes.map((type) => (
          <div key={type} className="mb-12 mt-10">
            <h2 className="text-2xl font-semibold text-pink-600 border-l-4 border-pink-400 pl-4 mb-6">
              {type}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedByType[type].map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
