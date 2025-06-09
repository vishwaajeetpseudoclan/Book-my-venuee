import React, { useState } from "react";
import {
  PopoverGroup,
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const vendors = [
  { name: "Caterers", href: "/services" },
  { name: "Decorators", href: "/services" },
  { name: "Photographers", href: "/services" },
];

const venueCategories = [
  { name: "Banquet Halls", href: "/venues/banquet-halls" },
  { name: "Marriage Garden / Lawns", href: "/venues/gardens" },
  { name: "Wedding Resorts", href: "/venues/resorts" },
  { name: "Small Function / Party Halls", href: "/venues/party-halls" },
];

const services = [
  { name: "Event Planners", href: "/services" },
  { name: "Music & DJ", href: "/services" },
  { name: "Lighting", href: "/services" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderHoverDropdown = (
    label: string,
    items: { name: string; href: string }[]
  ) => (
    <div className="relative group">
      <span className="cursor-pointer font-semibold px-2 py-1 text-gray-900 group-hover:text-pink-600 transition">
        {label}
      </span>
      <div className="absolute z-20 hidden group-hover:block mt-2 w-48 bg-white shadow-lg ring-1 ring-gray-200 rounded-md">
        <div className="p-2">
          {items.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-100 hover:text-pink-700 rounded-md"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  const renderVenueHover = () => (
    <div className="relative group">
      <span className="cursor-pointer font-semibold px-2 py-1 text-gray-900 group-hover:text-pink-600 transition">
        Venues
      </span>
      <div className="absolute z-20 hidden group-hover:block mt-2 w-48 bg-white shadow-lg ring-1 ring-gray-200 rounded-md">
        <div className="p-2">
          {venueCategories.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-100 hover:text-pink-700 rounded-md"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        <Link to="/" className="text-2xl font-bold text-pink-600">
          BookMyVenue
        </Link>

        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-gray-700"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        <PopoverGroup className="hidden lg:flex gap-6 items-center text-sm font-medium">
          <Link to="/" className="hover:text-pink-600 transition">
            Home
          </Link>
          {renderHoverDropdown("Vendors", vendors)}
          {renderVenueHover()}
          {renderHoverDropdown("Services", services)}
          <Link to="/about" className="hover:text-pink-600 transition">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-pink-600 transition">
            Contact
          </Link>
          <Link
            to="/login"
            className="border border-pink-700 text-pink-700 font-medium px-4 py-2 rounded-full bg-white"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-pink-600 text-white font-bold px-4 py-2 rounded-full"
          >
            Register
          </Link>
        </PopoverGroup>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <DialogPanel className="fixed inset-0 z-50 bg-white p-6 overflow-y-auto">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-pink-600">
              BookMyVenue
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 space-y-4 font-medium text-gray-900">
            <Link to="/" className="block">
              Home
            </Link>

            <Disclosure>
              <DisclosureButton className="flex justify-between w-full py-2 hover:bg-gray-50 rounded-md">
                Vendors <ChevronDownIcon className="h-5 w-5" />
              </DisclosureButton>
              <DisclosurePanel className="pl-4 space-y-1">
                {vendors.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block py-1 text-sm text-gray-700 hover:underline"
                  >
                    {item.name}
                  </Link>
                ))}
              </DisclosurePanel>
            </Disclosure>

            <Disclosure>
              <DisclosureButton className="flex justify-between w-full py-2 hover:bg-gray-50 rounded-md">
                Venues <ChevronDownIcon className="h-5 w-5" />
              </DisclosureButton>
              <DisclosurePanel className="pl-4 space-y-1">
                {venueCategories.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block text-sm py-1 hover:underline"
                  >
                    {item.name}
                  </Link>
                ))}
              </DisclosurePanel>
            </Disclosure>

            <Disclosure>
              <DisclosureButton className="flex justify-between w-full py-2 hover:bg-gray-50 rounded-md">
                Services <ChevronDownIcon className="h-5 w-5" />
              </DisclosureButton>
              <DisclosurePanel className="pl-4 space-y-1">
                {services.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block text-sm py-1 hover:underline"
                  >
                    {item.name}
                  </Link>
                ))}
              </DisclosurePanel>
            </Disclosure>

            <Link to="/about" className="block">
              About Us
            </Link>
            <Link to="/contact" className="block">
              Contact
            </Link>
            <Link
              to="/login"
              className="block border border-pink-700 text-pink-700 px-4 py-2 rounded-full text-center"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="block bg-pink-600 text-white px-4 py-2 rounded-full text-center"
            >
              Register
            </Link>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
