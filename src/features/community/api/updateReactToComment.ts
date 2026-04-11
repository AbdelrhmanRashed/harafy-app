import axiosInstance from '@/lib/axios';

export const updateReactToComment = async (
  commentId: number,
  reactionType: number,
) => {
  const response = await axiosInstance.put(
    `/api/CommentReaction/react-to-comment/${commentId}`,
    {
      reactionType,
    },
  );
  return response.data;
};
