import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const ContactUs: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-white to-pink-50 py-20 px-4 sm:px-8 md:px-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-pink-600 mb-6 text-center animate-fade-in">
          Get in Touch
        </h2>

        <p className="text-gray-700 text-center mb-12 max-w-2xl mx-auto animate-fade-in delay-100">
          Whether you have questions, ideas, or want to collaborate—our team at BookMyVenue is excited to hear from you and help bring your events to life!
        </p>

        <form className="shadow-xl rounded-2xl p-8 space-y-6 bg-white border border-pink-200 animate-slide-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">Subject</label>
            <input
              type="text"
              id="subject"
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow"
              placeholder="Subject of your message"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
            <textarea
              id="message"
              rows={5}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            Send Message
          </button>
        </form>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-sm text-gray-700 animate-fade-in delay-200">
          <div className="space-y-2 hover:bg-white hover:shadow-lg p-4 rounded-lg transition-all duration-300">
            <h3 className="text-lg font-semibold text-pink-600">Email & Phone</h3>
            <p>Email: <a href="mailto:support@bookmyvenue.com" className="hover:underline">support@bookmyvenue.com</a></p>
            <p>Phone: <a href="tel:+919876543210" className="hover:underline">+91 98765 43210</a></p>
          </div>

          <div className="space-y-2 hover:bg-white hover:shadow-lg p-4 rounded-lg transition-all duration-300">
            <h3 className="text-lg font-semibold text-pink-600">Our Address</h3>
            <p>123 Celebration Street</p>
            <p>Event City, IN 400001</p>
          </div>

          <div className="space-y-2 hover:bg-white hover:shadow-lg p-4 rounded-lg transition-all duration-300">
            <h3 className="text-lg font-semibold text-pink-600">Follow Us</h3>
            <div className="flex justify-center gap-4 text-xl cursor-pointer">
              <a href="#" aria-label="Facebook" className="text-[#1877F2] hover:opacity-80 transition-opacity"><FaFacebook /></a>
              <a href="#" aria-label="Instagram" className="text-[#E4405F] hover:opacity-80 transition-opacity"><FaInstagram /></a>
              <a href="#" aria-label="Twitter" className="text-[#1DA1F2] hover:opacity-80 transition-opacity"><FaTwitter /></a>
              <a href="#" aria-label="LinkedIn" className="text-[#0077B5] hover:opacity-80 transition-opacity"><FaLinkedin /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
