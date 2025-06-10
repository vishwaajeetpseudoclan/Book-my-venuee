import React from "react";
import { Link } from "react-router-dom";

const venueCategories = [
  {
    name: "Banquet Halls",
    path: "/venues/banquet-halls",
    img: "/images/img1.jpg",
  },
  {
    name: "Marriage Garden / Lawns",
    path: "/venues/marriage-garden",
    img: "/images/img2.jpg",
  },
  {
    name: "Wedding Resorts",
    path: "/venues/wedding-resorts",
    img: "/images/img3.jpg",
  },
  {
    name: "Small Function / Party Halls",
    path: "/venues/party-halls",
    img: "/images/img4.jpg",
  },
];

export default function VenuesPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-pink-600 mb-10">
          Explore Wedding Venues by Type
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {venueCategories.map((venue) => (
            <Link
              key={venue.name}
              to={venue.path}
              className="group block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 bg-white"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={venue.img}
                  alt={venue.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition duration-300"></div>
              </div>
              <div className="p-4 text-center">
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-pink-600 transition">
                  {venue.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
