// /api/BaseLocation/nearby-providers
// Query Params
    // /api/BaseLocation/nearby-providers

import axiosInstance from "@/lib/axios";
    export const getNearbyProviders = async (latitude: string, longitude: string, serviceId: number) => {
    const response = await axiosInstance.get('/api/ServiceRequest/available-requests', {
  params: {
    latitude: latitude,
    longitude: longitude,
    radius: 10,
    serviceId: serviceId
  }
});
    return response.data;
}

