// hooks/useLocation.ts
import { useState, useEffect } from 'react';
import type { LatLng } from '../types/types';
import { DEFAULT_CENTER } from '../types/constants';

interface UseLocationReturn {
  position: LatLng;
  setPosition: (pos: LatLng) => void;
  address: string;
  locating: boolean;
  denied: boolean;
  detect: () => void;
  searchAddress: (query: string) => void;
}

// This hook manages the user's location, including auto-detection, manual updates, and address resolution.
async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ar`,
    );
    const data = await res.json();
    return data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  } catch {
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  }
}

function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 8000,
    }),
  );
}

export function useLocation(): UseLocationReturn {
  const [position, setPosition] = useState<LatLng>(DEFAULT_CENTER);
  const [address, setAddress] = useState('جاري تحديد الموقع...');
  const [locating, setLocating] = useState(false);
  const [denied, setDenied] = useState(false);

  async function detect() {
    if (!('geolocation' in navigator)) return;
    setLocating(true);
    try {
      const pos = await getCurrentPosition();
      const { latitude: lat, longitude: lng } = pos.coords;
      setPosition({ lat, lng });
      setDenied(false);
      const addr = await reverseGeocode(lat, lng);
      setAddress(addr);
    } catch (err: any) {
      if (err?.code === 1) setDenied(true);
    } finally {
      setLocating(false);
    }
  }
  async function updatePosition(pos: LatLng) {
    setPosition(pos);
    const addr = await reverseGeocode(pos.lat, pos.lng);
    setAddress(addr);
  }
  async function searchAddress(query: string) {
    if (!query) return;
    setLocating(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`,
      );
      const data = await res.json();
      if (data[0]) {
        const pos = {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        };
        setPosition(pos);
        setAddress(data[0].display_name);
      }
    } catch {
      /** */
    } finally {
      setLocating(false);
    }
  }

  // auto-detect on mount
  // useEffect(() => { detect(); }, []);

  return {
    position,
    setPosition: updatePosition,
    address,
    locating,
    denied,
    detect,
    searchAddress,
  };
}
