import axiosInstance from "@/lib/axios";
import type { UpdateOfferPayload } from "../types/providerOfferTypes";
 
export const updateOffer = async ({ id, ...payload }: UpdateOfferPayload & { id: number }) => {
  const res = await axiosInstance.put(`/api/RequestOffer/update-offer/${id}`, payload);
  return res.data;
};