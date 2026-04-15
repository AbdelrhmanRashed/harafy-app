export interface ServiceRequestType {
  id: number;
  requestStatus: number;
  description: string;
  finalPrice: number | null;
  createdAt: string;
  preferredTime: string | null;
  clientId?: number;
  clientName:string;
  clientPictureUrl:string
  providerId: number | null;
  serviceRequestLocation: {
    latitude: number;
    longitude: number;
  };
  serviceId: number;
  imageUrls: string[];
}

export type ProviderOfferStep = "REQUESTS" | "CREATE_OFFER" | "WAITING" | "ACCEPTED" | "REVIEW";
export type CreateOfferPayload = {
  serviceRequestId: number;
  price: number;
  message?: string;
};

export type UpdateOfferPayload = {
  price: number;
  message?: string;
};

export type SubmittedOffer = {
  offerId: number;
  serviceRequestId: number;
  price: number;
  message?: string;
};

export type AvailableRequestItem = ServiceRequestType & {
  clientName?: string;
  clientPictureUrl?: string | null;
  serviceName?: string;
};

export type AssignedRequest = {
  id: number;
  providerId: number;
  requestStatus: number;
  description: string;
  finalPrice: number | null;
  createdAt: string;
  preferredTime: string | null;
  clientName: string;
  clientPictureUrl?: string | null;
  serviceId: number;
  serviceName?: string;
  imageUrls: string[];
  serviceRequestLocation: {
    latitude: number;
    longitude: number;
  } | null;
};

export type ProviderReview = {
  id: number;
  providerId: number;
  serviceRequestId: number;
  rating: number;
  message?: string;
  comment?: string;
  createdAt?: string;
  clientName?: string | null;
  clientPictureUrl?: string | null;
};