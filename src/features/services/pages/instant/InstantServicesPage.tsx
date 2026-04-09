import { useState, useMemo, useEffect } from "react";
import MapView from "./components/MapView";
import RequestForm from "./components/RequestForm";
import ProvidersList from "./components/ProvidersList";
import { useRoute } from "./hooks/useRoute";
import { MOCK_PROVIDERS } from "./types/constants";
import type { Provider } from "./types/types";
import { getNearbyProviders } from "./utils/distance";
import { useLocation } from "./hooks/useLocation";
import { useSearchParams } from "react-router-dom";
const InstantRequestPage = () => {
  const [searchParams] = useSearchParams();
  const { position: customerPos, setPosition: setCustomerPos, address, locating, detect, searchAddress } = useLocation();
  const initialQuery = searchParams.get("q") || "";
  const initialLocation = searchParams.get("loc") || "";
  const initialCategory = searchParams.get("cat") || "الكل";
useEffect(() => {
    if (initialLocation) {
      searchAddress(initialLocation);
   } else {
      detect();
    }
  }, [initialLocation]);


  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  const nearbyProviders = useMemo(() => {
    let filtered = MOCK_PROVIDERS;

    if (initialCategory && initialCategory !== "الكل") {
      filtered = filtered.filter(p => p.profession.includes(initialCategory));
    }


    return getNearbyProviders(filtered, customerPos, 10);
  }, [customerPos, initialCategory]);

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
          key={`${initialCategory}-${initialQuery}-${initialLocation}`} //to reset form when these change
          initialService={initialQuery}
          initialCategory={initialCategory}
          address={  address }
          locating={locating}
          onDetect={detect}
          onAddressSearch={searchAddress}
          onSend={(data) => console.log("request sent:", data)}

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