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
    <div className="bg-background relative flex h-[calc(100vh-64px)] flex-col overflow-hidden md:flex-row">
      {/* Sidebar */}
      <aside
        className={cn(
          // Mobile: fixed full-screen drawer from right
          'border-border bg-sidebar fixed inset-y-0 right-0 z-1100 flex w-full flex-col overflow-y-auto border-l backdrop-blur-sm transition-transform duration-300 ease-out',
          // Desktop: static side panel, always visible, not overlapping the map
          'md:relative md:inset-auto md:z-auto md:w-[420px] md:shrink-0 md:translate-x-0 md:border-l md:transition-none',
          sidebarOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {/* Mobile header */}
        <div className="border-border flex shrink-0 items-center justify-between border-b px-4 py-3 md:hidden">
          <h2 className="text-foreground text-sm font-bold">
            {SIDEBAR_TITLES[step]}
          </h2>
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

      {/* Backdrop — fixed to match the fixed sidebar */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="إغلاق"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-90 bg-black/50 md:hidden"
        />
      )}

      {/* Toggle button */}
      {!sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="bg-background absolute bottom-6 left-4 z-9999 flex h-10 w-10 items-center justify-center rounded-full shadow-md md:hidden"
        >
          <Menu className="text-foreground h-5 w-5" />
        </button>
      )}

      {/* Map — fills all remaining space beside the sidebar */}
      <div className="relative h-full min-h-[300px] flex-1 overflow-hidden">
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
  );
};

export default RequestsPage;
