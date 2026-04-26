import axiosInstance from '@/lib/axios';

export const updateReview = async (
  reviewId: number,
  data: {
    Rating: number;
    Message: string;
  },
) => {
  try {
    const res = await axiosInstance.put(`/api/Review/update-review/${reviewId}`, data);
    return res.data;
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
};
