import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getProviderReviews } from "../api/getProviderReviews";
import type { ProviderReview } from "../types/providerOfferTypes";
import { useCurrentProviderId } from "../../dashboard/hooks/useCurrentProviderId";

export const useProviderReviews = (
  serviceRequestId: number,
  options?: Partial<UseQueryOptions<ProviderReview[], Error>>
) => {
  const providerId = useCurrentProviderId();

  return useQuery<ProviderReview[], Error>({
    queryKey: ["provider-reviews", providerId, serviceRequestId],
    queryFn: () => getProviderReviews(providerId, serviceRequestId),
    enabled: !!providerId && !!serviceRequestId,
    ...options,
  });
};