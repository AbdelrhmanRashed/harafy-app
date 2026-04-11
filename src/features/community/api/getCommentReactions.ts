import axiosInstance from '@/lib/axios';

export const getCommentReactions = async (commentId: number) => {
  const { data } = await axiosInstance.get(
    `/api/CommentReaction/comment-reactions/${commentId}`,
  );
  return data;
};
