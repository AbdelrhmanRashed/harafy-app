import axiosInstance from '@/lib/axios';

export const getStatus = async () => {
  const { data } = await axiosInstance.get('/api/Account/account-status');
  return data;
};
