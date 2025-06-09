"use client";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-bold text-pink-500">BookMyVenue</h3>
            <p className="text-gray-400 mt-2">Your venue, your way.</p>
            <div className="mt-4 space-y-2 text-sm text-gray-400">
              <div className="flex items-center">
                <img src="Images/location.png" alt="Location" className="w-5 h-5 mr-2" />
                New Delhi, India
              </div>
              <div className="flex items-center">
                <img src="Images/phone.png" alt="Phone" className="w-5 h-5 mr-2" />
                +91 9876543210
              </div>
              <div className="flex items-center">
                <img src="Images/mail.png" alt="Email" className="w-5 h-5 mr-2" />
                contact@bookmyvenue.com
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/about" className="hover:text-pink-500">About Us</Link></li>
              <li><Link to="#" className="hover:text-pink-500">Careers</Link></li>
              <li><Link to="#" className="hover:text-pink-500">Blog</Link></li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Explore</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/venues" className="hover:text-pink-500">Locations</Link></li>
              <li><Link to="/venues" className="hover:text-pink-500">Popular Venues</Link></li>
              <li><Link to="#" className="hover:text-pink-500">Popular Vendors</Link></li>
              <li><Link to="/services" className="hover:text-pink-500">Services</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="#" className="hover:text-pink-500">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-pink-500">Terms of Service</Link></li>
              <li><Link to="#" className="hover:text-pink-500">Cookies</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Media
        <div className="flex justify-center space-x-6 mb-8">
          <a href="https://www.facebook.com/BookMyVenue" target="_blank" rel="noopener noreferrer">
            <img src="/Images/facebook.png" alt="Facebook" className="w-6 h-6 hover:opacity-70" />
          </a>
          <a href="https://www.instagram.com/BookMyVenue" target="_blank" rel="noopener noreferrer">
            <img src="/Images/insta.png" alt="Instagram" className="w-6 h-6 hover:opacity-70" />
          </a>
          <a href="https://www.twitter.com/BookMyVenue" target="_blank" rel="noopener noreferrer">
            <img src="/Images/x.png" alt="Twitter" className="w-6 h-6 hover:opacity-70" />
          </a>
          <a href="https://www.linkedin.com/company/BookMyVenue" target="_blank" rel="noopener noreferrer">
            <img src="/Images/linkedln.png" alt="LinkedIn" className="w-6 h-6 hover:opacity-70" />
          </a>
        </div> */}

        {/* Footer Bottom */}
        <div className="text-center text-gray-400 py-6 border-t border-gray-700 text-sm">
          &copy; {new Date().getFullYear()} BookMyVenue. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
