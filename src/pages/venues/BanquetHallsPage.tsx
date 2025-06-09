import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const initialTag = "Banquet Halls";

const cities = [
  { name: "Delhi NCR", img: "delhi.avif" },
  { name: "Mumbai", img: "bombay.avif" },
  { name: "Bangalore", img: "banglore.avif" },
  { name: "Hyderabad", img: "hyderabad.avif" },
  { name: "Chennai", img: "chennai.avif" },
  { name: "Goa", img: "goa.avif" },
  { name: "Jaipur", img: "jaipur.avif" },
  { name: "Pune", img: "pune.avif" },
  { name: "Kolkata", img: "kolkata.avif" },
  { name: "Lucknow", img: "lucknow.avif" },
];

const venueCities = [
  "Delhi NCR",
  "Mumbai",
  "Goa",
  "Hyderabad",
  "Bangalore",
  "Jaipur",
];

const venues = [
  {
    name: "Amber Vilas",
    img: "img1.jpeg",
    tag: "Handpicked",
    rating: 4.7,
    price: 85000,
  },
  {
    name: "Regenta Jal Mahal",
    img: "img2.jpeg",
    tag: "Handpicked",
    rating: 4.4,
    price: 75000,
  },
  {
    name: "Glenview Resort",
    img: "img3.jpeg",
    tag: "Handpicked",
    rating: 4.2,
    price: 60000,
  },
  {
    name: "Sterling-Puri",
    img: "img4.jpg",
    tag: "Handpicked",
    rating: 4.5,
    price: 65000,
  },
  {
    name: "Luxury Hall",
    img: "img1.jpeg",
    tag: "Handpicked",
    rating: 4.3,
    price: 70000,
  },
  {
    name: "Taj Hari Mahal Palace",
    img: "img5.jpg",
    tag: "Handpicked",
    rating: 4.8,
    price: 95000,
  },
];

const ITEMS_PER_PAGE = 3;

const BanquetHallsPage = () => {
  const [filterTag, setFilterTag] = useState(initialTag);
  const navigate = useNavigate();

  const [tempSelectedCity, setTempSelectedCity] = useState<string | null>(null);
  const [tempSortOption, setTempSortOption] = useState<"rating" | "priceLowHigh" | "priceHighLow">(
    "rating"
  );
  const [tempMinPrice, setTempMinPrice] = useState<number | null>(null);
  const [tempMaxPrice, setTempMaxPrice] = useState<number | null>(null);
  const [tempAvailabilityDate, setTempAvailabilityDate] = useState<Date | null>(null);

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<"rating" | "priceLowHigh" | "priceHighLow">("rating");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [availabilityDate, setAvailabilityDate] = useState<Date | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const applyFilters = () => {
    setSelectedCity(tempSelectedCity);
    setSortOption(tempSortOption);
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
    setAvailabilityDate(tempAvailabilityDate);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setTempSelectedCity(null);
    setTempSortOption("rating");
    setTempMinPrice(null);
    setTempMaxPrice(null);
    setTempAvailabilityDate(null);

    setSelectedCity(null);
    setSortOption("rating");
    setMinPrice(null);
    setMaxPrice(null);
    setAvailabilityDate(null);

    setCurrentPage(1);
  };

  const handleCityClick = (city: string) => {
    if (city === selectedCity) {
      setSelectedCity(null);
      setTempSelectedCity(null);
    } else {
      setSelectedCity(city);
      setTempSelectedCity(city);
    }
    setCurrentPage(1);
  };

  const filteredVenues = useMemo(() => {
    let filtered = venues;

    if (selectedCity) {
      filtered = filtered.filter((_, index) => venueCities[index] === selectedCity);
    }

    if (minPrice !== null) {
      filtered = filtered.filter((v) => v.price >= minPrice);
    }
    if (maxPrice !== null) {
      filtered = filtered.filter((v) => v.price <= maxPrice);
    }

    if (availabilityDate) {
      const day = availabilityDate.getDate();
      filtered = filtered.filter((_, index) => day % 2 === index % 2);
    }

    if (sortOption === "rating") {
      filtered = filtered.slice().sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "priceLowHigh") {
      filtered = filtered.slice().sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighLow") {
      filtered = filtered.slice().sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [selectedCity, sortOption, minPrice, maxPrice, availabilityDate]);

  const totalPages = Math.ceil(filteredVenues.length / ITEMS_PER_PAGE);
  const paginatedVenues = filteredVenues.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="bg-white px-6 lg:px-24 py-16 max-w-[1280px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-4">
        <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
          <ol className="list-reset flex space-x-2">
            <li>
              <Link to="/" className="hover:text-pink-600">
                Home
              </Link>
            </li>
            <li>
              <span className="mx-2 text-gray-400">{">"}</span>
            </li>
            <li>
              <Link to="/vendors" className="hover:text-pink-600">
                Venues
              </Link>
            </li>
            <li>
              <span className="mx-2 text-gray-400">{">"}</span>
            </li>
            <li className="text-gray-800 font-semibold">Banquet Halls</li>
          </ol>
        </nav>

        <div className="text-right">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Banquet Halls
          </h1>
          <p className="mt-1 text-gray-600 text-lg">
            Showing{" "}
            <strong className="text-pink-600">{filteredVenues.length} results</strong> as per your
            search criteria
          </p>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-xl mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Sort by</label>
            <select
              className="w-full border border-gray-300 rounded-md p-2"
              value={tempSortOption}
              onChange={(e) =>
                setTempSortOption(e.target.value as
                  | "rating"
                  | "priceLowHigh"
                  | "priceHighLow")
              }
            >
              <option value="rating">Rating</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Availability Date</label>
            <DatePicker
              selected={tempAvailabilityDate}
              onChange={(date) => setTempAvailabilityDate(date)}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholderText="Select date"
              dateFormat="dd/MM/yyyy"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Min Price (₹)</label>
            <input
              type="number"
              value={tempMinPrice ?? ""}
              onChange={(e) =>
                setTempMinPrice(e.target.value ? Number(e.target.value) : null)
              }
              className="w-full border border-gray-300 rounded-md p-2"
              min={0}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Max Price (₹)</label>
            <input
              type="number"
              value={tempMaxPrice ?? ""}
              onChange={(e) =>
                setTempMaxPrice(e.target.value ? Number(e.target.value) : null)
              }
              className="w-full border border-gray-300 rounded-md p-2"
              min={0}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={clearFilters}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Clear Filters
          </button>

          <button
            onClick={applyFilters}
            className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition"
          >
            Apply Filters
          </button>
        </div>
      </div>

      <section aria-label="Cities" className="mb-12">
        <div
          className="flex space-x-6 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {cities.map((city) => (
            <button
              key={city.name}
              onClick={() => handleCityClick(city.name)}
              className="flex-shrink-0 w-24 flex flex-col items-center cursor-pointer transform hover:scale-105 transition-transform duration-300 rounded-full"
              title={city.name}
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-pink-300 shadow-md">
                <img
                  src={`/City/${city.img}`}
                  alt={city.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="mt-2 text-center text-gray-700 font-semibold text-sm">
                {city.name}
              </span>
            </button>
          ))}
          <div className="flex-shrink-0 w-24 h-24 rounded-full bg-pink-600 flex items-center justify-center text-white font-semibold text-lg shadow-md cursor-default select-none">
            +40
          </div>
        </div>
      </section>

      <section aria-label="Venues">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedVenues.length === 0 && (
            <p className="col-span-full text-center text-gray-500 mt-10">
              No venues match your filters.
            </p>
          )}

          {paginatedVenues.map((venue) => (
            <div
              key={venue.name}
              onClick={() =>
                navigate(`/venues/${venue.name.toLowerCase().replace(/\s+/g, "-")}`)
              }
              className="group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200"
            >
              <div className="relative w-full h-56 overflow-hidden rounded-t-xl">
                <img
                  src={`/Venue/${venue.img}`}
                  alt={venue.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md select-none">
                  {venue.tag}
                </div>
              </div>
              <div className="p-5 bg-white">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{venue.name}</h3>
                <p className="text-sm text-gray-500 mb-2">Click to view more</p>
                <div className="flex items-center justify-between text-gray-600 text-sm">
                  <span>⭐ {venue.rating.toFixed(1)}</span>
                  <span>₹{venue.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="mt-10 flex justify-center space-x-2"
        >
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md border ${
              currentPage === 1
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : "text-pink-600 border-pink-600 hover:bg-pink-100"
            }`}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-4 py-2 rounded-md border ${
                  page === currentPage
                    ? "bg-pink-600 text-white border-pink-600"
                    : "text-pink-600 border-pink-600 hover:bg-pink-100"
                }`}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md border ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : "text-pink-600 border-pink-600 hover:bg-pink-100"
            }`}
          >
            Next
          </button>
        </nav>
      )}

      <style>
        {`
          .scrollbar-none::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-none {
            -ms-overflow-style: none;  
            scrollbar-width: none;  
          }
        `}
      </style>
    </div>
  );
};

export default BanquetHallsPage;
