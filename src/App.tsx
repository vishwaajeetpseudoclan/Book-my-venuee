import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";

import "./App.css";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./components/Layout";
import Register from "./pages/Register";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<div>About Us</div>} />
          <Route path="/services" element={<div>Services</div>} />
          <Route path="/contact" element={<div>Contact Us</div>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} /> {/* <-- Here */}
          <Route path="/venues" element={<div>Venues</div>} />
          <Route path="/venues/:id" element={<div>Venue Details</div>} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
