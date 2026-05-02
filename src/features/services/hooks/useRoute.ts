import { useState, useEffect, useRef } from 'react';
import type { LatLng } from '../types/types';

// ── Haversine ──────────────────────────────────────────────────
function getDistanceMeters(from: LatLng, to: LatLng): number {
  const R = 6371e3;
  const φ1 = (from.lat * Math.PI) / 180;
  const φ2 = (to.lat * Math.PI) / 180;
  const Δφ = ((to.lat - from.lat) * Math.PI) / 180;
  const Δλ = ((to.lng - from.lng) * Math.PI) / 180;
  const a =
    Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ── OSRM fetch ─────────────────────────────────────────────────
async function fetchRoute(
  from: LatLng,
  to: LatLng,
): Promise<{ route: LatLng[]; distance: number; duration: number }> {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.routes?.[0]) {
      return {
        distance: data.routes[0].distance,
        duration: data.routes[0].duration,
        route: data.routes[0].geometry.coordinates.map(
          ([lng, lat]: [number, number]) => ({ lat, lng }),
        ),
      };
    }
  } catch {}
  // fallback: straight line
  const distance = getDistanceMeters(from, to);
  return {
    route: [from, to],
    distance,
    duration: (distance / 1000 / 30) * 3600,
  };
}

// ── Config ─────────────────────────────────────────────────────
const MIN_FETCH_DISTANCE_M = 50; // دون 50م → مفيش fetch
const DEBOUNCE_MS = 800; // استنى 800ms قبل الـ fetch

// ── Hook ───────────────────────────────────────────────────────
export function useRoute(from: LatLng | null, to: LatLng | null) {
  const [routeData, setRouteData] = useState<{
    route: LatLng[];
    distance: number;
    duration: number;
  }>({ route: [], distance: 0, duration: 0 });
  const [loading, setLoading] = useState(false);

  // آخر نقطة اتعمل عليها fetch فعلي
  const lastFetchFromRef = useRef<LatLng | null>(null);
  const lastFetchToRef = useRef<LatLng | null>(null);

  useEffect(() => {
    if (!from || !to) {
      setRouteData({ route: [], distance: 0, duration: 0 });
      return;
    }

    // ── Distance gate ──────────────────────────────────────────
    // لو الـ from أو to اتحرك أقل من 50م من آخر fetch → skip
    const fromMoved = lastFetchFromRef.current
      ? getDistanceMeters(lastFetchFromRef.current, from)
      : Infinity;

    const toMoved = lastFetchToRef.current
      ? getDistanceMeters(lastFetchToRef.current, to)
      : Infinity;

    if (fromMoved < MIN_FETCH_DISTANCE_M && toMoved < MIN_FETCH_DISTANCE_M) {
      return;
    }

    // ── Debounce ───────────────────────────────────────────────
    // لو جه تغيير تاني قبل الـ 800ms → cancel الـ timeout القديم
    const controller = new AbortController();

    const timerId = setTimeout(async () => {
      setLoading(true);

      try {
        const data = await fetchRoute(from, to);

        if (!controller.signal.aborted) {
          // حفظ النقاط الى اتعمل fetch عليهم
          lastFetchFromRef.current = from;
          lastFetchToRef.current = to;
          setRouteData(data);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timerId);
      controller.abort();
    };
  }, [from?.lat, from?.lng, to?.lat, to?.lng]);

  return { ...routeData, loading };
}
