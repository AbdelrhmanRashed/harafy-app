import { useQueryClient } from '@tanstack/react-query';

/**
 * Forces a refetch of the client profile by invalidating the React Query cache.
 * Do NOT write to Zustand here — React Query is the source of truth for profile data.
 */
export const useRefreshUser = () => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey: ['client-profile'] });
};
