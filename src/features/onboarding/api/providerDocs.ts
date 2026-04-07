import axiosInstance from '@/lib/axios';

export const uploadDocumentation = async (documentation: FormData) => {
  try {
    const res = await axiosInstance.post(
      '/api/Document/upload-document',
      documentation,
    );
    return res.data;
  } catch (error) {
    console.error('Error uploading documentation:', error);
    throw error;
  }
};

export const updateProviderProfile = async (profile: any) => {
  const res = await axiosInstance.patch(
    '/api/Provider/update-provider-profile',
    profile,
  );

  return res.data;
};
