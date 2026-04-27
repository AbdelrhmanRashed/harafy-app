import axiosInstance from "@/lib/axios";

export type MyOffer = {
  id: number;
  serviceRequestId: number;
  price: number;
  message: string;
  createdAt: string;
};

export const getMyOffers = async (): Promise<MyOffer[]> => {
  const res = await axiosInstance.get("/api/RequestOffer/my-offers");
  return Array.isArray(res.data) ? res.data : res.data?.data ?? [];
};