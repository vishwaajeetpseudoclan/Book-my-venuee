import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import useVendorData from "../hooks/useVendorData";
import SearchBar from "../components/SearchBar"; // reuse the same one as VenuesPage

const VendorCategoryPage = () => {
  const { categoryName } = useParams();
  const allVendors = useVendorData();
  const [filter, setFilter] = useState("");

  // Filter vendors by category
  const categoryVendors = allVendors.filter(
    (v) => v.category.toLowerCase() === categoryName?.toLowerCase()
  );

  // Get unique cities
  const allCities = useMemo(() => {
    return Array.from(new Set(categoryVendors.map(v => v.location?.trim())))
      .filter(Boolean)
      .sort();
  }, [categoryVendors]);

  // Apply city filter
  const filteredVendors = filter
    ? categoryVendors.filter((vendor) =>
        vendor.location.toLowerCase().includes(filter.toLowerCase())
      )
    : categoryVendors;

  // Group by city for now (can be extended to rating, price, etc.)
  const groupedByCity: Record<string, typeof filteredVendors> = {};
  filteredVendors.forEach((vendor) => {
    const city = vendor.location?.trim() || "Other";
    if (!groupedByCity[city]) groupedByCity[city] = [];
    groupedByCity[city].push(vendor);
  });

  const sortedCities = Object.keys(groupedByCity).sort();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center capitalize">
        {categoryName} Vendors
      </h1>

      <SearchBar
        cities={allCities}
        placeholder="Search by city"
        onSearch={(city) => setFilter(city)}
      />

      {sortedCities.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No vendors found for this category.</p>
      ) : (
        sortedCities.map((city) => (
          <div key={city} className="mb-12 mt-10">
            <h2 className="text-2xl font-semibold text-pink-600 border-l-4 border-pink-400 pl-4 mb-6">
              {city}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {groupedByCity[city].map((vendor) => (
                <div
                  key={vendor.id}
                  className="bg-white p-4 shadow rounded-lg text-center"
                >
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-24 h-24 object-cover rounded-full mx-auto mb-3"
                  />
                  <h3 className="text-lg font-semibold">{vendor.name}</h3>
                  <p className="text-sm text-gray-500">{vendor.location}</p>
                  <p className="text-xs text-yellow-500">★ {vendor.rating}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default VendorCategoryPage;
