import axiosInstance from '@/lib/axios';

export const logout = async () => {
  try {
    await axiosInstance.post('/Account/logout');
  } catch (error: any) {
    throw error;
  }
};
