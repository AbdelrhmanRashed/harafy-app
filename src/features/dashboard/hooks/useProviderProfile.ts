import { useQuery } from "@tanstack/react-query";
import { getProviderProfile } from "../api/getProviderProfile";

export const useProviderProfile = () => {
  return useQuery({
    queryKey: ["provider-profile"],
    queryFn: getProviderProfile,
    staleTime: Infinity,
  });
};