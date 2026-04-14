import { Search, Navigation, Clock, X } from 'lucide-react';
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

// ─── Map click handler ────────────────────────────────────────────────────────
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

// ─── Fly to center ───────────────────────────────────────────────────────────
function ChangeView({ center }: { center: LatLng }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([center.lat, center.lng], 14, { duration: 1.5 });
  }, [center.lat, center.lng]);

  return null;
}

// ─── Props ────────────────────────────────────────────────────────────────────
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

  // 🔥 الجديد
  liveProviderPos: { lat: number; lng: number } | null;
}

// ─── Component ────────────────────────────────────────────────────────────────
const ZAGAZIG_COORDS: LatLng = { lat: 30.5877, lng: 31.502 };

export default function MapView({
  center = ZAGAZIG_COORDS,
  customerPos = ZAGAZIG_COORDS,
  providers = [],
  selectedProvider = null,
  route = [],
  allowMapPickLocation = true,
  onLocationSelect = () => {},
  onProviderSelect = () => {},
  onAddressSearch = () => {},
  liveProviderPos,
}: MapViewProps) {
  const [mapSearch, setMapSearch] = useState('');

  console.log(liveProviderPos);
  return (
    <div className="relative h-full w-full">
      {/* 🔍 Search */}
      <div className="absolute top-3 left-1/2 z-[900] w-80 -translate-x-1/2">
        <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md">
          <Search className="h-4 w-4" />
          <input
            type="text"
            placeholder="ابحث..."
            value={mapSearch}
            onChange={(e) => setMapSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && mapSearch.trim()) {
                onAddressSearch(mapSearch.trim());
                setMapSearch('');
              }
            }}
            className="flex-1 bg-transparent text-sm outline-none"
          />
          {mapSearch && (
            <button onClick={() => setMapSearch('')}>
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* 🗺️ Map */}
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        className="h-full w-full"
        zoomControl={false}
      >
        <ChangeView center={center} />

        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution="&copy; OpenStreetMap"
        />

        {/* pick location */}
        {allowMapPickLocation && (
          <MapClickHandler onLocationSelect={onLocationSelect} />
        )}

        {/* 👤 Customer */}
        <Marker
          position={[customerPos.lat, customerPos.lng]}
          icon={customerIcon}
        >
          <Popup>موقعك</Popup>
        </Marker>

        {/* 🔥 Live Provider */}
        {liveProviderPos && (
          <Marker
            position={[liveProviderPos.lat, liveProviderPos.lng]}
            icon={workerIcon('Live Provider', 'tracking')}
          >
            <Popup>المحترف في الطريق 🚀</Popup>
          </Marker>
        )}

        {/* 👷 Static Providers (فقط لو مفيش live) */}
        {providers
          ?.filter((p) => p.baseLocation?.latitude && p.baseLocation?.longitude)
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
              )}
              eventHandlers={{
                click: () => onProviderSelect(provider),
              }}
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

        {/* 🛣️ Route */}
        {route?.length > 1 && (
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
