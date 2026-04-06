import { useQuery } from '@tanstack/react-query';
import { getClientProfile } from '../api/getClientProfile';

/**
 * Fetches the client profile from the server.
 * This is the single source of truth for profile data — nothing is written to Zustand.
 */
export const useClientProfile = () =>
  useQuery({
    queryKey: ['client-profile'],
    queryFn: getClientProfile,
  });
