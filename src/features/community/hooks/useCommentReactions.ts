import { useQuery } from '@tanstack/react-query';
import { getCommentReactions } from '../api/getCommentReactions';

export const useCommentReactions = (commentId: number, enabled: boolean) =>
  useQuery({
    queryKey: ['comment-reactions', commentId],
    queryFn: () => getCommentReactions(commentId),
    enabled,
    staleTime: 0,
    refetchInterval: 1000 * 10,
  });
