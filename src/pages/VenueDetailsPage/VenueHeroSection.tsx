
// components/VenueHeroSection.tsx
import React from 'react';

interface VenueHeroSectionProps {
  title: string;
  location: string;
  rating: number | string;
  tags?: string[];
}

const VenueHeroSection: React.FC<VenueHeroSectionProps> = ({
  title,
  location,
  rating,
  tags = [],
}) => {
  return (
    <section className="bg-pink-50 py-10 px-4 md:px-16 rounded-b-3xl shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-600 text-sm mt-1">{location}</p>
          <div className="flex items-center flex-wrap gap-3 mt-2">
            <span className="bg-yellow-400 text-white text-sm px-3 py-1 rounded-full font-semibold">
              ⭐ {rating}
            </span>
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-white border text-xs text-gray-600 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <button className="bg-pink-600 text-white px-6 py-2 rounded-xl hover:bg-pink-700 shadow transition">
          Check Availability
        </button>
      </div>
    </section>
  );
};

export default VenueHeroSection;


