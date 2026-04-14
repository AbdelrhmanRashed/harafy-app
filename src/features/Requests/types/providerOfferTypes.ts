export interface ServiceRequestType {
  id: number;
  requestStatus: number;
  description: string;
  finalPrice: number | null;
  createdAt: string;
  preferredTime: string | null;
  clientId?: number;
  clientName:string;
  clientPictureUrl:string;
  providerId: number | null;
  serviceRequestLocation: {
    latitude: number;
    longitude: number;
  };
  serviceId: number;
  imageUrls: string[];
}

export type ProviderOfferStep = "REQUESTS" | "CREATE_OFFER" | "WAITING";

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