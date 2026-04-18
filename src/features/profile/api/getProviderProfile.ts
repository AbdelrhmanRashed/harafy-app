// api/getProviderProfile.ts
import axiosInstance from "@/lib/axios";
import type { ProviderProfile } from "../types/providerProfileTypes";

const BASE_URL = axiosInstance.defaults.baseURL ?? "";

export const getProviderProfile = async (): Promise<ProviderProfile> => {
  const { data } = await axiosInstance.get("/api/Provider/get-my-provider-profile");
  return {
    ...data,
    pictureUrl: data.pictureUrl
      ? data.pictureUrl.startsWith("http")
        ? data.pictureUrl
        : `${BASE_URL}/${data.pictureUrl}`
      : null,
  };
};