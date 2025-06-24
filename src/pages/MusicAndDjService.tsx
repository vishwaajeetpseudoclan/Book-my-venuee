import React from "react";
import { FaHeadphones, FaMusic } from "react-icons/fa";

const MusicAndDjService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 animate-title">
          Music & DJ Services
        </h1>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Create the perfect mood for your event with our professional music arrangements and high-energy DJs. From soulful live bands to energetic club mixes — we’ve got your event covered.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Music Services */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition card-hover">
            <FaMusic className="text-5xl text-pink-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Live Music</h2>
            <p className="text-gray-600">
              From classical instrumentalists to modern acoustic bands, our curated live music performances bring elegance and emotion to every celebration.
            </p>
          </div>

          {/* DJ Services */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition card-hover">
            <FaHeadphones className="text-5xl text-purple-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Professional DJ</h2>
            <p className="text-gray-600">
              Our experienced DJs deliver unforgettable dance floors with custom playlists, seamless mixes, and the latest party anthems. Perfect for weddings, birthdays & corporate nights.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-xl font-bold text-gray-700 mb-2">
            Ready to Groove with Us?
          </h2>
          <p className="text-md text-gray-600 mb-6 max-w-md mx-auto">
            Book our Music & DJ services today and let the rhythm set the mood. We handle sound, vibe, and everything in between.
          </p>
          <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition scale-button">
            Book Now
          </button>
        </div>
      </div>

      {/* Internal CSS */}
      <style>{`
        .animate-title {
          animation: fadeSlideIn 1s ease-out;
        }

        .card-hover:hover {
          transform: translateY(-5px);
          transition: transform 0.3s ease;
        }

        .scale-button:hover {
          transform: scale(1.05);
        }

        @keyframes fadeSlideIn {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default MusicAndDjService;
