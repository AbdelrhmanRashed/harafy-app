import axiosInstance from '@/lib/axios';

export const updateReactToComment = async (
  commentId: number,
  reactionType: number,
) => {
  const { data } = await axiosInstance.put(
    `/api/CommentReaction/react-to-comment/${commentId}`,
    null,
    {
      params: { reaction: reactionType },
    },
  );
  return data;
};
