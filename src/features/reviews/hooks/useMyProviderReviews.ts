import { useQuery } from "@tanstack/react-query";
import { getMyProviderReviews } from "../api/getMyProviderReviews";
import { useCurrentProviderId } from "../../dashboard/hooks/useCurrentProviderId";

export const useMyProviderReviews = () => {
  const providerId = useCurrentProviderId();

  return useQuery({
    queryKey: ["my-provider-reviews", providerId],
    queryFn: () => getMyProviderReviews(providerId),
    enabled: providerId > 0,
  });
};