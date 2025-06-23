import vendorData from "../Data/all_vendors.json";

export interface Vendor {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  location: string;
}

export default function useVendorData(): Vendor[] {
  return vendorData;
}
