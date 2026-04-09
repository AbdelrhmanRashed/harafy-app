import axiosInstance from '@/lib/axios';

export const deletePost = async (postId: number) => {
  await axiosInstance.delete(`/api/Post/delete-post/${postId}`);
};
