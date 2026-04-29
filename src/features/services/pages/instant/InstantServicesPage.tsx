import { useState, useMemo, useCallback } from 'react';
import { X } from 'lucide-react';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  // 📡 request
  const { data: request } = useGetServiceReqById(requestId);

  // 🧠 STEP (derived from server)
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

  const { route } = useRoute(customerPos, routeEnd);

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
        onSuccess: () => {
          // React Query هيعمل re-render لوحده
        },
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
    <div className="flex h-[calc(100vh-64px)] flex-col md:flex-row" dir="ltr">
      {/* map */}
      <div className="flex-1">
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

      {/* sidebar */}
      <aside
        dir="rtl"
        className={cn(
          'border-border bg-sidebar absolute inset-y-0 right-0 z-1050 flex w-full max-w-full flex-col overflow-y-auto border-l backdrop-blur-sm transition-transform duration-300 ease-out md:relative md:max-h-none md:w-full md:max-w-md md:translate-x-0 md:transition-none',
          sidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0',
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
          />
        )}
      </aside>
    </div>
  );
};

export default InstantRequestPage;
