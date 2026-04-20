import axiosInstance from "@/lib/axios";
import type { AvailableRequestItem } from "../types/providerOfferTypes";

const BASE_URL = axiosInstance.defaults.baseURL ?? "";

export const getAvailableRequests = async (
  services?: { id: number; name: string }[]
): Promise<AvailableRequestItem[]> => {
  const res = await axiosInstance.get("/api/ServiceRequest/available-requests");

  console.log("raw response:", res.data); // ← add this

  const list = res.data.data ?? [];

  console.log("list length:", list.length); // ← add this

  return list.map((item: any) => ({
    ...item,
    hasOffer: item.hasOffer ?? false,
    offerId: item.offerId ?? null,
    serviceName: services?.find((s) => s.id === item.serviceId)?.name ?? null,
    clientName: item.clientName ?? null,
    clientPictureUrl: item.clientPictureUrl
      ? `${BASE_URL}/${item.clientPictureUrl}`
      : null,
    imageUrls: (item.imageUrls ?? []).map((url: string) =>
      url.startsWith("http") ? url : `${BASE_URL}/${url}`
    ),
  }));
};