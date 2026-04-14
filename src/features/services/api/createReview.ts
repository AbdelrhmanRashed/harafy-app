import axios from '@/lib/axios';

export const createReview = async (data: any) => {
  const res = await axios.post('/api/Review/create-review', data);
  return res.data;
};
