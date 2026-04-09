import { useInfiniteQuery } from '@tanstack/react-query';
import { getPostComments } from '../api/getPostComments';

export const usePostComments = (postId: number, enabled: boolean) => {
  return useInfiniteQuery({
    queryKey: ['post-comments', postId],
    queryFn: ({ pageParam = 1 }) => getPostComments(postId, pageParam),
    getNextPageParam: (lastPage) => {
      const totalPages = Math.ceil(lastPage.count / 10);
      return lastPage.pageIndex < totalPages
        ? lastPage.pageIndex + 1
        : undefined;
    },
    initialPageParam: 1,
    enabled, // enabled when the user opens the comments
    staleTime: 1000 * 30, // 30 seconds
  });
};
