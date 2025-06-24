import React from "react";
import { FaLightbulb } from "react-icons/fa";

const LightingService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-pink-100 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 animate-title">
          Lighting Services
        </h1>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Create the perfect ambiance for any event with our advanced and customizable lighting solutions — from elegant wedding setups to dynamic stage lighting for parties.
        </p>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition card-hover">
          <FaLightbulb className="text-5xl text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Professional Lighting Setup</h2>
          <p className="text-gray-600">
            We offer a wide range of lighting options including fairy lights, chandeliers, LED stage lighting, color washes, and spotlights. Whether you need mood lighting for a reception or dramatic stage effects, we handle everything from design to execution.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-xl font-bold text-gray-700 mb-2">Let Your Event Shine</h2>
          <p className="text-md text-gray-600 mb-6 max-w-md mx-auto">
            Get in touch to explore lighting packages customized to your event size, theme, and budget.
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full font-semibold shadow-md transition scale-button">
            Contact Us
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

export default LightingService;
