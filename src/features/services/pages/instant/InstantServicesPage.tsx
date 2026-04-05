import { useState,  useMemo } from "react";
import MapView from "../../components/MapView";
import RequestForm from "../../components/RequestForm";
import ProvidersList from "../../components/ProvidersList";
import { useRoute } from "../../hooks/useRoute";
import { MOCK_PROVIDERS } from "./constants";
import type { Provider } from "./types";
import { getNearbyProviders } from "../../utils/distance";
import { useLocation } from "../../hooks/useLocation";

const InstantRequestPage = () => {
  const { position: customerPos, setPosition: setCustomerPos, address, locating, detect, searchAddress } = useLocation();

  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

const nearbyProviders = useMemo(() => {
  return getNearbyProviders(MOCK_PROVIDERS, customerPos, 10);
}, [customerPos]);// Calculate nearby providers whenever the customer's position changes

  const { route } = useRoute(
    selectedProvider?.position ?? null,
    selectedProvider ? customerPos : null
  );

  function handleProviderSelect(provider: Provider) {
    setSelectedProvider((prev) => (prev?.id === provider.id ? null : provider));
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background font-[Cairo,sans-serif]">

      {/* ── Sidebar ── */}
      <aside className="w-105 shrink-0 flex flex-col overflow-y-auto border-l border-border bg-sidebar backdrop-blur-sm">
        <RequestForm 
          onSend={(data) => console.log("request sent:", data)}
          address={address}
          locating={locating}
          onDetect={detect}
           onAddressSearch={searchAddress}
        />
        <ProvidersList
          providers={nearbyProviders}
          selectedId={selectedProvider?.id ?? null}
          onSelect={handleProviderSelect}
        />
      </aside>

      {/* ── Map ── */}
      <MapView
        center={customerPos}
        customerPos={customerPos}
        providers={nearbyProviders}
        selectedProvider={selectedProvider}
        route={route}
        onLocationSelect={setCustomerPos}
        onProviderSelect={handleProviderSelect}
        onAddressSearch={searchAddress}
      />
    </div>
  );
}
export default InstantRequestPage;