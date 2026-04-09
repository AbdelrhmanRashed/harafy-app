import axiosInstance from '@/lib/axios';

export const getPostComments = async (
  postId: number,
  pageIndex = 1,
  pageSize = 10,
) => {
  const { data } = await axiosInstance.get(
    `/api/Comment/get-post-comments/${postId}`,
    {
      params: { PageIndex: pageIndex, PageSize: pageSize },
    },
  );
  return data;
};
