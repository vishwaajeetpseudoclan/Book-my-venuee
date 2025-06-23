// Venue Details Page 

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useVenueData, { Venue } from '../../hooks/useVenueData';
import VenueHeroSection from './VenueHeroSection';
import { Star, MessageCircle } from 'lucide-react';

const VenueDetailsPage = () => {
  const { venueId } = useParams<{ venueId: string }>();
  const venues = useVenueData();
  const [venue, setVenue] = useState<Venue | null>(null);

  useEffect(() => {
    if (venues.length > 0) {
      const matchedVenue = venues.find((v) => v.id === venueId);
      setVenue(matchedVenue || null);
    }
  }, [venueId, venues]);

  if (!venue) return <div className="text-center mt-10">Venue not found.</div>;

  return (
    <div className="bg-gradient-to-b from-white via-pink-50 to-purple-50">
      <VenueHeroSection
        title={venue.name}
        location={venue.location}
        rating={4.5}
        tags={venue.type.split(',').map(tag => tag.trim())}
      />

      {/* Grid layout */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Gallery Section */}
          <section>
            <h2 className="text-xl font-bold text-pink-700 mb-3">Photo Gallery</h2>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
              {/* Instead of dummy images, show venue's image in the gallery */}
              <img
                src={venue.image}
                alt={venue.name}
                className="w-48 h-32 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
              />
            </div>
          </section>

          {/* About Section */}
          <section className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-3">About the Venue</h2>
            <p className="text-gray-700">
              {venue.name} offers a stunning environment perfect for weddings, parties, and events. Elegantly crafted, with top-notch facilities and a convenient location.
            </p>
          </section>

          {/* Facilities Section */}
          <section className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Facilities & Services</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Banquet Hall & Outdoor Spaces</li>
              <li>In-house Catering & Decor</li>
              <li>Power Backup & Valet Parking</li>
              <li>Bridal Room & Event Planner</li>
            </ul>
          </section>

          {/* Reviews Section */}
          <section className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Star className="text-yellow-500" /> Reviews
            </h2>
            <div className="space-y-4">
              {[1, 2].map((review) => (
                <div key={review} className="border border-pink-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    "Amazing venue with beautiful decoration and courteous staff. Our event was flawless!"
                  </p>
                  <p className="text-xs text-gray-500 mt-2">— Guest {review}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Comment Section */}
          <section className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <MessageCircle className="text-purple-600" /> Leave a Comment
            </h2>
            <textarea
              placeholder="Write your experience..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300"
              rows={4}
            ></textarea>
            <button className="mt-3 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition">
              Submit
            </button>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Pricing */}
          <section className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-lg font-bold text-purple-600 mb-2">Price Starting</h3>
            <p className="text-xl font-bold text-gray-800">
              {venue.price_per_plate}{" "}
              <span className="text-sm font-medium text-gray-500">/ plate</span>
            </p>
          </section>

          {/* Contact & Book */}
          <section className="bg-gradient-to-tr from-pink-500 to-purple-500 text-white p-6 rounded-xl shadow text-center">
            <h3 className="text-lg font-semibold mb-2">Interested?</h3>
            <p className="mb-4 text-sm">Get in touch for availability and bookings.</p>
            <button className="bg-white text-pink-600 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition">
              Contact Now
            </button>
          </section>

          {/* Location */}
          <section className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Location</h3>
            <div className="w-full h-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
              Map Placeholder
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center">{venue.location}</p>
          </section>

          {/* FAQs */}
          <section className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-bold text-gray-800 mb-4">FAQs</h3>
            <details className="mb-2">
              <summary className="cursor-pointer text-sm font-semibold text-pink-600">Is outside catering allowed?</summary>
              <p className="text-sm text-gray-600 mt-1">Yes, with prior approval.</p>
            </details>
            <details>
              <summary className="cursor-pointer text-sm font-semibold text-pink-600">Is there parking available?</summary>
              <p className="text-sm text-gray-600 mt-1">Yes, ample parking space for guests.</p>
            </details>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VenueDetailsPage;
