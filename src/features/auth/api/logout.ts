import axiosInstance from '@/lib/axios';

export const logout = async () => {
  try {
    await axiosInstance.post('/api/Account/logout');
  } catch (error: any) {
    throw error;
  }
};
