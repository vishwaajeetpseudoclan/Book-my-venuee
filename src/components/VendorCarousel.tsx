import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Vendor {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
}

interface VendorCarouselProps {
  title?: string;
  vendors: Vendor[];
}

const VendorCarousel: React.FC<VendorCarouselProps> = ({ title, vendors }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth / 2;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-screen-xl mx-auto sm:px-6 lg:px-8 relative">
        {title && (
          <h2 className="text-center text-3xl sm:text-4xl font-bold text-gray-900 mb-10">
            {title}
          </h2>
        )}
        <section className="w-full bg-white py-16">
          <div className="relative w-full max-w-[100vw] overflow-hidden px-4 sm:px-6 lg:px-8 mx-auto">
            {/* Arrows */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full shadow-md p-2 hover:bg-pink-50 transition cursor-pointer"
            >
              <ChevronLeft className="h-6 w-6 text-pink-600" />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-6 px-10 py-4 scroll-smooth overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {vendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="flex flex-col items-center gap-2 min-w-[140px] cursor-pointer"
                >
                  <div
                    className="w-[150px] h-[150px] flex items-center justify-center bg-gray-100 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
overflow-hidden"
                  >
                    <img
                      src={vendor.image}
                      alt={vendor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center">
                    {vendor.name}
                  </span>
                  <p className="text-xs text-gray-600 text-center">
                    {vendor.location}
                  </p>
                  <p className="text-xs text-yellow-500 font-semibold text-center">
                    ★ {vendor.rating}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full shadow-md p-2 hover:bg-pink-50 transition cursor-pointer"
            >
              <ChevronRight className="h-6 w-6 text-pink-600" />
            </button>
          </div>
        </section>
      </div>
    </section>
  );
};

export default VendorCarousel;
