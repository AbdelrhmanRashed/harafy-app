    // /api/BaseLocation/nearby-providers
    // Parameters: latitude, longitude, radiusKm, serviceId
    // Returns: List of nearby providers
    import { useQuery } from "@tanstack/react-query";
    import { getNearbyProviders } from "../api/getNearbyProviders";
    
    export const useGetNearbyProviders = (latitude: string, longitude: string, serviceId: number) => {
        return useQuery({
            queryKey: ['nearby-providers', latitude, longitude, serviceId],
            queryFn: () => getNearbyProviders(latitude, longitude, serviceId),
            
            enabled: !!latitude && !!longitude && serviceId !== 0 
        });
    };