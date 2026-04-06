
import { Search, Navigation, Clock, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  MapContainer, TileLayer, Marker,
  Popup, Polyline, useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { customerIcon, workerIcon } from "./../utils/mapIcons.ts";
import type { LatLng, Provider } from "../types/types";

// ─── Map click handler ────────────────────────────────────────────────────────

function MapClickHandler({ onLocationSelect }: { onLocationSelect: (pos: LatLng) => void }) {
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
  const [mapSearch, setMapSearch] = useState("");

  return (
    <div className="flex-1 relative">
      {/* Search bar */}
      <div className="   absolute top-4 left-1/2 -translate-x-1/2 z-[1000] ">
        <div className="flex items-center gap-3 bg-white rounded-full w-102.25 h-13.5 shadow-md px-6 py-3 ">
          <Search className="h-4.5 w-4.5 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="ابحث في هذه المنطقة..."
            value={mapSearch}
            onChange={(e) => setMapSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && mapSearch.trim()) {
                onAddressSearch(mapSearch.trim());
                setMapSearch("");
              }
            }}
            className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
          />
          {mapSearch && (
            <button
              type="button"
              onClick={() => setMapSearch("")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          )}
        </div>
      </div>

      {/* Route info pill */}
      {selectedProvider && route.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000]">
          <div className="flex items-center gap-3 bg-white rounded-2xl shadow-lg px-4 py-2.5 border border-border">
            <div className="flex items-center gap-1.5">
              <Navigation className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold">{selectedProvider.distance} كم</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold">
                ~{Math.round(selectedProvider.distance * 3)} دقيقة
              </span>
            </div>
            <div className="w-px h-4 bg-border" />
            <span className="text-xs text-primary font-semibold">{selectedProvider.name}</span>
          </div>
        </div>
      )}

      {/* Map */}
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        className="w-full h-full"
        zoomControl={false}
      >
        <ChangeView center={center} />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <MapClickHandler onLocationSelect={onLocationSelect} />

        {/* Customer marker */}
        <Marker position={[customerPos.lat, customerPos.lng]} icon={customerIcon}>
          <Popup>موقعك الحالي</Popup>
        </Marker>

        {/* Provider markers */}
        {providers.map((provider) => (
          <Marker
            key={provider.id}
            position={[provider.position.lat, provider.position.lng]}
            icon={workerIcon(provider.name, provider.rating, provider.profession)}
            eventHandlers={{ click: () => onProviderSelect(provider) }}
          >
            <Popup>
              <div className="text-right font-[Cairo,sans-serif] min-w-[140px]">
                <p className="font-bold text-sm">{provider.name}</p>
                <p className="text-xs text-gray-500">{provider.profession}</p>
                <p className="text-xs mt-1">
                  <span className="text-yellow-500">⭐ {provider.rating}</span>
                  {" · "}
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
            pathOptions={{ color: "#7C3AED", weight: 4, opacity: 0.8, dashArray: "8 4" }}
          />
        )}
      </MapContainer>
    </div>
  );
}
