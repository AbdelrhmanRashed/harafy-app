import axiosInstance from '@/lib/axios';

export const deleteAccount = async () => {
  try {
    const response = await axiosInstance.delete('/api/Account/delete-account');
    return response.data;
  } catch (error) {
    console.error('Error deleting account:', error);
    throw error;
  }
};
