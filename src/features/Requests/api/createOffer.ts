import axiosInstance from "@/lib/axios";
import type { CreateOfferPayload } from "../types/providerOfferTypes";

export const createOffer = async (payload: CreateOfferPayload) => {
  const res = await axiosInstance.post(
    `/api/RequestOffer/create-offer/${payload.serviceRequestId}`,
    {
      Price: payload.price,
      Message: payload.message ?? null,
    }
  );
  return res.data;
};