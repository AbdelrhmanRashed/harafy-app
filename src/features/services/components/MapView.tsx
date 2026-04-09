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
  onLocationSelect: (pos: LatLng) => void;
  onProviderSelect: (provider: Provider) => void;
  onAddressSearch: (query: string) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function MapView({
  center,
  customerPos,
  providers,
  selectedProvider,
  route,
  onLocationSelect,
  onProviderSelect,
  onAddressSearch,
}: MapViewProps) {
  const [mapSearch, setMapSearch] = useState('');

  return (
    <div className="relative h-[calc(100vh-64px)] flex-1 md:h-auto">
      {/* Search bar - Mobile optimized */}
      <div className="absolute top-2 right-2 left-1/2 z-900 w-80 -translate-x-1/2 px-2 sm:top-4 sm:right-auto sm:left-1/2 sm:w-96 sm:px-0">
        <div className="flex h-11 items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md sm:h-13.5 sm:gap-3 sm:px-6 sm:py-3">
          <Search className="text-muted-foreground h-4 w-4 shrink-0 sm:h-4.5 sm:w-4.5" />
          <input
            type="text"
            placeholder="ابحث في هذه المنطقة..."
            value={mapSearch}
            onChange={(e) => setMapSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && mapSearch.trim()) {
                onAddressSearch(mapSearch.trim());
                setMapSearch('');
              }
            }}
            className="placeholder:text-muted-foreground flex-1 bg-transparent text-xs outline-none sm:text-sm"
          />
          {mapSearch && (
            <button
              type="button"
              onClick={() => setMapSearch('')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
            </button>
          )}
        </div>
      </div>

      {/* Route info pill - Mobile optimized */}
      {selectedProvider && route.length > 1 && (
        <div className="absolute right-2 bottom-4 left-1/2 z-[1000] -translate-x-1/2 px-2 sm:right-auto sm:bottom-6 sm:left-1/2 sm:px-0">
          <div className="border-border flex flex-wrap items-center justify-center gap-2 rounded-xl border bg-white px-3 py-2 shadow-lg sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-2.5">
            <div className="flex items-center gap-1 text-xs sm:gap-1.5 sm:text-sm">
              <Navigation className="text-primary h-4 w-4" />
              <span className="font-bold">{selectedProvider.distance} كم</span>
            </div>
            <div className="bg-border hidden h-3 w-px sm:block" />
            <div className="flex items-center gap-1 text-xs sm:gap-1.5 sm:text-sm">
              <Clock className="text-primary h-4 w-4" />
              <span className="font-bold">
                ~{Math.round(selectedProvider.distance * 3)} دقيقة
              </span>
            </div>
            <div className="bg-border h-px w-full sm:hidden" />
            <span className="text-primary text-xs font-semibold">
              {selectedProvider.name}
            </span>
          </div>
        </div>
      )}

      {/* Map */}
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        className="h-full w-full"
        zoomControl={false}
      >
        <ChangeView center={center} />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <MapClickHandler onLocationSelect={onLocationSelect} />

        {/* Customer marker */}
        <Marker
          position={[customerPos.lat, customerPos.lng]}
          icon={customerIcon}
        >
          <Popup>موقعك الحالي</Popup>
        </Marker>

        {/* Provider markers */}
        {providers.map((provider) => (
          <Marker
            key={provider.id}
            position={[provider.position.lat, provider.position.lng]}
            icon={workerIcon(
              provider.name,
              provider.rating,
              provider.profession,
            )}
            eventHandlers={{ click: () => onProviderSelect(provider) }}
          >
            <Popup>
              <div className="min-w-[140px] text-right font-[Cairo,sans-serif] text-sm">
                <p className="font-bold">{provider.name}</p>
                <p className="text-xs text-gray-500">{provider.profession}</p>
                <p className="mt-1 text-xs">
                  <span className="text-yellow-500">⭐ {provider.rating}</span>
                  {' · '}
                  <span className="text-primary">{provider.distance} كم</span>
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Route */}
        {route.length > 1 && (
          <Polyline
            positions={route.map((p) => [p.lat, p.lng])}
            pathOptions={{
              color: '#7C3AED',
              weight: 4,
              opacity: 0.8,
              dashArray: '8 4',
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}
