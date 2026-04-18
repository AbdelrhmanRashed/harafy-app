import { useQuery } from '@tanstack/react-query';
import { getPostReactions } from '../api/getPostReactions';

export const usePostReactions = (postId: number, enabled: boolean) =>
  useQuery({
    queryKey: ['post-reactions', postId],
    queryFn: () => getPostReactions(postId),
    enabled,
    staleTime: 0,
    refetchInterval: 1000 * 10,
  });
