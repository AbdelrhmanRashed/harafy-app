import axiosInstance from '@/lib/axios';

export const updatePost = async (
  postId: number,
  data: { Title: string; Description: string },
) => {
  await axiosInstance.put(`/api/Post/update-post/${postId}`, data);
};
