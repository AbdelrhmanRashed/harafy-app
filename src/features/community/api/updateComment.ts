import axiosInstance from '@/lib/axios';

export const updateComment = async (commentId: number, Message: string) => {
  await axiosInstance.put(`/api/Comment/update-comment/${commentId}`, {
    Message,
  });
};
