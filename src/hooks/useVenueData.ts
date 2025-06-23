import { useEffect, useState } from "react";
import venueData from "../Data/all_venues.json";

export interface Venue {
  id: string;
  name: string;
  location: string;
  type: string;
  capacity: string;
  price_per_plate: string;
  image: string;
}

export default function useVenueData() {
  const [venues, setVenues] = useState<Venue[]>([]);

  useEffect(() => {
    const formattedVenues = venueData.map((venue, index) => ({
      id: (index + 1).toString(), // Generate a unique ID
      name: venue["Hotel Name"],
      location: venue["Location"],
      type: venue["Venue Type"],
      capacity: venue["Capacity"],
      price_per_plate: venue["Price per Plate"],
      image: venue["Image URL"],
    }));
    setVenues(formattedVenues);
  }, []);

  return venues;
}
