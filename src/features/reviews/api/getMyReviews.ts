import axiosInstance from "@/lib/axios";
import type { Review } from "../types/reviewTypes";

const BASE_URL = axiosInstance.defaults.baseURL ?? "";

export const getMyReviews = async (serviceRequestId?: number): Promise<Review[]> => {
  const res = await axiosInstance.get("/api/Review/my-reviews");
  const all: Review[] = Array.isArray(res.data)
    ? res.data
    : res.data.data ?? [];

  const mapped = all.map((r) => ({
    ...r,
    clientPictureUrl: r.clientPictureUrl
      ? r.clientPictureUrl.startsWith("http")
        ? r.clientPictureUrl
        : `${BASE_URL}/${r.clientPictureUrl}`
      : undefined,
  }));

  if (serviceRequestId) {
    return mapped.filter((r) => r.serviceRequestId === serviceRequestId);
  }
  return mapped;
};