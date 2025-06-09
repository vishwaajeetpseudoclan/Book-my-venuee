import { NavLink, useLocation } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/dashboard", exact: true },
  { name: "Venue", path: "/dashboard/venue" },
  { name: "Vendors", path: "/dashboard/vendors" },
  { name: "Services", path: "/dashboard/services" },
];

export default function AsideNavbar() {
  const location = useLocation();

  const currentSection = navItems.find((item) => item.path === location.pathname)?.name ?? "";

  return (
    <aside className="h-screen w-64 bg-gray-900 shadow-md hidden md:flex flex-col">
      <div className="p-6">
        <h1 className="text-center text-2xl font-bold text-pink-500 mb-1">BookMyVenue</h1>
        <h3 className="text-center text-gray-400">{currentSection}</h3>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.exact} // 👈 Ensures exact matching only for "Dashboard"
            className={({ isActive }) =>
              `block text-center px-4 py-2 rounded-lg transition-colors ${
                isActive ? "bg-pink-700 text-white font-semibold" : "text-gray-300 hover:bg-gray-800"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
