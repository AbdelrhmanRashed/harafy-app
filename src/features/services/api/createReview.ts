import axiosInstance from '@/lib/axios';

export const createReview = async (data: {
  ServiceRequestId: number;
  Rating: number;
  Message: string;
}) => {
  try {
    const res = await axiosInstance.post('/api/Review/create-review', data);
    return res.data;
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};
