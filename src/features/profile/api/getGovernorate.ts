import axiosInstance from '@/lib/axios';

export const getGovernorate = async () => {
  const res = await axiosInstance.get(
    '/api/Governorate/GovernorateWithRegions',
    {
      params: {
        lang: 'ar',
      },
    },
  );
  return res.data;
};
