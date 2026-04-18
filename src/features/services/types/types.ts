export interface LatLng {
  lat: number;
  lng: number;
}

export interface Provider {
  id: number;
  name: string;
  pictureUrl?: string | null;
  avatar?: string | null;
  bio: string;
  nickname: string;
  rating: number | null;
  reviewsCount: number;
  jobsCount: number;
  governorateId: number;
  regionId: number;
  baseLocation: {
    id: number;
    latitude: number;
    longitude: number;
    addressText: string;
    providerId: number;
  };
  services: { id: number; name: string }[];
  status?: boolean;
  profession?: number;
  distance?: number;
}
