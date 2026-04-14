import axiosInstance from '@/lib/axios';

export const getLiveLocation = (providerId: string) =>
  axiosInstance.get(`/api/LiveLocation/get-live-location/${providerId}`);
