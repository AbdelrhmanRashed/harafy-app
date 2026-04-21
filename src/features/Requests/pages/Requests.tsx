import { useState, useCallback, useMemo } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation as useRouterLocation, useNavigate } from 'react-router-dom';
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

const SIDEBAR_TITLES: Record<ProviderOfferStep, string> = {
  REQUESTS: 'الطلبات المتاحة',
  CREATE_OFFER: 'تقديم عرض',
  WAITING: 'قيد الانتظار',
};

const RequestsPage = () => {
  const { state } = useRouterLocation();
  const navigate = useNavigate();
  const { data: myOffers } = useGetMyOffers();

  const [sidebarOpen, setSidebarOpen] = useState(
    !!(state?.request && typeof window !== 'undefined' && window.innerWidth < 768),
  );

  const [selectedRequest, setSelectedRequest] =
    useState<AvailableRequestItem | null>(state?.request ?? null);

  const [step, setStep] = useState<ProviderOfferStep>(
    state?.step === 'WAITING' ? 'WAITING'
    : state?.request ? 'CREATE_OFFER'
    : 'REQUESTS'
  );

  const [submittedOffer, setSubmittedOffer] = useState<SubmittedOffer | null>(
    state?.offer ?? null
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
  const mapCenter = useMemo(() => requestPos ?? providerPos, [requestPos, providerPos]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleSelectRequest = useCallback((request: AvailableRequestItem) => {
    setSelectedRequest(request);
    setStep('CREATE_OFFER');
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, []);

  const handleOpenExistingOffer = useCallback((request: AvailableRequestItem) => {
    const offerData = myOffers?.find((o) => o.id === request.offerId);
    setSelectedRequest(request);
    setSubmittedOffer({
      offerId: request.offerId!,
      serviceRequestId: request.id,
      price: offerData?.price ?? 0,
      message: offerData?.message ?? undefined,
    });
    setStep('WAITING');
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [myOffers]);

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
    navigate(`/provider/requests/ordertrack/${submittedOffer.serviceRequestId}`, {
      state: { request: selectedRequest }, // ← pass selectedRequest
    });
  }
}, [submittedOffer, selectedRequest, navigate]);


  return (
    <div className="bg-background flex h-[calc(100vh-64px)] flex-col overflow-hidden font-[Cairo,sans-serif] md:flex-row">
      {/* Mobile toggle button */}
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

      {/* Sidebar */}
      <aside
        dir="rtl"
        className={cn(
          'border-border bg-sidebar absolute inset-y-0 right-0 z-30 flex w-full flex-col overflow-y-auto border-l backdrop-blur-sm transition-transform duration-300 ease-out',
          'md:relative md:w-full md:max-w-md md:translate-x-0 md:transition-none',
          sidebarOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {/* Mobile header */}
        <div className="border-border flex shrink-0 items-center justify-between border-b px-4 py-3 md:hidden">
          <h2 className="text-foreground text-sm font-bold">{SIDEBAR_TITLES[step]}</h2>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="hover:bg-muted flex h-8 w-8 items-center justify-center rounded-full"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Step content */}
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
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="إغلاق"
          onClick={() => setSidebarOpen(false)}
          className="absolute inset-0 z-20 bg-black/50 md:hidden"
        />
      )}

      {/* Map */}
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
  );
};

export default RequestsPage;