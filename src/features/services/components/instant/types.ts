export type InstantStep = "REQUEST" | "OFFERS" | "TRACKING";

/** GET /api/RequestOffer/get-request-offers/:id */
export type RequestOfferItem = {
  id: number;
  providerId: number;
  providerName: string;
  providerPictureUrl?: string | null;
  price: number;
  message?: string;
  createdAt?: string;
};
