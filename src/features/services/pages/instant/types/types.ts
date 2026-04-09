export interface LatLng {
  lat: number;
  lng: number;
}

export interface Provider {
  id: number;
  name: string;
  profession: string;
  experience: string;
  rating: number;
  distance: number;
  status: "متاح الآن" | "مشغول حالياً";
  position: LatLng;
  avatar: string;
  image?: string;
}

