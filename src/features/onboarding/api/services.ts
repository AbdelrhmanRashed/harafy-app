import axiosInstance from '@/lib/axios';

export const getServices = async () => {
  try {
    const res = await axiosInstance.get('/api/Services/get-services', {
      params: {
        lang: 'ar',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};
