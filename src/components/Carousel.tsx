import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const vendorLogos = [
  "/HR.jpg",
  "/HR.jpg",
  "/HR.jpg",
  "/HR.jpg",
  "/HR.jpg",
  "/HR.jpg",
  "/HR.jpg",
  "/HR.jpg",
  "/HR.jpg",
  "/HR.jpg",
  "/HR.jpg",
  "/HR.jpg",
  "/HR.jpg",
  "/HR.jpg",
  "/HR.jpg",
  "/HR.jpg",
  "/HR.jpg",
  "/HR.jpg",
  "/HR.jpg",
  "/HR.jpg",
];

const TopVendorsCarousel = () => {
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
    <div className="bg-white py-16">
      <h2 className="text-center text-3xl sm:text-4xl font-bold text-gray-900 mb-10">
        Top Vendors
      </h2>

      <div className="relative max-w-6xl mx-auto">
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
          {vendorLogos.map((src, index) => (

            <div
              key={index}
              className="flex flex-col items-center gap-2 min-w-[140px] cursor-pointer"
            >
              <div
                className="w-[150px] h-[150px] flex items-center justify-center bg-gray-100 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
 overflow-hidden"
              >
                <img
                  src={src}
                  alt={`Vendor ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 text-center">
                Vendor {index + 1}
              </span>
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
    </div>
  );
};

export default TopVendorsCarousel;
