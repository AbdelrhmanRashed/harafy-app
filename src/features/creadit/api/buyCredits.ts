import axiosInstance from '@/lib/axios';
import axios from 'axios';

interface BuyCreditsResponse {
  clientSecret: string;
}

export const buyCredits = async (credits: number): Promise<BuyCreditsResponse> => {
  try {
    const response = await axiosInstance.post<BuyCreditsResponse>('/api/payment/buy-credits', {
      credits,
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error('[buyCredits] status:', err.response?.status);
      console.error('[buyCredits] body:', JSON.stringify(err.response?.data, null, 2));
    }
    throw err;
  }
};
