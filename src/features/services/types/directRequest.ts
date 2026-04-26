export interface DirectRequestDetails {
  clientId: number;
  createdAt: string;
  description: string;
  finalPrice: number | null;
  id: number;
  imageUrls: string[];
  preferredTime: string | null;
  providerId: number;
  requestStatus: number;
  serviceId: number;
  serviceRequestLocation: { latitude: number; longitude: number };
  reviewId?: number;
}
