import { useState, useEffect } from "react";
import type { LatLng } from "../types/types";

async function fetchRoute(from: LatLng, to: LatLng): Promise<LatLng[]> {// Try fetching route from OSRM API
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.routes?.[0]) {
      return data.routes[0].geometry.coordinates.map(
        ([lng, lat]: [number, number]) => ({ lat, lng })
      );
    }
  } catch { /* ignore errors and fallback to straight line */ }
  // fallback: straight line
  return [from, to];// Return an array with just the start and end points if routing fails
}

export function useRoute(from: LatLng | null, to: LatLng | null) {// State for route coordinates and loading status
  const [route, setRoute] = useState<LatLng[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!from || !to) { setRoute([]); return; }
    setLoading(true);
    fetchRoute(from, to)
      .then(setRoute)
      .finally(() => setLoading(false));
  }, [from?.lat, from?.lng, to?.lat, to?.lng]);

  return { route, loading };
}
