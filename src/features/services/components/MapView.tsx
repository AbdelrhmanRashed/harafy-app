import { useEffect, useState } from 'react';
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

// ─── Map click handler ─────────────────────────────────────────
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

  useEffect(() => {
    map.flyTo([center.lat, center.lng], zoom || 14, {
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
  selectedProvider: Provider | null;
  route: LatLng[];
  allowMapPickLocation?: boolean;
  onLocationSelect: (pos: LatLng) => void;
  onProviderSelect: (provider: Provider) => void;
  onAddressSearch: (query: string) => void;
  liveProviderPos?: { lat: number; lng: number } | null;
  zoom?: number;
}

const ZAGAZIG_COORDS: LatLng = { lat: 30.5877, lng: 31.502 };

export default function MapView({
  center = ZAGAZIG_COORDS,
  customerPos = ZAGAZIG_COORDS,
  providers = [],
  selectedProvider = null,
  route = [],
  allowMapPickLocation = true,
  onLocationSelect = () => {},
  // onProviderSelect = () => {},
  onAddressSearch = () => {},
  liveProviderPos,
  zoom,
}: MapViewProps) {
  const [mapSearch, setMapSearch] = useState('');
  const effectiveCenter = liveProviderPos
    ? { lat: liveProviderPos.lat, lng: liveProviderPos.lng }
    : center;
  return (
    <div className="relative h-full w-full">
      {!liveProviderPos && selectedProvider && (
        <div className="bg-card/10 dark:bg-card/90 absolute inset-0 z-600 flex items-center justify-center backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <LoadingSpinner />
            <span className="text-muted-foreground text-sm font-bold">
              جاري تحديد موقع الحرفي...
            </span>
          </div>
        </div>
      )}
      {/* 🔍 Search */}
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

      {/* 🗺️ Map */}
      <MapContainer
        center={[effectiveCenter.lat, effectiveCenter.lng]}
        zoom={zoom || 13}
        className="h-full w-full"
        zoomControl={false}
      >
        <ChangeView center={effectiveCenter} zoom={zoom} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 📍 pick location */}
        {allowMapPickLocation && (
          <MapClickHandler onLocationSelect={onLocationSelect} />
        )}

        {/* 👤 Customer */}
        <Marker
          position={[customerPos.lat, customerPos.lng]}
          icon={customerIcon}
        >
          <Popup>
            <div className="text-right text-sm font-bold">موقعك</div>
          </Popup>
        </Marker>

        {/* 👷 Nearby Providers (بدون المختار) */}
        {providers
          ?.filter(
            (p) =>
              p.id !== selectedProvider?.id && // ❌ منع التكرار
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
              eventHandlers={
                {
                  // click: () => onProviderSelect(provider),
                }
              }
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

        {/* 🚀 Live Provider (المختار فقط) */}
        {liveProviderPos && selectedProvider && (
          <Marker
            position={[liveProviderPos.lat, liveProviderPos.lng]}
            icon={workerIcon(
              selectedProvider.name,
              selectedProvider.services?.map((s) => s.name).join(', ') || '',
              selectedProvider.rating || 0,
              selectedProvider.pictureUrl,
            )}
          >
            <Popup>{selectedProvider.name} في الطريق</Popup>
          </Marker>
        )}

        {/* 🛣️ Route */}
        {liveProviderPos && liveProviderPos.lat !== 0 && route?.length > 1 && (
          <Polyline
            positions={route.map((p) => [p.lat, p.lng])}
            pathOptions={{
              color: '#7C3AED',
              weight: 4,
              opacity: 0.8,
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}
