import axiosInstance from "@/lib/axios";

export type ProviderProfile = {
  id: number;
  userId: string;
  bio?: string | null;
  yearsOfExperience?: number | null;
  isAvailable?: boolean;
};

export const getProviderProfile = async (): Promise<ProviderProfile> => {
  const res = await axiosInstance.get("/api/Provider/get-my-provider-profile");
  return res.data;
};