import React from "react";
import {
  FaRegCalendarCheck,
  FaMapMarkerAlt,
  FaUsers,
  FaGift,
} from "react-icons/fa";

const EventPlanner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 animate-title">
          Professional Event Planning
        </h1>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          We specialize in planning, organizing, and managing events that leave unforgettable memories. Whether it’s a wedding, birthday, or corporate gathering — we handle it all with care and creativity.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature Cards */}
          {[
            {
              icon: <FaRegCalendarCheck className="text-pink-600 text-4xl" />,
              title: "Event Scheduling",
              desc: "We help you schedule, organize, and manage your event timeline seamlessly.",
            },
            {
              icon: <FaMapMarkerAlt className="text-purple-600 text-4xl" />,
              title: "Venue Selection",
              desc: "Choose from a variety of venues to suit your event's theme and size.",
            },
            {
              icon: <FaUsers className="text-yellow-500 text-4xl" />,
              title: "Guest Management",
              desc: "From invitations to seating arrangements, we take care of your guests.",
            },
            {
              icon: <FaGift className="text-green-500 text-4xl" />,
              title: "Customized Themes",
              desc: "Get personalized decoration and themes that reflect your style and story.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 card-hover"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Let Us Plan Your Next Event
          </h2>
          <p className="text-md text-gray-600 mb-6 max-w-xl mx-auto">
            Reach out today to get a free consultation and quote. We promise to make your special day truly extraordinary.
          </p>
          <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all scale-button">
            Contact Our Planner
          </button>
        </div>
      </div>

      {/* ✅ Internal CSS */}
      <style>{`
        .animate-title {
          animation: slideFadeIn 1.2s ease-in-out forwards;
        }

        .card-hover:hover {
          transform: translateY(-5px);
          transition: transform 0.3s ease;
        }

        .scale-button:hover {
          transform: scale(1.05);
        }

        @keyframes slideFadeIn {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default EventPlanner;
