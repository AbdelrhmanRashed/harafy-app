import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import axiosInstance from "@/lib/axios";

const updateLiveLocation = (coords: { Latitude: number; Longitude: number }) =>
  axiosInstance.put('/api/LiveLocation/update-live-location', coords);

const MIN_UPDATE_INTERVAL_MS = 15000;
const MIN_DISTANCE_METERS = 30;

const getDistanceInMeters = (
  pointA: { lat: number; lng: number },
  pointB: { lat: number; lng: number }
) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const earthRadiusMeters = 6371000;
  const deltaLat = toRad(pointB.lat - pointA.lat);
  const deltaLng = toRad(pointB.lng - pointA.lng);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(toRad(pointA.lat)) *
      Math.cos(toRad(pointB.lat)) *
      Math.sin(deltaLng / 2) *
      Math.sin(deltaLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusMeters * c;
};

export const useLiveLocation = (
  isProvider: boolean,
  // eslint-disable-next-line no-unused-vars
  onLocationUpdate?: (...args: [{ lat: number; lng: number }]) => void
) => {
  const { mutate } = useMutation({
    mutationFn: updateLiveLocation,
  });

  // Keep a ref to the latest callback to avoid unnecessary effect re-runs
  const callbackRef = useRef(onLocationUpdate);
  useEffect(() => {
    callbackRef.current = onLocationUpdate;
  }, [onLocationUpdate]);

  const lastSentAtRef = useRef(0);
  const lastSentPositionRef = useRef<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!isProvider) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        callbackRef.current?.(currentPosition);

        const now = Date.now();
        const lastSentPosition = lastSentPositionRef.current;
        const lastSentAt = lastSentAtRef.current;

        if (now - lastSentAt < MIN_UPDATE_INTERVAL_MS) {
          return;
        }

        if (lastSentPosition) {
          const traveledDistance = getDistanceInMeters(lastSentPosition, currentPosition);
          if (traveledDistance < MIN_DISTANCE_METERS) {
            return;
          }
        }

        lastSentAtRef.current = now;
        lastSentPositionRef.current = currentPosition;

        mutate({
          Latitude: currentPosition.lat,
          Longitude: currentPosition.lng,
        });
      },
      (error) => console.error('Geolocation error:', error),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
      lastSentAtRef.current = 0;
      lastSentPositionRef.current = null;
    };
  }, [isProvider, mutate]);
};