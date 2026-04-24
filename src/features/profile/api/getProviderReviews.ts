import axiosInstance from '@/lib/axios';

export const getProviderReviews = async (
  providerId?: string,
  type?: 'client' | 'provider',
) => {
  try {
    let response;
    if (type === 'client' && providerId) {
      response = await axiosInstance.get(
        `/api/Review/provider-reviews/${providerId}`,
      );
    }

    if (type === 'provider') {
      response = await axiosInstance.get(`/api/Review/my-reviews`);
    }
    return response?.data;
  } catch (error) {
    console.error('Error fetching provider reviews:', error);
    throw error;
  }
};
