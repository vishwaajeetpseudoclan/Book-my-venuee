import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Users, Star, IndianRupee } from "lucide-react";

export interface Venue {
  id: string;
  name: string;
  location: string;
  type: string | string[];
  capacity: string;
  price_per_plate: string;
  image: string;
  // If you have real ratings later, add here.
}

const VenueCard: React.FC<{ venue: Venue }> = ({ venue }) => {
  const navigate = useNavigate();
  const dummyRating = 4.3; // Can replace with real rating later

  return (
    <div
      className="group cursor-pointer bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
      onClick={() => navigate(`/venues/${venue.id}`)}
    >
      {/* Image Section */}
      <div className="relative h-40 sm:h-56 w-full overflow-hidden bg-gray-100">
        <img
          src={venue.image || "/Images/placeholder.jpeg"}
          alt={venue.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/Images/placeholder.jpeg";
          }}
        />
        <div className="absolute top-2 left-2 bg-yellow-400 text-white text-xs px-3 py-1 rounded-full shadow flex items-center gap-1 font-semibold">
          <Star size={14} /> {dummyRating}
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {venue.name}
          </h3>
          <p className="flex items-start gap-1 text-sm text-gray-600">
            <MapPin className="text-pink-500 min-w-[16px] h-4 mt-[1px]" />
            <span className="line-clamp-1">{venue.location}</span>
          </p>

          <p className="text-xs text-gray-500 line-clamp-2">
            {Array.isArray(venue.type) ? venue.type.join(", ") : venue.type}
          </p>
        </div>

        <div className="mt-3 flex flex-col justify-between text-sm text-gray-600">
          <span className="flex items-center gap-1 text-pink-600 text-[1.3em] font-semibold">
            <IndianRupee size={14} className="text-pink-600" />
            {venue.price_per_plate}/plate
          </span>
          <span className="flex items-center gap-1">
            <Users size={14} className="text-purple-500" />
            {venue.capacity}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
