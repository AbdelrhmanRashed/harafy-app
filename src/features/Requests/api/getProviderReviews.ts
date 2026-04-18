import axiosInstance from "@/lib/axios";
import type { ProviderReview } from "../types/providerOfferTypes";

export const getProviderReviews = async (
  serviceRequestId?: number
): Promise<ProviderReview[]> => {
  const res = await axiosInstance.get(`/api/Review/my-reviews =`);
  const all: ProviderReview[] = Array.isArray(res.data)
    ? res.data
    : res.data.data ?? [];

  if (serviceRequestId) {
    return all.filter((r) => r.serviceRequestId === serviceRequestId);
  }
  return all;
};