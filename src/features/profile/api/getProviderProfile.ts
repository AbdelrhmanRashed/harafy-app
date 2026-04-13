import axiosInstance from '@/lib/axios';

export const getProviderProfile = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/Provider/get-provider-profile/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching provider profile:', error);
    throw error;
  }
};
