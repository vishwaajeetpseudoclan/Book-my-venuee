import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type SortOption = "rating" | "priceLowHigh" | "priceHighLow";

interface FilterPanelProps {
  selectedCity: string | null;
  setSelectedCity: (city: string | null) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  minPrice: number | null;
  setMinPrice: (value: number | null) => void;
  maxPrice: number | null;
  setMaxPrice: (value: number | null) => void;
  availabilityDate: Date | null;
  setAvailabilityDate: (date: Date | null) => void;
  onApply: () => void;
  onClear: () => void;
}

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

const FilterPanel = ({
  selectedCity,
  setSelectedCity,
  sortOption,
  setSortOption,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  availabilityDate,
  setAvailabilityDate,
  onApply,
  onClear,
}: FilterPanelProps) => {
  return (
    <>
      {/* Filters */}
      <div className="bg-gray-100 p-6 rounded-xl mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            className="p-2 rounded-md border"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
          >
            <option value="rating">Rating</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
          </select>

          <DatePicker
            selected={availabilityDate}
            onChange={(date) => setAvailabilityDate(date)}
            className="w-full border rounded-md p-2"
            placeholderText="Availability Date"
            dateFormat="dd/MM/yyyy"
          />

          <input
            type="number"
            placeholder="Min Price"
            value={minPrice ?? ""}
            onChange={(e) =>
              setMinPrice(e.target.value ? +e.target.value : null)
            }
            className="w-full border rounded-md p-2"
          />

          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice ?? ""}
            onChange={(e) =>
              setMaxPrice(e.target.value ? +e.target.value : null)
            }
            className="w-full border rounded-md p-2"
          />
        </div>

        <div className="flex justify-end mt-4 gap-4">
          <button
            onClick={onClear}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Clear
          </button>
          <button
            onClick={onApply}
            className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Cities */}
      <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-none -mx-4 px-4 mb-10">
        {cities.map((city) => (
          <button
            key={city.name}
            onClick={() =>
              setSelectedCity(city.name === selectedCity ? null : city.name)
            }
            className="flex flex-col items-center"
          >
            <div
              className={`w-20 h-20 rounded-full overflow-hidden border-4 ${
                selectedCity === city.name
                  ? "border-pink-600"
                  : "border-pink-300"
              }`}
            >
              <img
                src={`/City/${city.img}`}
                alt={city.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm mt-2">{city.name}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default FilterPanel;
