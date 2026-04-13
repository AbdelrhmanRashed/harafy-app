import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getProviderReviews } from "../api/getProviderReviews";

export const useGetProviderData = (id: string | null | undefined, options?: Partial<UseQueryOptions<any, Error>>) => {
    return useQuery({
        queryKey: ['provider-reviews', id],
        queryFn: () => getProviderReviews(id!),
        enabled: !!id,
        ...options,
    });
};
