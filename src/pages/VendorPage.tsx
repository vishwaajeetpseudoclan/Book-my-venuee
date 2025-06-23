import { Link } from "react-router-dom";
import useVendorData from "../hooks/useVendorData";
import VendorCarousel from "../components/VendorCarousel"; // adjust path if needed

const VendorPage = () => {
  const vendors = useVendorData();

  const categories = Array.from(new Set(vendors.map((v) => v.category))).map(
    (category) => ({
      name: category,
      vendors: vendors.filter((v) => v.category === category),
    })
  );

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-10">
          Our Vendors
        </h1>

        {categories.map((category, index) => (
          <div key={index} className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 border-l-4 border-pink-500 pl-3">
                {category.name}
              </h2>
              <Link
                to={`/vendors/category/${category.name.toLowerCase()}`}
                className="text-sm text-pink-600 hover:underline"
              >
                See All →
              </Link>
            </div>
            <VendorCarousel vendors={category.vendors} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorPage;
