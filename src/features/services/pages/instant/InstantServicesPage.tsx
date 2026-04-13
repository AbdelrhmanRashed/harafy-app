import { useState, useMemo, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import MapView from "../../components/MapView";
import {
  Step1RequestForm,
  Step2OffersSidebar,
  Step3TrackingSidebar,
} from "../../components/instant";
import type { InstantStep } from "../../components/instant";
import { useRoute } from "../../hooks/useRoute";
import type { Provider } from "../../types/types";
import { useLocation } from "../../hooks/useLocation";
import { cn } from "@/lib/utils";
import { useAssignServiceReq } from "../../hooks/useAssignServiceReq";
import { useGetServiceReqById } from "../../hooks/useGetServiceReqById";
import { useSetReqCancelled } from "../../hooks/useSetReqCancelled";
import { useGetProviderData } from "../../hooks/useGetProviderData";




//main page for instant services
const InstantRequestPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [step, setStep] = useState<InstantStep>("REQUEST");
  const [activeRequestId, setActiveRequestId] = useState<string | null>(null);
  const [nearbyForMap, setNearbyForMap] = useState<Provider[]>([]);

  const {
    position: customerPos,
    setPosition: setCustomerPos,
    address,
    locating,
    detect,
    searchAddress,
  } = useLocation();

  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );

  const { mutate: assignMutate, isPending: assignPending } =
    useAssignServiceReq();

  const { mutate: cancelMutate, isPending: cancelPending } = useSetReqCancelled();


  

  const { data: trackingReq } = useGetServiceReqById(activeRequestId ?? "", {
    enabled: step === "TRACKING" && !!activeRequestId,
    refetchInterval: step === "TRACKING" ? 5000 : false,
  });

  const assignedProviderId = useMemo(() => {
  return (trackingReq as any)?.providerId?.toString();
}, [trackingReq]);

const targetProviderId = step === "TRACKING" ? assignedProviderId : selectedProvider?.id;
  const { data:providerData }:any = useGetProviderData(targetProviderId);
  console.log(providerData?.baseLocation); //to use it for route 
  


const mapProviders = useMemo(() => {
  if (step === "TRACKING") {
    return providerData ? [providerData] : [];
  }
  return nearbyForMap;
}, [step, nearbyForMap, providerData]);

 const mapSelectedProvider = useMemo(() => {
  if (step === "TRACKING") {
    return providerData;
  }
  return selectedProvider;
}, [step, providerData, selectedProvider]);


const routeEnd = useMemo(() => {
  return providerData?.baseLocation 
    ? { lat: providerData.baseLocation.latitude, lng: providerData.baseLocation.longitude }
    : null;
}, [providerData]);


  const { route } = useRoute(routeEnd, customerPos);

  const onNearbyProvidersChange = useCallback((list: Provider[]) => {
    setNearbyForMap(list);
  }, []);



  // if step is request and provider is selected 
  // pass as props for map to show route and selected provider
  const handleProviderSelect = useCallback(
    (provider: Provider) => {
      if (step !== "REQUEST") return;
      setSelectedProvider((prev) =>
        prev?.id === provider.id ? null : provider,
      );
      if (typeof window !== "undefined" && window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    },
    [step],
  );

  useEffect(() => {
    if (selectedProvider && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [selectedProvider]);
  const resetFlow = useCallback(() => {
    setStep("REQUEST");
    setActiveRequestId(null);
    setSelectedProvider(null);
    setNearbyForMap([]);
  }, []);

  const handleCancelRequest = useCallback(() => {
    if (!activeRequestId) return;
    cancelMutate(activeRequestId, {
      onSuccess: () => {
        resetFlow();
      }
    });
  }, [activeRequestId, cancelMutate, resetFlow]);

  const handleRequestCreated = useCallback((requestId: string) => {
    setActiveRequestId(requestId);
    setStep("OFFERS");
    setSelectedProvider(null);
  }, []);

  const handleAcceptOffer = useCallback(
    (providerId: number) => {
      if (!activeRequestId) return;
      assignMutate(
        { requestId: activeRequestId, providerId },
        { onSuccess: () => setStep("TRACKING") },
      );
    },
    [activeRequestId, assignMutate],
  );

  const sidebarTitle =
    step === "REQUEST"
      ? "طلب فوري"
      : step === "OFFERS"
        ? "عروض الحرفيين"
        : "متابعة الطلب";

  const allowMapPick = step === "REQUEST";

  return (
    <div
      dir="ltr"
      className="bg-background flex h-[calc(100vh-64px)] flex-col overflow-hidden font-[Cairo,sans-serif] md:flex-row"
    >
      <button
        type="button"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-[1001] flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-105 md:hidden"
      >
        {sidebarOpen ? (
          <X className="text-foreground h-5 w-5" />
        ) : (
          <Menu className="text-foreground h-5 w-5" />
        )}
      </button>

      <div className="relative min-h-[40vh] flex-1 md:min-h-0">
        <MapView
          allowMapPickLocation={allowMapPick}
          onLocationSelect={setCustomerPos}
          center={customerPos}
          customerPos={customerPos}
          providers={mapProviders}
          selectedProvider={mapSelectedProvider}
          route={route}
          onProviderSelect={handleProviderSelect}
          onAddressSearch={searchAddress}
        />
      </div>

      <aside
        dir="rtl"
        className={cn(
          "border-border bg-sidebar absolute inset-y-0 right-0 z-[1050] flex w-full max-w-full flex-col overflow-y-auto border-l backdrop-blur-sm transition-transform duration-300 ease-out md:relative md:max-h-none md:w-full md:max-w-md md:translate-x-0 md:transition-none",
          sidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0",
        )}
      >
        <div className="border-border flex shrink-0 items-center justify-between border-b px-4 py-3 md:hidden">
          <h2 className="text-foreground text-sm font-bold">{sidebarTitle}</h2>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="hover:bg-muted flex h-8 w-8 items-center justify-center rounded-full"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {step === "REQUEST" && (
          <Step1RequestForm
            address={address}
            position={customerPos}
            locating={locating}
            onDetect={detect}
            onAddressSearch={searchAddress}
            onRequestCreated={handleRequestCreated}
            onNearbyProvidersChange={onNearbyProvidersChange}
            selectedProvider={selectedProvider}
            onSelectProvider={handleProviderSelect}
          />
        )}

        {step === "OFFERS" && activeRequestId && (
          <Step2OffersSidebar
            requestId={activeRequestId}
            onAccept={handleAcceptOffer}
            isAssigning={assignPending}
            onCancel={handleCancelRequest}
            isCancelling={cancelPending}
          />
        )}

        {step === "TRACKING" && activeRequestId && (
          <Step3TrackingSidebar
            requestId={activeRequestId}
            onCompleteSuccess={resetFlow}
          />
        )}
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          aria-label="إغلاق"
          onClick={() => setSidebarOpen(false)}
          className="absolute inset-0 z-20 bg-black/50 md:hidden"
        />
      )}
    </div>
  );
};

export default InstantRequestPage;
