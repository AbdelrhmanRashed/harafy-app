import axiosInstance from "@/lib/axios";
import type { AvailableRequestItem } from "../types/providerOfferTypes";

const BASE_URL = axiosInstance.defaults.baseURL ?? "";

export const getAvailableRequests = async (): Promise<AvailableRequestItem[]> => {
  const res = await axiosInstance.get("/api/ServiceRequest/available-requests");
  return (res.data.data ?? []).map((item: any) => ({
    ...item,
    imageUrls: (item.imageUrls ?? []).map((url: string) =>
      url.startsWith("http") ? url : `${BASE_URL}/${url}`
    ),
    clientPictureUrl: item.clientPictureUrl
      ? `${BASE_URL}/${item.clientPictureUrl}`
      : null,
  }));
};