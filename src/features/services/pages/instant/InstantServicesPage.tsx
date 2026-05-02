import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import MapView from '../../components/MapView';
import {
  Step1RequestForm,
  Step2OffersSidebar,
  Step3TrackingSidebar,
} from '../../components/instant';
import { useRoute } from '../../hooks/useRoute';
import type { LatLng, Provider } from '../../types/types';
import { useLocationCustom } from '../../hooks/useLocation';
import { cn } from '@/lib/utils';
import { useAssignServiceReq } from '../../hooks/useAssignServiceReq';
import { useGetServiceReqById } from '../../hooks/useGetServiceReqById';
import { useSetReqCancelled } from '../../hooks/useSetReqCancelled';
import { useGetProviderData } from '../../hooks/useGetProviderData';

import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';

const InstantRequestPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [nearbyForMap, setNearbyForMap] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );

  const [providerLivePos, setProviderLivePos] = useState<LatLng | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const requestId = searchParams.get('requestId');

  const aiData = location.state as {
    serviceIdAI?: number;
    descriptionAI?: string;
  } | null;

  // 📍 location
  const {
    position: customerPos,
    setPosition: setCustomerPos,
    address,
    locating,
    detect,
    searchAddress,
  } = useLocationCustom();

  //  request
  const { data: request } = useGetServiceReqById(requestId);

  //  On refresh / re-mount: restore the saved pin from the existing request
  useEffect(() => {
    if (!request?.serviceRequestLocation) return;
    const { latitude: lat, longitude: lng } = request.serviceRequestLocation;
    // Only override the default centre – don't stomp a position the user just moved
    setCustomerPos({ lat, lng });
  }, [
    request?.serviceRequestLocation?.latitude,
    request?.serviceRequestLocation?.longitude,
  ]);

  //  STEP (derived from server)
  const step = useMemo(() => {
    if (!requestId) return 'REQUEST';
    if (!request) return 'LOADING';

    switch (request.requestStatus) {
      case 0:
        return 'OFFERS';
      case 2:
        return 'IN_PROGRESS';
      case 3:
        return 'COMPLETED';
      default:
        return 'REQUEST';
    }
  }, [request, requestId]);

  // 🧠 provider
  const assignedProviderId = request?.providerId?.toString();
  const targetProviderId =
    step === 'IN_PROGRESS' ? assignedProviderId : selectedProvider?.id;

  const { data: providerData }: any = useGetProviderData(
    String(targetProviderId),
    {
      enabled: !!targetProviderId,
    },
  );
  const providerPosInitialized = useRef(false);

  // عدّل الـ useEffect بتاع baseLocation
  useEffect(() => {
    if (
      step === 'IN_PROGRESS' &&
      providerData?.baseLocation &&
      !providerPosInitialized.current // ← بدل !providerLivePos
    ) {
      providerPosInitialized.current = true;
      setProviderLivePos({
        lat: providerData.baseLocation.latitude,
        lng: providerData.baseLocation.longitude,
      });
    }
  }, [
    step,
    providerData?.baseLocation?.latitude,
    providerData?.baseLocation?.longitude,
  ]);

  // وكمان reset الـ ref لما يتغير الـ step
  useEffect(() => {
    if (step !== 'IN_PROGRESS') {
      providerPosInitialized.current = false;
    }
  }, [step]);

  // 🗺️ map providers
  const mapProviders = useMemo(() => {
    if (request?.providerId && providerData) {
      return [providerData];
    }
    return nearbyForMap;
  }, [request, providerData, nearbyForMap]);

  const mapSelectedProvider = useMemo(() => {
    if (request?.providerId) return providerData;
    return selectedProvider;
  }, [request, providerData, selectedProvider]);

  const routeEnd = useMemo(() => {
    if (!providerLivePos) return null;

    return providerLivePos;
  }, [providerLivePos]);

  const { route, distance, duration } = useRoute(customerPos, routeEnd);

  // 📡 mutations
  const { mutate: assignMutate, isPending: assignPending } =
    useAssignServiceReq();

  const { mutate: cancelMutate, isPending: cancelPending } =
    useSetReqCancelled();

  // 🧠 handlers

  const handleRequestCreated = (id: string) => {
    localStorage.setItem('activeRequestId', id);
    localStorage.setItem('requestType', 'instant');

    navigate(`/app/services/instant?requestId=${id}`);
  };

  const handleAcceptOffer = (providerId: number) => {
    if (!requestId) return;

    assignMutate(
      { requestId, providerId },
      {
        onSuccess: () => {},
      },
    );
  };

  //  handle cancel request
  const handleCancelRequest = () => {
    if (!requestId) return;

    cancelMutate(requestId, {
      onSuccess: () => {
        localStorage.removeItem('activeRequestId');

        navigate('/app/services/instant');
      },
    });
  };
  // handle complete success
  const handleCompleteSuccess = () => {
    localStorage.removeItem('activeRequestId');
    navigate('/app/services', {
      state: {
        reviewRequestId: Number(requestId),
      },
    });
  };

  const handleProviderSelect = useCallback(
    (provider: Provider) => {
      if (step !== 'REQUEST') return;

      setSelectedProvider((prev) =>
        prev?.id === provider.id ? null : provider,
      );
    },
    [step],
  );

  const onNearbyProvidersChange = useCallback((list: Provider[]) => {
    setNearbyForMap(list);
  }, []);

  const sidebarTitle =
    step === 'REQUEST'
      ? 'طلب فوري'
      : step === 'OFFERS'
        ? 'عروض الحرفيين'
        : 'متابعة الطلب';

  const allowMapPick = step === 'REQUEST';

  //  const getDynamicZoom = () => {
  //   if (!providerLivePos || !customerPos) return 13;

  //   const latDiff = Math.abs(providerLivePos.lat - customerPos.lat);
  //   const lngDiff = Math.abs(providerLivePos.lng - customerPos.lng);

  //   if (latDiff < 0.005 && lngDiff < 0.005) {
  //     return 18;
  //   }
  //   return 14;
  // };

  return (
    <div
      className="relative flex h-[calc(100dvh-128px)] flex-col overflow-hidden md:h-[calc(100dvh-64px)] md:flex-row"
      dir="ltr"
    >
      {/* map */}
      <div className="absolute inset-0 z-0 md:relative md:flex-1">
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
          liveProviderPos={providerLivePos}
          zoom={14}
        />
      </div>

      {/* sidebar - Bottom Sheet on Mobile */}
      <aside
        dir="rtl"
        className={cn(
          'bg-card border-border absolute bottom-0 z-10 flex w-full flex-col rounded-t-3xl border-t shadow-[0_-8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out md:relative md:max-w-md md:rounded-none md:border-t-0 md:border-l md:shadow-none',
          isExpanded ? 'h-[85vh] md:h-full' : 'h-[40vh] md:h-full',
        )}
      >
        {/* Handle to toggle expand/collapse */}
        <div
          className="border-border active:bg-muted/50 flex shrink-0 cursor-pointer items-center justify-center border-b px-4 py-3 transition-colors md:hidden"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="bg-muted-foreground/30 mb-1 h-1.5 w-12 rounded-full" />
        </div>
        <div className="border-border flex shrink-0 items-center justify-between border-b px-5 py-3 md:hidden">
          <h2 className="text-foreground text-sm font-bold">{sidebarTitle}</h2>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary bg-primary/10 hover:bg-primary/20 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors"
          >
            {isExpanded ? 'تصغير' : 'تكبير'}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {step === 'REQUEST' && (
            <Step1RequestForm
              serviceIdAI={aiData?.serviceIdAI}
              descriptionAI={aiData?.descriptionAI}
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

          {step === 'OFFERS' && requestId && (
            <Step2OffersSidebar
              requestId={requestId}
              onAccept={handleAcceptOffer}
              isAssigning={assignPending}
              onCancel={handleCancelRequest}
              isCancelling={cancelPending}
            />
          )}

          {step === 'IN_PROGRESS' && requestId && (
            <Step3TrackingSidebar
              requestId={requestId}
              onCompleteSuccess={() => {
                handleCompleteSuccess();
              }}
              onLocationChange={setProviderLivePos}
              distance={distance}
              duration={duration}
            />
          )}
        </div>
      </aside>
    </div>
  );
};

export default InstantRequestPage;
