import axiosInstance from '@/lib/axios';

export const addComment = async (postId: number, message: string) => {
  const { data } = await axiosInstance.post('/api/Comment/add-comment', {
    PostId: postId,
    Message: message,
  });
  return data;
};
