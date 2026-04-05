import axiosInstance from '@/lib/axios';

export const updateClientProfile = async (
  formData: FormData,
): Promise<void> => {
  await axiosInstance.put('/api/Client/update-client-profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
