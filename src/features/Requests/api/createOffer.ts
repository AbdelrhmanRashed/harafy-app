import axiosInstance from "@/lib/axios";
import type { CreateOfferPayload } from "../types/providerOfferTypes";

export type CreateOfferResponse = {
  id?: number;
  offerId?: number;
};

export const createOffer = async (
  payload: CreateOfferPayload
): Promise<CreateOfferResponse> => {
  const res = await axiosInstance.post(
    `/api/RequestOffer/create-offer/${payload.serviceRequestId}`,
    {
      Price: payload.price,
      Message: payload.message ?? null,
    }
  );
  return res.data;
};