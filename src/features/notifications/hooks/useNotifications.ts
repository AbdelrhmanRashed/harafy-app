// hooks/useNotifications.ts
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { getNotifications, markAsReadApi } from '../api/getNotifications';

export const useNotifications = () => {
  return useInfiniteQuery({
    queryKey: ['notifications'],

    initialPageParam: 1,

    queryFn: async ({ pageParam }) => {
      const res = await getNotifications(pageParam as number);
      return res.data;
    },

    getNextPageParam: (lastPage, pages) => {
      const totalPages = Math.ceil(lastPage.count / lastPage.pageSize);

      return pages.length < totalPages ? pages.length + 1 : undefined;
    },
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: number[]) => markAsReadApi(ids),

    onMutate: (ids) => {
      queryClient.setQueryData(['notifications'], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            data: page.data.map((n: any) =>
              ids.includes(n.id) ? { ...n, isRead: true } : n,
            ),
          })),
        };
      });
    },
  });
};
