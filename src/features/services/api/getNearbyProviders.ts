// GET /api/BaseLocation/nearby-providers
// Query: latitude, longitude, radiusKm, serviceId

import axiosInstance from "@/lib/axios";

export const getNearbyProviders = async (
  latitude: string,
  longitude: string,
  serviceId: number,
) => {
  const response = await axiosInstance.get("/api/BaseLocation/nearby-providers", {
    params: {
      latitude,
      longitude,
      radiusKm: 10,
      serviceId,
    },
  });
  return response.data;
};
