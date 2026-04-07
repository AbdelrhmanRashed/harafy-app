import axiosInstance from '@/lib/axios';

export interface GetPostsParams {
  pageParam?: number;
  governorateId?: number;
  regionId?: number;
  search?: string;
}

export const getPosts = async ({
  pageParam = 1,
  governorateId,
  regionId,
  search,
}: GetPostsParams) => {
  const params: any = {
    PageIndex: pageParam,
    PageSize: 10,
  };

  if (governorateId) params.GovernorateId = governorateId;
  if (regionId) params.RegionId = regionId;
  if (search) params.Search = search;

  const res = await axiosInstance.get('/api/Post/get-recent-posts', {
    params,
  });

  return res.data;
};
