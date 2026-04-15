import { useQuery } from "@tanstack/react-query";
import { getMyProviderReviews } from "../api/getMyProviderReviews";
import { useAssignedRequests } from "../../Requests/hooks/useAssignedRequests";

export const useMyProviderReviews = (providerId: number) => {
  const { data: assignedRequests = [] } = useAssignedRequests();

  return useQuery({
    queryKey: ["my-provider-reviews", providerId, assignedRequests.length],
    queryFn: () => getMyProviderReviews(providerId, assignedRequests),
    enabled: !!providerId,
  });
};