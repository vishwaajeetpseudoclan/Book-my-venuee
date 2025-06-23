import { useMemo, useState } from "react";
import {  useParams, Link } from "react-router-dom";
import useVenueData from "../hooks/useVenueData";
import slugify from "../utils/slugify";
import VenueCard from "../components/VenueCards";
import FilterPanel from "../components/FilterPanel"; 

const ITEMS_PER_PAGE = 6;

type SortOption = "rating" | "priceLowHigh" | "priceHighLow";

const VenueCategoryPage = () => {
  const { categoryName } = useParams();
  const readableCategory =
    categoryName?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) ||
    "";
  // const navigate = useNavigate();
  const allVenues = useVenueData();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("rating");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [availabilityDate, setAvailabilityDate] = useState<Date | null>(null);

  const applyFilters = () => setCurrentPage(1);
  const clearFilters = () => {
    setSelectedCity(null);
    setSortOption("rating");
    setMinPrice(null);
    setMaxPrice(null);
    setAvailabilityDate(null);
    setCurrentPage(1);
  };

  const filteredVenues = useMemo(() => {
    let filtered = allVenues.filter((v) => {
      const types = Array.isArray(v.type) ? v.type : v.type.split(",");
      return types.map((t) => slugify(t)).includes(categoryName || "");
    });

    if (selectedCity)
      filtered = filtered.filter((v) => v.location === selectedCity);
    if (minPrice !== null)
      filtered = filtered.filter((v) => +v.price_per_plate >= minPrice);
    if (maxPrice !== null)
      filtered = filtered.filter((v) => +v.price_per_plate <= maxPrice);
    if (availabilityDate) {
      const day = availabilityDate.getDate();
      filtered = filtered.filter((_, i) => i % 2 === day % 2); // dummy logic
    }

    if (sortOption === "rating") return filtered; // placeholder
    if (sortOption === "priceLowHigh")
      return filtered.sort((a, b) => +a.price_per_plate - +b.price_per_plate);
    if (sortOption === "priceHighLow")
      return filtered.sort((a, b) => +b.price_per_plate - +a.price_per_plate);
    return filtered;
  }, [
    allVenues,
    categoryName,
    selectedCity,
    minPrice,
    maxPrice,
    availabilityDate,
    sortOption,
  ]);

  const paginated = filteredVenues.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredVenues.length / ITEMS_PER_PAGE);

  return (
    <div className="bg-white px-6 lg:px-20 py-16 max-w-[1280px] mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <ol className="flex space-x-2">
          <li>
            <Link to="/" className="hover:text-pink-600">
              Home
            </Link>
          </li>
          <li>{">"}</li>
          <li>
            <Link to="/venues" className="hover:text-pink-600">
              Venues
            </Link>
          </li>
          <li>{">"}</li>
          <li className="text-pink-600 font-semibold">{readableCategory}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="flex justify-between flex-col sm:flex-row mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">{readableCategory}</h1>
          <p className="text-gray-600 text-sm mt-1">
            Showing{" "}
            <span className="text-pink-600 font-semibold">
              {filteredVenues.length}
            </span>{" "}
            results
          </p>
        </div>
      </div>

      {/* ✅ Filter Panel Component */}
      <FilterPanel
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        sortOption={sortOption}
        setSortOption={setSortOption}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        availabilityDate={availabilityDate}
        setAvailabilityDate={setAvailabilityDate}
        onApply={applyFilters}
        onClear={clearFilters}
      />

      {/* Venue Cards */}
      {paginated.length === 0 ? (
        <p className="text-center text-gray-500">No venues found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginated.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-md border ${
                currentPage === i + 1
                  ? "bg-pink-600 text-white"
                  : "text-pink-600 border-pink-600 hover:bg-pink-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default VenueCategoryPage;
