import axiosInstance from '@/lib/axios';

export const addPost = async (formData: FormData) => {
  try {
    const res = await axiosInstance.post('/api/Post/add-post', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  } catch (error) {
    console.error('Error adding post:', error);
    throw error;
  }
};
