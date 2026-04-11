import axiosInstance from '@/lib/axios';

export const getPostReactions = async (postId: number) => {
  const { data } = await axiosInstance.get(
    `/api/PostReaction/post-reactions/${postId}`,
  );
  return data;
};
