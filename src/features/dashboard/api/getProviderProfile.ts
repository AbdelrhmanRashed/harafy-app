import axiosInstance from '@/lib/axios';

export const getProviderProfile = async () => {
  const res = await axiosInstance.get('/api/Provider/get-my-provider-profile');

  return res.data;
};
