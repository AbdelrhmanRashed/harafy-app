import { useMyProviderProfile } from './useMyProviderProfile';

export const useCurrentProviderId = (): number => {
  const { data } = useMyProviderProfile();
  return data?.id ?? 0;
};
