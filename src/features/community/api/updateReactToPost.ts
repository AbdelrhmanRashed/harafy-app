import axiosInstance from '@/lib/axios';

export const updateReactToPost = (postId: number, reactionType: number) => {
  return axiosInstance.put(`/api/PostReaction/react-to-post/${postId}`, {
    reactionType,
  });
};
