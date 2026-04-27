import { useQuery } from "@tanstack/react-query";
import { getProviderHisProfile } from "../api/getProviderHisProfile";
import type { ProviderProfile } from "../types/providerProfileTypes";

export const useGetProviderHisProfile = () =>
  useQuery<ProviderProfile>({
    queryKey: ["provider-his-profile"],
    queryFn: getProviderHisProfile,
  });