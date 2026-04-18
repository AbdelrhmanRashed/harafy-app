import { useProviderProfile } from "./useProviderProfile";

export const useCurrentProviderId = (): number => {
  const { data } = useProviderProfile();
  console.log("provider profile:", data);
  return data?.id ?? 0;
};