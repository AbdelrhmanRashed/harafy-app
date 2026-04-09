import axiosInstance from '@/lib/axios';

export const deleteComment = async (commentId: number) => {
  await axiosInstance.delete(`/api/Comment/delete-comment/${commentId}`);
};
