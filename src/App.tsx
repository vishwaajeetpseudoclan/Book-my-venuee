import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import VenuesPage from "./pages/VenuesPage";

import MainLayout from "./components/Layout/MainLayout";
import DashboardLayout from "./components/Layout/DashboardLayout";

import DashboardPage from "./pages/DashboardPage";
import VenueDashboard from "./components/Dashboard Components/VenueDashboard";
import VendorDashboard from "./components/Dashboard Components/VendorDashboard";
import ServicesDashboard from "./components/Dashboard Components/ServicesDashboard";

import BanquetHallsPage from "./pages/venues/BanquetHallsPage";
import MarriageGardenPage from "./pages/venues/MarriageGardenPage";
import WeddingResorts from "./pages/venues/WeddingResorts";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* Public Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<div>Services</div>} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/venues" element={<div>Venues</div>} />
          <Route path="/venues/:id" element={<div>Venue Details</div>} />
          <Route path="/venues/banquet-halls" element={<BanquetHallsPage />} />
          <Route path="/venues/gardens" element={<MarriageGardenPage />} />
          <Route path="/venues/resorts" element={<WeddingResorts />} />
          <Route path="/venues" element={<VenuesPage />} />
        </Route>

        {/* Dashboard Layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="dashboardpage" element={<DashboardPage />} />
          <Route path="venue" element={<VenueDashboard />} />
          <Route path="vendors" element={<VendorDashboard />} />
          <Route path="services" element={<ServicesDashboard />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
