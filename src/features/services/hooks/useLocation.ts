// hooks/useLocation.ts
import { useState } from 'react';
import type { LatLng } from '../types/types';
import { DEFAULT_CENTER } from '../types/constants';

interface LocationResult {
  position: LatLng;
  address: string;
}

interface UseLocationReturn {
  position: LatLng;
  setPosition(pos: LatLng): Promise<LocationResult>;
  address: string;
  locating: boolean;
  denied: boolean;
detect(): Promise<LocationResult | null>;
searchAddress(query: string): Promise<LocationResult | null>;

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

export function useLocationCustom(): UseLocationReturn {
  const [position, setPosition] = useState<LatLng>(DEFAULT_CENTER);
  const [address, setAddress] = useState('جاري تحديد الموقع...');
  const [locating, setLocating] = useState(false);
  const [denied, setDenied] = useState(false);

  async function detect(): Promise<LocationResult | null> {
    if (!('geolocation' in navigator)) return null;
    setLocating(true);
    try {
      const pos = await getCurrentPosition();
      const { latitude: lat, longitude: lng } = pos.coords;
      const addr = await reverseGeocode(lat, lng);
      const nextPosition = { lat, lng };
      setPosition(nextPosition);
      setDenied(false);
      setAddress(addr);
      return { position: nextPosition, address: addr };
    } catch (err: unknown) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        err.code === 1
      ) {
        setDenied(true);
      }
      return null;
    } finally {
      setLocating(false);
    }
  }
  async function updatePosition(pos: LatLng): Promise<LocationResult> {
    setPosition(pos);
    const addr = await reverseGeocode(pos.lat, pos.lng);
    setAddress(addr);
    return { position: pos, address: addr };
  }
  async function searchAddress(query: string): Promise<LocationResult | null> {
    if (!query.trim()) return null;
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
        return {
          position: pos,
          address: data[0].display_name,
        };
      }
      return null;
    } catch {
      return null;
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
