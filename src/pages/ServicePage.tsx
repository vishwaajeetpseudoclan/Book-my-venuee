import React, { ReactNode } from "react";
import {
  FaUtensils,
  FaCameraRetro,
  FaPaintBrush,
  FaMusic,
  FaLightbulb,
} from "react-icons/fa";

type Service = {
  icon: ReactNode;
  title: string;
  description: string;
};

const services: Service[] = [
  {
    icon: <FaUtensils className="text-4xl text-pink-600" />,
    title: "Catering",
    description: "Delicious food and beverages tailored to your event theme.",
  },
  {
    icon: <FaCameraRetro className="text-4xl text-purple-600" />,
    title: "Photography",
    description: "Professional event photography and videography services.",
  },
  {
    icon: <FaPaintBrush className="text-4xl text-yellow-500" />,
    title: "Decoration",
    description: "Stunning decor setup for weddings, parties, and more.",
  },
  {
    icon: <FaMusic className="text-4xl text-green-500" />,
    title: "Music & DJ",
    description: "Live music, DJs, and sound systems for your special day.",
  },
  {
    icon: <FaLightbulb className="text-4xl text-blue-500" />,
    title: "Lighting",
    description: "Creative lighting design that sets the perfect mood.",
  },
];

const ServicePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-pink-50 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
          Our Services
        </h2>
        <p className="text-gray-600 text-lg mb-12">
          Discover the range of professional services we offer to make your event unforgettable.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
