export interface RequestOfferDTO {
  id: number;
  providerId: number;
  providerName: string;
  providerPictureUrl: string | null;
  price: number;
  message: string;
  createdAt: string;
}
