import { useState, useCallback, useMemo } from 'react';
import { Menu, X } from 'lucide-react';
import {
  useLocation as useRouterLocation,
  useNavigate,
} from 'react-router-dom';
import MapView from '../../services/components/MapView';
import { cn } from '@/lib/utils';
import { useLocationCustom } from '../../services/hooks/useLocation';
import { useRoute } from '../../services/hooks/useRoute';
import { useGetMyOffers } from '../hooks/useGetMyOffers';

import Step1AvailableRequests from '../components/Step1AvailableRequests';
import Step2CreateOffer from '../components/Step2OffersSidebar';
import Step3WaitingApproval from '../components/Step3WaitingApproval';

import type {
  ProviderOfferStep,
  AvailableRequestItem,
  SubmittedOffer,
} from '../types/providerOfferTypes';

const SIDEBAR_TITLES: Record<string, string> = {
  REQUESTS: 'الطلبات المتاحة',
  CREATE_OFFER: 'تقديم عرض',
  WAITING: 'قيد الانتظار',
};

const RequestsPage = () => {
  const { state } = useRouterLocation();
  const navigate = useNavigate();
  const { data: myOffers } = useGetMyOffers();

  const [sidebarOpen, setSidebarOpen] = useState(
    !!(
      state?.request &&
      typeof window !== 'undefined' &&
      window.innerWidth < 768
    ),
  );

  const [selectedRequest, setSelectedRequest] =
    useState<AvailableRequestItem | null>(state?.request ?? null);

  const [step, setStep] = useState<ProviderOfferStep>(
    state?.step === 'WAITING'
      ? 'WAITING'
      : state?.request
        ? 'CREATE_OFFER'
        : 'REQUESTS',
  );

  const [submittedOffer, setSubmittedOffer] = useState<SubmittedOffer | null>(
    state?.offer ?? null,
  );

  const {
    position: providerPos,
    setPosition: setProviderPos,
    searchAddress,
  } = useLocationCustom();

  const requestPos = useMemo(() => {
    if (!selectedRequest?.serviceRequestLocation) return null;
    return {
      lat: selectedRequest.serviceRequestLocation.latitude,
      lng: selectedRequest.serviceRequestLocation.longitude,
    };
  }, [selectedRequest]);

  const { route } = useRoute(requestPos, providerPos);
  const mapCenter = useMemo(
    () => requestPos ?? providerPos,
    [requestPos, providerPos],
  );

  const handleSelectRequest = useCallback((request: AvailableRequestItem) => {
    setSelectedRequest(request);
    setStep('CREATE_OFFER');
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setSidebarOpen(true);
    }
  }, []);

  const handleOpenExistingOffer = useCallback(
    (request: AvailableRequestItem) => {
      const offerData = myOffers?.find((o) => o.id === request.offerId);
      setSelectedRequest(request);
      setSubmittedOffer({
        offerId: request.offerId!,
        serviceRequestId: request.id,
        price: offerData?.price ?? 0,
        message: offerData?.message ?? undefined,
      });
      setStep('WAITING');
      setSidebarOpen(true);
    },
    [myOffers],
  );

  const handleOfferCreated = useCallback((offer: SubmittedOffer) => {
    setSubmittedOffer(offer);
    setStep('WAITING');
  }, []);

  const handleCancelled = useCallback(() => {
    setSubmittedOffer(null);
    setSelectedRequest(null);
    setStep('REQUESTS');
  }, []);

  const handleAccepted = useCallback(() => {
    if (submittedOffer?.serviceRequestId) {
      navigate(
        `/provider/requests/ordertrack/${submittedOffer.serviceRequestId}`,
        {
          state: { request: selectedRequest },
        },
      );
    }
  }, [submittedOffer, selectedRequest, navigate]);

  return (
    <div
      className="bg-background relative flex h-[calc(100vh-8rem)] flex-col overflow-hidden md:h-[calc(100vh-4rem)] md:flex-row"
      dir="ltr"
    >
      {/* Map — fills all remaining space beside the sidebar */}
      <div className="relative flex-1 transition-all duration-300 z-0">
        <div className="absolute inset-0">
          <MapView
            onLocationSelect={setProviderPos}
            center={mapCenter}
            customerPos={requestPos ?? providerPos}
            providers={[]}
            selectedProvider={null}
            route={route}
            onProviderSelect={() => {}}
            onAddressSearch={searchAddress}
          />
        </div>
      </div>

      {/* Sidebar - Bottom Sheet on Mobile */}
      <aside
        dir="rtl"
        className={cn(
          'bg-background/95 z-[1000] flex w-full flex-col rounded-t-3xl border-t shadow-[0_-10px_40px_rgba(0,0,0,0.1)] backdrop-blur-xl transition-all duration-300 ease-in-out',
          'absolute right-0 bottom-0 left-0 md:relative md:w-full md:max-w-[420px] md:rounded-none md:border-t-0 md:border-l md:shadow-none md:backdrop-blur-none',
          sidebarOpen
            ? 'h-[85vh] translate-y-0 md:h-full'
            : 'h-[45vh] translate-y-0 md:h-full',
        )}
      >
        <div
          className="flex w-full cursor-pointer justify-center pb-1 pt-3 md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <div className="bg-muted-foreground/30 h-1.5 w-12 rounded-full" />
        </div>
        
        <div className="border-border flex shrink-0 items-center justify-between border-b px-4 py-3 md:hidden">
          <h2 className="text-foreground text-sm font-bold">
            {SIDEBAR_TITLES[step]}
          </h2>
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-primary bg-primary/10 hover:bg-primary/20 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors"
          >
            {sidebarOpen ? 'تصغير' : 'تكبير'}
          </button>
        </div>

        {/* Step content */}
        <div className="flex-1 overflow-y-auto">
          {step === 'REQUESTS' && (
            <Step1AvailableRequests
              onSelectRequest={handleSelectRequest}
              onOpenExistingOffer={handleOpenExistingOffer}
              selectedRequestId={selectedRequest?.id ?? null}
            />
          )}

          {step === 'CREATE_OFFER' && selectedRequest && (
            <Step2CreateOffer
              request={selectedRequest}
              onBack={() => {
                setSelectedRequest(null);
                setStep('REQUESTS');
              }}
              onOfferCreated={handleOfferCreated}
            />
          )}

          {step === 'WAITING' && submittedOffer && (
            <Step3WaitingApproval
              offer={submittedOffer}
              onCancelled={handleCancelled}
              onAccepted={handleAccepted}
            />
          )}
        </div>
      </aside>
    </div>
  );
};

export default RequestsPage;
