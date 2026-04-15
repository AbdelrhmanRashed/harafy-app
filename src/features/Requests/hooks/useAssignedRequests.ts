import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getAssignedRequests } from "../api/getAssignedRequests";
import type { AssignedRequest } from "../types/providerOfferTypes";

export const useAssignedRequests = (
  inProgressStatus = false,
  options?: Partial<UseQueryOptions<AssignedRequest[], Error>>
) => {
  return useQuery<AssignedRequest[], Error>({
    queryKey: ["assigned-requests", inProgressStatus],
    queryFn: () => getAssignedRequests(inProgressStatus),
    refetchInterval: 10_000,
    ...options,
  });
};