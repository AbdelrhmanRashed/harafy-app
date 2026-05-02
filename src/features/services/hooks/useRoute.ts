import { useState, useEffect } from 'react';
import type { LatLng } from '../types/types';

// Haversine formula to calculate straight-line distance in meters
function getStraightLineDistance(from: LatLng, to: LatLng): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (from.lat * Math.PI) / 180;
  const φ2 = (to.lat * Math.PI) / 180;
  const Δφ = ((to.lat - from.lat) * Math.PI) / 180;
  const Δλ = ((to.lng - from.lng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

async function fetchRoute(from: LatLng, to: LatLng): Promise<{ route: LatLng[], distance: number, duration: number }> {
  // Try fetching route from OSRM API
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.routes?.[0]) {
      const distance = data.routes[0].distance; // in meters
      const duration = data.routes[0].duration; // in seconds
      const route = data.routes[0].geometry.coordinates.map(
        ([lng, lat]: [number, number]) => ({ lat, lng }),
      );
      return { route, distance, duration };
    }
  } catch {
    /* ignore errors and fallback to straight line */
  }
  // fallback: straight line
  const straightDistance = getStraightLineDistance(from, to);
  const estimatedDuration = (straightDistance / 1000 / 30) * 3600; // Assume 30 km/h average speed -> seconds
  return { route: [from, to], distance: straightDistance, duration: estimatedDuration };
}

export function useRoute(from: LatLng | null, to: LatLng | null) {
  // State for route coordinates and loading status
  const [routeData, setRouteData] = useState<{ route: LatLng[], distance: number, duration: number }>({ route: [], distance: 0, duration: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!from || !to) {
      setRouteData({ route: [], distance: 0, duration: 0 });
      return;
    }

    const controller = new AbortController();

    setLoading(true);

    fetchRoute(from, to)
      .then((data) => {
        if (!controller.signal.aborted) {
          setRouteData(data);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [from?.lat, from?.lng, to?.lat, to?.lng]);

  return { ...routeData, loading };
}
