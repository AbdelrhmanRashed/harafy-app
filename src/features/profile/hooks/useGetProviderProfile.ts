import { useQuery } from "@tanstack/react-query";
import { getProviderProfile } from "../api/getProviderProfile";
import type { ProviderProfile } from "../types/providerProfileTypes";

export const useGetProviderProfile = () =>
  useQuery<ProviderProfile>({
    queryKey: ["provider-profile"],
    queryFn: getProviderProfile,
  });