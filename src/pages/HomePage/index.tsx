// Home Page

import HeroSection from "./HeroSection";
import VendorCards from "./TopVenueCards";
import VendorCarousel from "../../components/VendorCarousel";
import useVendorData from "../../hooks/useVendorData"; // ✅ Import vendor hook

export default function HomePage() {
  const vendors = useVendorData(); // ✅ Real vendor data from all_vendors.json

  // Optionally slice or sort top vendors
  const topVendors = vendors.slice(0, 8); // Pick top 8 for homepage

  return (
    <>
      <HeroSection />
      <VendorCards />
      <VendorCarousel title="Top Vendors" vendors={topVendors} />
    </>
  );
}
