import axiosInstance from '@/lib/axios';

export const getProviderReviews = async (providerId: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/Review/provider-reviews/${providerId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching provider reviews:', error);
    throw error;
  }
};
