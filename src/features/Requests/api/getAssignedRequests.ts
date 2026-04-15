import axiosInstance from "@/lib/axios";
import type { AssignedRequest } from "../types/providerOfferTypes";

const BASE_URL = axiosInstance.defaults.baseURL ?? "";

export const getAssignedRequests = async (inProgressStatus = false): Promise<AssignedRequest[]> => {
  const res = await axiosInstance.get("/api/ServiceRequest/my-assigned-requests", {
    params: { inProgressStatus },
  });

  const data: AssignedRequest[] = Array.isArray(res.data)
    ? res.data
    : res.data.data ?? [];

  return data.map((item) => ({
    ...item,
    clientPictureUrl: item.clientPictureUrl
      ? item.clientPictureUrl.startsWith("http")
        ? item.clientPictureUrl
        : `${BASE_URL}/${item.clientPictureUrl}`
      : null,
  }));
};