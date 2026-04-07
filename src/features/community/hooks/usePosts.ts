import { useInfiniteQuery } from '@tanstack/react-query';
import { getPosts, type GetPostsParams } from '../api/getPosts';

export const usePosts = (filters: GetPostsParams) => {
  return useInfiniteQuery({
    queryKey: ['posts', filters],

    queryFn: ({ pageParam }) =>
      getPosts({
        pageParam,
        ...filters,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      const pageSize = 10;

      if (!lastPage?.data) return undefined;

      if (lastPage.data.length < pageSize) {
        return undefined;
      }

      return allPages.length + 1;
    },

    // staleTime: 1000 * 60,
    staleTime: 0,
    // gcTime: 1000 * 60 * 5,

    // retry: 1,
  });
};
