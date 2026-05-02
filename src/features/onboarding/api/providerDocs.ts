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

export const fetchProviderDocs = async () => {
  const res = await axiosInstance.get('/api/Document/get-documents');
  return res.data;
};

export const updateProviderDocs = async (docId: number, docs: FormData) => {
  try {
    const res = await axiosInstance.put(
      `/api/Document/update-document/${docId}`,
      docs,
    );
    return res.data;
  } catch (error) {
    console.error('Error updating documentation:', error);
    throw error;
  }
};

export const getMyProviderProfile = async () => {
  const res = await axiosInstance.get('/api/Provider/get-my-provider-profile');
  return res.data;
};
