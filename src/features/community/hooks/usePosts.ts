import { useInfiniteQuery } from '@tanstack/react-query';
import { getPosts } from '../api/getPosts';

interface UsePostsOptions {
  search?: string;
  governorateId?: number;
  regionId?: number;
}

const PAGE_SIZE = 10;

export const usePosts = ({
  search,
  governorateId,
  regionId,
}: UsePostsOptions) => {
  return useInfiniteQuery({
    queryKey: ['posts', { search, governorateId, regionId }],
    queryFn: ({ pageParam = 1 }) =>
      getPosts({
        PageIndex: pageParam,
        PageSize: PAGE_SIZE,
        Search: search || undefined,
        GovernorateId: governorateId,
        RegionId: regionId,
      }),
    getNextPageParam: (lastPage) => {
      const totalPages = Math.ceil(lastPage.count / PAGE_SIZE);
      if (lastPage.pageIndex < totalPages) {
        return lastPage.pageIndex + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};
