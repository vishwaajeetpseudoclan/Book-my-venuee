import React from "react";
import { Link } from "react-router-dom";

const venues = [
  {
    id: 1,
    name: "The Royal Palace",
    image: "Images/img1.jpeg",
    description:
      "Elegant and luxurious venue ideal for weddings and grand events.",
    address: "123 Main Street, Mumbai",
    price: "₹2,50,000/day",
    availability: "Available",
  },
  {
    id: 2,
    name: "Lakeside Garden",
    image: "Images/img2.jpeg",
    description: "Serene lakeside location with beautiful outdoor decor.",
    address: "Lakeview Road, Pune",
    price: "₹1,80,000/day",
    availability: "Booked",
  },
  {
    id: 3,
    name: "Heritage Haveli",
    image: "Images/img3.jpeg",
    description:
      "A majestic haveli with intricate architecture perfect for cultural celebrations.",
    address: "Old City, Jaipur",
    price: "₹2,00,000/day",
    availability: "Available",
  },
  {
    id: 4,
    name: "Skyline Banquet",
    image: "Images/img4.jpg",
    description:
      "Modern banquet hall with rooftop views and premium amenities.",
    address: "MG Road, Bangalore",
    price: "₹2,75,000/day",
    availability: "Booked",
  },
  {
    id: 5,
    name: "Palm Retreat",
    image: "Images/img5.jpg",
    description:
      "Tropical outdoor venue surrounded by palm trees and lush lawns.",
    address: "Beachside Avenue, Goa",
    price: "₹3,00,000/day",
    availability: "Available",
  },
  {
    id: 6,
    name: "The Glass House",
    image: "Images/img1.jpeg",
    description: "Stylish glass-walled venue ideal for modern, chic events.",
    address: "Cyberhub, Gurgaon",
    price: "₹2,40,000/day",
    availability: "Available",
  },
  {
    id: 7,
    name: "Amber Convention Center",
    image: "Images/img2.jpeg",
    description:
      "Large-scale venue with flexible spaces for corporate and wedding functions.",
    address: "Science City Road, Ahmedabad",
    price: "₹1,60,000/day",
    availability: "Booked",
  },
  {
    id: 8,
    name: "Moonlight Meadows",
    image: "Images/img3.jpeg",
    description:
      "Enchanting open-air venue with fairy lights and garden ambiance.",
    address: "Ring Road, Indore",
    price: "₹1,90,000/day",
    availability: "Available",
  },
];

const TopVenues = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center sm:text-left">
            Top Venues
          </h2>
          <Link
            to="/venues"
            className="text-pink-600 hover:underline font-medium text-sm sm:text-base"
          >
            More →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-500 overflow-hidden flex flex-col"
            >
              <div className="h-40 sm:h-56 w-full overflow-hidden">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    {venue.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {venue.description}
                  </p>
                </div>
                <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 space-y-1">
                  <p>
                    <span className="font-medium text-gray-700">Address:</span>{" "}
                    {venue.address}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Price:</span>{" "}
                    {venue.price}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">
                      Availability:
                    </span>{" "}
                    <span
                      className={
                        venue.availability === "Available"
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      {venue.availability}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopVenues;
