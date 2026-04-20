import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getAvailableRequests } from "../api/getAvailableRequests";
import type { AvailableRequestItem } from "../types/providerOfferTypes";

export const useGetAvailableRequests = (
  services?: { id: number; name: string }[],
  options?: Partial<UseQueryOptions<AvailableRequestItem[], Error>>
) => {
  return useQuery<AvailableRequestItem[], Error>({
    queryKey: ["available-requests"],
    queryFn: () => getAvailableRequests(services),
    ...options,
  });
};