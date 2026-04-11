    import { useQuery } from "@tanstack/react-query";
    import { getRequestOffer } from "../api/getRequestOffer";
    
    export const useGetRequestOffer = (requestId: string) => {
        return useQuery({
            queryKey: ['request-offer', requestId],
            queryFn: () => getRequestOffer(requestId),
            enabled: !!requestId,
        });
    };