import { useQuery } from "@tanstack/react-query";
import { getRequestOffer } from "../api/getRequestOffer";

export const useGetRequestOffer = (
  requestId: string | undefined,
  options?: {
    enabled?: boolean;
    refetchInterval?: number | false;
    refetchOnWindowFocus?: boolean;
  },
) => {
  const enabled = !!requestId && (options?.enabled ?? true);
  return useQuery({
    queryKey: ["request-offer", requestId],
    queryFn: () => getRequestOffer(requestId!),
    enabled,
    refetchInterval: options?.refetchInterval,
    refetchOnWindowFocus: options?.refetchOnWindowFocus,
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 404) return false;
      return failureCount < 3;
    },
  });
};
