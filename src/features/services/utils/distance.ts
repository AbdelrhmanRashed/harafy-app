import type { LatLng } from "../pages/instant/types";

/**
 * Calculates the distance between two points on Earth using the Haversine formula.
 * @param pos1 - First coordinate (e.g., Customer)
 * @param pos2 - Second coordinate (e.g., Provider)
 * @returns Distance in Kilometers rounded to 1 decimal place.
 */
export function calculateDistance(pos1: LatLng, pos2: LatLng): number {
  const R = 6371; // Earth's radius in KM
  const dLat = (pos2.lat - pos1.lat) * (Math.PI / 180);
  const dLng = (pos2.lng - pos1.lng) * (Math.PI / 180);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(pos1.lat * (Math.PI / 180)) *
      Math.cos(pos2.lat * (Math.PI / 180)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
      
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return parseFloat(distance.toFixed(1));
}

/**
 * Filters and sorts providers based on their distance from a center point.
 * @param providers - List of all providers
 * @param center - The reference point (Customer location)
 * @param maxDistance - Maximum radius in KM
 */
export function getNearbyProviders<T extends { position: LatLng }>(
  providers: T[],
  center: LatLng,
  maxDistance: number = 10
) {
  return providers
    .map((p) => ({// Add distance to each provider
      ...p,
      distance: calculateDistance(center, p.position),
    }))
    .filter((p) => p.distance <= maxDistance)// Filter out providers beyond the max distance
    .sort((a, b) => a.distance - b.distance);// Sort by distance (closest first)
}