import React, { useState } from "react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
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

const venues = [
  { name: "Banquet Halls", href: "/venues" },
  { name: "Outdoor Venues", href: "/venues" },
  { name: "Hotels", href: "/venues" },
];

const services = [
  { name: "Event Planners", href: "/services" },
  { name: "Music & DJ", href: "/services" },
  { name: "Lighting", href: "/services" },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderDropdown = (
    label: string,
    items: { name: string; href: string }[]
  ) => (
    <Popover className="relative">
      {({ open }) => (
        <>
          <PopoverButton
            className={`font-semibold outline-none border-none bg-transparent px-2 py-1 ${
              open ? "text-pink-600" : "text-gray-900"
            } hover:text-pink-600 transition cursor-pointer`}
          >
            {label}
          </PopoverButton>

          <PopoverPanel className="absolute top-full left-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-gray-200">
            <div className="p-2">
              {items.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-100 hover:text-pink-700 rounded-md transition"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="text-2xl font-bold text-pink-600">
            BookMyVenue
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <Bars3Icon className="size-6" />
          </button>
        </div>

        <PopoverGroup className="hidden lg:flex gap-6 text-sm font-medium items-center">
          <Link to="/" className="transition">Home</Link>
          {renderDropdown("Vendors", vendors)}
          {renderDropdown("Venues", venues)}
          {renderDropdown("Services", services)}
          <Link to="/about" className="transition">About Us</Link>
          <Link to="/contact" className="transition">Contact</Link>
          <Link to="/login" className="border border-pink-700 text-pink-700 font-medium px-4 py-2 rounded-full bg-white">Sign Up</Link>
          <Link to="/register" className="bg-pink-600 text-white font-bold px-4 py-2 rounded-full">Register</Link>
        </PopoverGroup>
      </nav>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full max-w-sm overflow-y-auto bg-white p-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-pink-600">
              BookMyVenue
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 p-2.5 text-gray-700"
            >
              <XMarkIcon className="size-6" />
            </button>
          </div>

          <div className="mt-6 space-y-4 text-base font-semibold text-gray-900">
            <Link to="/" className="block">Home</Link>

            <Disclosure>
              <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 px-3 hover:bg-gray-50">
                Vendors
                <ChevronDownIcon className="size-5" />
              </DisclosureButton>
              <DisclosurePanel className="pl-4 mt-2 space-y-1">
                {vendors.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block py-1 px-2 text-sm text-gray-700 rounded-md hover:bg-pink-100 hover:text-pink-700 transition"
                  >
                    {item.name}
                  </Link>
                ))}
              </DisclosurePanel>
            </Disclosure>

            <Disclosure>
              <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 px-3 hover:bg-gray-50">
                Venues
                <ChevronDownIcon className="size-5" />
              </DisclosureButton>
              <DisclosurePanel className="pl-4 mt-2 space-y-1">
                {venues.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block py-1 px-2 text-sm text-gray-700 hover:underline"
                  >
                    {item.name}
                  </Link>
                ))}
              </DisclosurePanel>
            </Disclosure>

            <Disclosure>
              <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 px-3 hover:bg-gray-50">
                Services
                <ChevronDownIcon className="size-5" />
              </DisclosureButton>
              <DisclosurePanel className="pl-4 mt-2 space-y-1">
                {services.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block py-1 px-2 text-sm text-gray-700 hover:underline"
                  >
                    {item.name}
                  </Link>
                ))}
              </DisclosurePanel>
            </Disclosure>

            <Link to="/about" className="block">About Us</Link>
            <Link to="/contact" className="block">Contact</Link>
            <Link
              to="/login"
              className="block border border-pink-700 text-pink-700 px-4 py-2 rounded-full text-center hover:bg-pink-50 transition"
            >
              Sign Up
            </Link>
            <Link
              to="/register"
              className="block bg-pink-600 text-white px-4 py-2 rounded-full text-center hover:bg-pink-700 transition"
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
