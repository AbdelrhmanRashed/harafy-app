import axiosInstance from '@/lib/axios';

export const updateReactToPost = async (
  postId: number,
  reactionType: number,
) => {
  const { data } = await axiosInstance.put(
    `/api/PostReaction/react-to-post/${postId}`,
    null,
    {
      params: { reaction: reactionType },
    },
  );
  return data;
};
