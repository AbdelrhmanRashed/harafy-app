import axiosInstance from '@/lib/axios';

export const reinstateProvider = async (providerId: number) => {
  const res = await axiosInstance.put(`/api/Report/reinstate-provider/${providerId}`);
  return res.data;
};
