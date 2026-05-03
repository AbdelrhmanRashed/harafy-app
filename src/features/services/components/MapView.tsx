import { useEffect, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvents,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { customerIcon, workerIcon } from '../utils/mapIcons.ts';
import type { LatLng, Provider } from '../types/types.ts';
import LoadingSpinner from '@/components/shared/LoadingSpinner.tsx';
import { Search, X } from 'lucide-react';

// ─── Haversine ────────────────────────────────────────────────
function getDistanceMeters(a: LatLng, b: LatLng): number {
  const R = 6371e3;
  const φ1 = (a.lat * Math.PI) / 180;
  const φ2 = (b.lat * Math.PI) / 180;
  const Δφ = ((b.lat - a.lat) * Math.PI) / 180;
  const Δλ = ((b.lng - a.lng) * Math.PI) / 180;
  const x =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

const CENTER_MOVE_THRESHOLD_M = 20;
const LIVE_UPDATE_INTERVAL_MS = 5000;

// ─── Map click handler ────────────────────────────────────────
function MapClickHandler({
  onLocationSelect,
}: {
  onLocationSelect: (pos: LatLng) => void;
}) {
  useMapEvents({
    click(e) {
      onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

// ─── Fly to center ────────────────────────────────────────────
function ChangeView({ center, zoom }: { center: LatLng; zoom?: number }) {
  const map = useMap();
  const lastCenterRef = useRef<LatLng | null>(null);
  const userMovedRef = useRef(false);

  useMapEvents({
    dragstart() {
      userMovedRef.current = true;
    },
    locationfound() {
      userMovedRef.current = false;
    },
  });

  useEffect(() => {
    const prev = lastCenterRef.current;
    const movedEnough =
      !prev || getDistanceMeters(prev, center) >= CENTER_MOVE_THRESHOLD_M;
    if (!movedEnough) return;

    lastCenterRef.current = center;
    if (userMovedRef.current) return;

    map.flyTo([center.lat, center.lng], zoom ?? 14, {
      duration: 1.5,
      animate: true,
    });
  }, [center.lat, center.lng, zoom, map]);

  return null;
}

// ─── Props ────────────────────────────────────────────────────
interface MapViewProps {
  center: LatLng;
  customerPos: LatLng;
  providers: Provider[];
  selectedProvider: Partial<Provider> | null;
  route: LatLng[];
  allowMapPickLocation?: boolean;
  onLocationSelect: (pos: LatLng) => void;
  onProviderSelect: (provider: Provider) => void;
  onAddressSearch: (query: string) => void;
  liveProviderPos?: { lat: number; lng: number } | null;
  zoom?: number;
}

const ZAGAZIG_COORDS: LatLng = { lat: 30.5877, lng: 31.502 };

// ─── Stable center hook ───────────────────────────────────────
function useStableCenter(
  liveProviderPos: { lat: number; lng: number } | null | undefined,
  fallbackLat: number,
  fallbackLng: number,
): LatLng {
  const prevLiveRef = useRef<LatLng | null>(null);
  const [stableCenter, setStableCenter] = useState<LatLng>({
    lat: fallbackLat,
    lng: fallbackLng,
  });

  useEffect(() => {
    if (!liveProviderPos) {
      prevLiveRef.current = null;
      setStableCenter({ lat: fallbackLat, lng: fallbackLng });
      return;
    }

    const current: LatLng = {
      lat: liveProviderPos.lat,
      lng: liveProviderPos.lng,
    };

    const moved = !prevLiveRef.current
      ? Infinity
      : getDistanceMeters(prevLiveRef.current, current);

    if (moved >= CENTER_MOVE_THRESHOLD_M) {
      prevLiveRef.current = current;
      setStableCenter(current);
    }
  }, [liveProviderPos?.lat, liveProviderPos?.lng, fallbackLat, fallbackLng]);

  return stableCenter;
}

// ─── Confirmed provider position hook ────────────────────────
// بيعرض الـ marker فور أول position، وبيحدثه كل 5 ثواني بس
function useConfirmedProviderPos(
  liveProviderPos: { lat: number; lng: number } | null | undefined,
  hasSelectedProvider: boolean,
): { lat: number; lng: number } | null {
  const latestPosRef = useRef<{ lat: number; lng: number } | null>(null);
  const [confirmedPos, setConfirmedPos] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // دايما احفظ آخر position في ref من غير ما تعمل re-render
  useEffect(() => {
    if (!hasSelectedProvider || !liveProviderPos) {
      latestPosRef.current = null;
      setConfirmedPos(null);
      return;
    }

    latestPosRef.current = liveProviderPos;

    // أول position → اعرضها فوراً عشان الـ loading يختفي
    setConfirmedPos((prev) => prev ?? liveProviderPos);
  }, [liveProviderPos?.lat, liveProviderPos?.lng, hasSelectedProvider]);

  // كل 5 ثواني → حدّث الـ marker من آخر قيمة في الـ ref
  useEffect(() => {
    if (!hasSelectedProvider) return;

    const interval = setInterval(() => {
      if (latestPosRef.current) {
        setConfirmedPos({ ...latestPosRef.current });
      }
    }, LIVE_UPDATE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [hasSelectedProvider]);

  return confirmedPos;
}

// ─── Component ────────────────────────────────────────────────
export default function MapView({
  center = ZAGAZIG_COORDS,
  customerPos = ZAGAZIG_COORDS,
  providers = [],
  selectedProvider = null,
  route = [],
  allowMapPickLocation = true,
  onLocationSelect = () => {},
  onAddressSearch = () => {},
  liveProviderPos,
  zoom,
}: MapViewProps) {
  const [mapSearch, setMapSearch] = useState('');

  const stableCenter = useStableCenter(
    liveProviderPos,
    center.lat,
    center.lng,
  );

  const confirmedProviderPos = useConfirmedProviderPos(
    liveProviderPos,
    !!selectedProvider,
  );

  return (
    <div className="relative h-full w-full">
      {!confirmedProviderPos && selectedProvider && (
        <div className="bg-card/10 dark:bg-card/90 absolute inset-0 z-600 flex items-center justify-center backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <LoadingSpinner />
            <span className="text-muted-foreground text-sm font-bold">
              جاري تحديد الموقع...
            </span>
          </div>
        </div>
      )}

      {allowMapPickLocation && (
        <div className="absolute top-4 left-1/2 z-500 w-[90%] max-w-md -translate-x-1/2">
          <div className="group border-border/50 bg-background/80 focus-within:ring-primary/10 flex flex-row-reverse items-center gap-3 rounded-full px-4 py-3 shadow-lg backdrop-blur-xl transition-all">
            <Search className="text-muted-foreground group-focus-within:text-primary h-5 w-5 transition-colors" />
            <input
              type="text"
              dir="rtl"
              placeholder="ابحث عن موقع أو عنوان..."
              value={mapSearch}
              onChange={(e) => setMapSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && mapSearch.trim()) {
                  onAddressSearch(mapSearch.trim());
                }
              }}
              className="text-foreground placeholder:text-muted-foreground flex-1 bg-transparent text-sm font-medium outline-none"
            />
            {mapSearch && (
              <button
                onClick={() => setMapSearch('')}
                className="hover:bg-muted/80 flex h-7 w-7 items-center justify-center rounded-full transition-colors"
                title="مسح"
              >
                <X className="text-muted-foreground h-4 w-4" />
              </button>
            )}
            <button
              onClick={() => {
                if (mapSearch.trim()) onAddressSearch(mapSearch.trim());
              }}
              className="bg-primary/10 hover:bg-primary/20 text-primary flex h-8 items-center justify-center rounded-full px-4 text-xs font-bold transition-colors"
            >
              بحث
            </button>
          </div>
        </div>
      )}

      <MapContainer
        center={[stableCenter.lat, stableCenter.lng]}
        zoom={zoom || 13}
        className="h-full w-full"
        zoomControl={false}
      >
        <ChangeView center={stableCenter} zoom={zoom} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {allowMapPickLocation && (
          <MapClickHandler onLocationSelect={onLocationSelect} />
        )}

        <Marker
          position={[customerPos.lat, customerPos.lng]}
          icon={customerIcon}
        >
          <Popup>
            <div className="text-right text-sm font-bold">موقعك</div>
          </Popup>
        </Marker>

        {providers
          ?.filter(
            (p) =>
              p.id !== selectedProvider?.id &&
              p.baseLocation?.latitude &&
              p.baseLocation?.longitude,
          )
          .map((provider) => (
            <Marker
              key={provider.id}
              position={[
                provider.baseLocation.latitude,
                provider.baseLocation.longitude,
              ]}
              icon={workerIcon(
                provider.name,
                provider.services?.map((s) => s.name).join(', ') || '',
                provider.rating || 0,
                provider.avatar,
                provider,
              )}
            >
              <Popup>
                <div className="text-right text-sm">
                  <p className="font-bold">{provider.name}</p>
                  <p className="text-xs text-gray-500">
                    {provider.services?.map((s) => s.name).join(', ')}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}

        {confirmedProviderPos && selectedProvider && (
          <Marker
            position={[confirmedProviderPos.lat, confirmedProviderPos.lng]}
            icon={workerIcon(
              selectedProvider.name!,
              selectedProvider.services?.map((s) => s.name).join(', ') || '',
              selectedProvider.rating || 0,
              selectedProvider.pictureUrl,
            )}
          >
            <Popup>{selectedProvider.name} في الطريق</Popup>
          </Marker>
        )}

        {confirmedProviderPos &&
          confirmedProviderPos.lat !== 0 &&
          route?.length > 1 && (
            <Polyline
              positions={route.map((p) => [p.lat, p.lng])}
              pathOptions={{ color: '#7C3AED', weight: 4, opacity: 0.8 }}
            />
          )}
      </MapContainer>
    </div>
  );
}