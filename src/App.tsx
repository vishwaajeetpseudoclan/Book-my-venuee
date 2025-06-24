import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";

import "./App.css";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./components/layout/MainLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
// import VendorsVenueDashboard from "./pages/dashboard pages/vendor/VendorsVenuesDashboard";
import VendorDashboard from "./pages/DashboardPage/VendorDashboard";
// import ServicesDashboard from "./pages/dashboard pages/freelancer/FreelancerServices";
// import DashboardPage from "./pages/dashboard pages/DashboardPage";
import AboutUs from "./pages/AboutUs/AboutUs";
import ContactUs from "./pages/ContactUs";
import RegisterPage from "./pages/RegisterPage";
import AllVenuesPage from "./pages/VenuesPage";
import ServicePage from "./pages/ServicePage.tsx";
import EventPlanner from "./pages/EventPlanner.tsx";
import MusicAndDjService from "./pages/MusicAndDjService.tsx";
import LightingService from "./pages/LightingService.tsx";
import VendorPage from "./pages/VendorPage";
import VenueCategoryPage from "./pages/VenueCategoryPage";
import VendorCategoryPage from "./pages/VendorCategoryPage";
import VenueDetailsPage from "./pages/VenueDetailsPage";
import FreelancerDashboard from "./pages/DashboardPage/FreelancerDashboard.tsx";
import IndividualDashboard from "./pages/DashboardPage/IndividualDashboard";

const queryClient = new QueryClient();  

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<div>Services</div>} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/venues" element={<AllVenuesPage />} />
          <Route path="/services/all" element={<ServicePage />} />
          <Route path="/services/eventplanner" element={<EventPlanner />} />
          <Route path="/services/music-dj" element={<MusicAndDjService />} />
          <Route path="/services/lighting" element={<LightingService />} />
          <Route path="/venues/:venueId" element={<VenueDetailsPage/>} />
          <Route path="/venues/category/:categoryName" element={<VenueCategoryPage />} />
          <Route path="/vendors" element={<VendorPage />} />
          <Route path="/vendors/category/:categoryName" element={<VendorCategoryPage />} />

        </Route>

      {/* Dashboard Pages */}
      <Route path="/dashboard" element={<DashboardLayout />}>
          {/* <Route path="dashboardpage" element={<DashboardPage />} />
          <Route path="venue" element={<VendorsVenueDashboard />} /> */}
          {/* <Route path="Services" element={<ServicesDashboard />} /> */}
          <Route path="vendors-dashboard" element={<VendorDashboard />} />
          <Route path="freelancer-dashboard" element={<FreelancerDashboard />} />
        <Route path="user-Dashboard" element={<IndividualDashboard />} />

      </Route>

      </Routes>
    </QueryClientProvider>
  );
}

export default App;
