export interface ProviderLocation {
  id: number;
  latitude: number;
  longitude: number;
  addressText: string;
  providerId: number;
}

export interface ProviderService {
  id: number;
  name: string;
}

export interface ProviderProfile {
  id: number;
  name: string;
  pictureUrl: string | null;
  bio: string;
  nickname: string;
  rating: number;
  reviewsCount: number;
  jobsCount: number;
  governorateId: number;
  regionId: number;
  baseLocation: ProviderLocation;
  services: ProviderService[];
  phoneNumbers: string[];
}