import axiosInstance from '@/lib/axios';

export interface PostsParams {
  GovernorateId?: number;
  RegionId?: number;
  Search?: string;
  PageIndex: number;
  PageSize: number;
}

export const getPosts = async (params: PostsParams) => {
  const { data } = await axiosInstance.get('/api/Post/get-recent-posts', {
    params,
  });
  return data;
};
