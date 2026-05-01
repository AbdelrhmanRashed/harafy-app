import axiosInstance from '@/lib/axios';

interface IBannedUser {
  name: string;
  pictureUrl: string;
  providerId: number;
  startedAt: string;
}

export const getAllBannedUsers = async (): Promise<IBannedUser[]> => {
  try {
    const res = await axiosInstance.get('/api/Report/banned-providers-expired');
    return res.data;
  } catch (error) {
    throw error;
  }
};
