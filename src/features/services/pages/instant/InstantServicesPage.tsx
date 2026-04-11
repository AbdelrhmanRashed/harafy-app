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

/** Map provider marker for TRACKING when API returns coords on the request payload. */
function providerFromRequestDetails(
  req: Record<string, unknown> | undefined,
): Provider | null {
  if (!req) return null;
  const pid = Number(req.providerId);
  if (!Number.isFinite(pid) || pid <= 0) return null;

  const nested =
    (req.providerBaseLocation as Record<string, unknown> | undefined) ||
    (req.providerLocation as Record<string, unknown> | undefined);
  const loc = req.serviceRequestLocation as
    | { latitude?: number; longitude?: number }
    | undefined;
  const lat =
    (typeof nested?.latitude === "number" ? nested.latitude : undefined) ??
    (typeof nested?.Latitude === "number" ? nested.Latitude : undefined) ??
    (typeof req.providerLatitude === "number" ? req.providerLatitude : undefined) ??
    loc?.latitude;
  const lng =
    (typeof nested?.longitude === "number" ? nested.longitude : undefined) ??
    (typeof nested?.Longitude === "number" ? nested.Longitude : undefined) ??
    (typeof req.providerLongitude === "number" ? req.providerLongitude : undefined) ??
    loc?.longitude;

  if (lat == null || lng == null || Number.isNaN(lat) || Number.isNaN(lng)) {
    return null;
  }

  const name =
    (req.providerName as string) ||
    (req.providerFullName as string) ||
    `محترف #${pid}`;

  return {
    id: pid,
    name,
    pictureUrl: (req.providerPictureUrl as string | null) ?? null,
    bio: "",
    nickname: name.slice(0, 12),
    rating: null,
    reviewsCount: 0,
    jobsCount: 0,
    governorateId: 0,
    regionId: 0,
    baseLocation: {
      id: 0,
      latitude: lat,
      longitude: lng,
      addressText: (req.providerAddress as string) || "موقع المحترف",
      providerId: pid,
    },
    services: [{ id: 0, name: "خدمة" }],
  };
}

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

  const { data: trackingReq } = useGetServiceReqById(activeRequestId ?? "", {
    enabled: step === "TRACKING" && !!activeRequestId,
  });

  const assignedForMap = useMemo(
    () =>
      providerFromRequestDetails(trackingReq as Record<string, unknown> | undefined),
    [trackingReq],
  );

  const mapProviders = useMemo(() => {
    if (step === "TRACKING") {
      return assignedForMap ? [assignedForMap] : [];
    }
    return nearbyForMap;
  }, [step, nearbyForMap, assignedForMap]);

  const mapSelectedProvider =
    step === "TRACKING" ? assignedForMap : selectedProvider;

  const routeEnd =
    mapSelectedProvider &&
    mapSelectedProvider.baseLocation?.latitude != null &&
    mapSelectedProvider.baseLocation?.longitude != null
      ? {
          lat: mapSelectedProvider.baseLocation.latitude,
          lng: mapSelectedProvider.baseLocation.longitude,
        }
      : null;

  const { route } = useRoute(routeEnd, customerPos);

  const onNearbyProvidersChange = useCallback((list: Provider[]) => {
    setNearbyForMap(list);
  }, []);

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
        className="absolute top-4 left-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-105 md:hidden"
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
          "border-border bg-sidebar absolute inset-y-0 right-0 z-30 flex w-full max-w-full flex-col overflow-y-auto border-l backdrop-blur-sm transition-transform duration-300 ease-out md:relative md:max-h-none md:w-full md:max-w-md md:translate-x-0 md:transition-none",
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
