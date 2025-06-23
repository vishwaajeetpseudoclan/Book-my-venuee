import useVenueData from "../../../hooks/useVenueData";
import VenueCard from "../../../components/VenueCards";

export default function VenueDashboard() {
  const venues = useVenueData();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </div>
  );
}
