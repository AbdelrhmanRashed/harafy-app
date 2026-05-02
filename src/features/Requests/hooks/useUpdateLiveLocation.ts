import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import axiosInstance from "@/lib/axios";

const updateLiveLocation = (coords: { Latitude: number; Longitude: number }) =>
  axiosInstance.put('/api/LiveLocation/update-live-location', coords);

export const useLiveLocation = (
  isProvider: boolean,
  onLocationUpdate?: (pos: { lat: number; lng: number }) => void
) => {

  const { mutate } = useMutation({
    mutationFn: updateLiveLocation,
  });

  // Keep a ref to the latest callback to avoid unnecessary effect re-runs
  const callbackRef = useRef(onLocationUpdate);
  useEffect(() => {
    callbackRef.current = onLocationUpdate;
  }, [onLocationUpdate]);

 useEffect(() => {
  if (!isProvider) return;

  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      mutate({
        Latitude: position.coords.latitude,
        Longitude: position.coords.longitude,
      });
      callbackRef.current?.({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    },
    (error) => console.error('Geolocation error:', error),
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );

  return () => navigator.geolocation.clearWatch(watchId);
}, [isProvider, mutate]);
};