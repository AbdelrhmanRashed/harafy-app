import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import axiosInstance from '@/lib/axios';

const updateLiveLocation = (coords: { Latitude: number; Longitude: number }) =>
  axiosInstance.put('/api/LiveLocation/update-live-location', coords);

// Haversine — بترجع المسافة بالمتر بين نقطتين
function getDistanceMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const MIN_DISTANCE_METERS = 10; // ما تبعتش لو أقل من 10 متر
const MIN_INTERVAL_MS = 5000; // ما تبعتش أكتر من مرة كل 5 ثواني

export const useLiveLocation = (
  isProvider: boolean,
  onLocationUpdate?: (pos: { lat: number; lng: number }) => void,
) => {
  const { mutate } = useMutation({ mutationFn: updateLiveLocation });

  const callbackRef = useRef(onLocationUpdate);
  const lastPosRef = useRef<{ lat: number; lng: number } | null>(null);
  const lastSentAtRef = useRef<number>(0);

  useEffect(() => {
    callbackRef.current = onLocationUpdate;
  }, [onLocationUpdate]);

  useEffect(() => {
    if (!isProvider) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        const now = Date.now();

        // --- فلتر المسافة ---
        if (lastPosRef.current) {
          const dist = getDistanceMeters(
            lastPosRef.current.lat,
            lastPosRef.current.lng,
            lat,
            lng,
          );
          if (dist < MIN_DISTANCE_METERS) return;
        }

        // --- فلتر الوقت ---
        if (now - lastSentAtRef.current < MIN_INTERVAL_MS) return;

        // تحديث الـ refs
        lastPosRef.current = { lat, lng };
        lastSentAtRef.current = now;

        // API call
        mutate({ Latitude: lat, Longitude: lng });

        // callback للـ UI
        callbackRef.current?.({ lat, lng });
      },
      (error) => console.error('Geolocation error:', error),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [isProvider, mutate]);
};
