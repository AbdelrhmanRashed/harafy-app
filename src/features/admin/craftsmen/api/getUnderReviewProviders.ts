import axiosInstance from '@/lib/axios';

export const getUnderReviewProviders = async () => {
  try {
    const res = await axiosInstance.get('/api/Provider/underReview-providers');
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
