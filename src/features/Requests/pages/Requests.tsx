import { useState, useCallback, useMemo } from "react";
import { Menu, X } from "lucide-react";
import MapView from "../../services/components/MapView";
import { cn } from "@/lib/utils";
import { useLocation } from "../../services/hooks/useLocation";
import { useRoute } from "../../services/hooks/useRoute";

import Step1AvailableRequests from "../components/Step1AvailableRequests ";
import Step2CreateOffer from "../components/Step2OffersSidebar";
import Step3WaitingApproval from "../components/Step3WaitingApproval";
import Step4Accepted from "../components/Step4Accepted";
import Step5Reviews from "../components/Step5Reviews";

import type { ProviderOfferStep, AvailableRequestItem, SubmittedOffer } from "../types/providerOfferTypes";

const SIDEBAR_TITLES: Record<ProviderOfferStep, string> = {
  REQUESTS: "الطلبات المتاحة",
  CREATE_OFFER: "تقديم عرض",
  WAITING: "في انتظار الموافقة",
  ACCEPTED: "تم قبول العرض",
  REVIEW: "التقييمات",
};

const RequestsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [step, setStep] = useState<ProviderOfferStep>("REQUESTS");
  const [selectedRequest, setSelectedRequest] = useState<AvailableRequestItem | null>(null);
  const [submittedOffer, setSubmittedOffer] = useState<SubmittedOffer | null>(null);

  const {
    position: providerPos,
    setPosition: setProviderPos,
    searchAddress,
  } = useLocation();

  const requestPos = useMemo(() => {
    if (!selectedRequest?.serviceRequestLocation) return null;
    return {
      lat: selectedRequest.serviceRequestLocation.latitude,
      lng: selectedRequest.serviceRequestLocation.longitude,
    };
  }, [selectedRequest]);

  const { route } = useRoute(requestPos, providerPos);

  const mapCenter = useMemo(() => requestPos ?? providerPos, [requestPos, providerPos]);

  const handleSelectRequest = useCallback((request: AvailableRequestItem) => {
    setSelectedRequest(request);
    setStep("CREATE_OFFER");
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, []);

  const handleOfferCreated = useCallback((offer: SubmittedOffer) => {
    setSubmittedOffer(offer);
    setStep("WAITING");
  }, []);

  const handleCancelled = useCallback(() => {
    setSubmittedOffer(null);
    setSelectedRequest(null);
    setStep("REQUESTS");
  }, []);

  return (
    <div
      dir="ltr"
      className="bg-background flex h-[calc(100vh-64px)] flex-col overflow-hidden font-[Cairo,sans-serif] md:flex-row"
    >
      {/* Mobile toggle button */}
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

      {/* Map */}
      <div className="relative min-h-[40vh] flex-1 md:min-h-0">
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

      {/* Sidebar */}
      <aside
        dir="rtl"
        className={cn(
          "border-border bg-sidebar absolute inset-y-0 right-0 z-[1050] flex w-full max-w-full flex-col overflow-y-auto border-l backdrop-blur-sm transition-transform duration-300 ease-out",
          "md:relative md:max-h-none md:w-full md:max-w-md md:translate-x-0 md:transition-none",
          sidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0",
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
        {step === "REQUESTS" && (
          <Step1AvailableRequests
            onSelectRequest={handleSelectRequest}
            selectedRequestId={selectedRequest?.id ?? null}
          />
        )}

        {step === "CREATE_OFFER" && selectedRequest && (
          <Step2CreateOffer
            request={selectedRequest}
            onBack={() => {
              setSelectedRequest(null);
              setStep("REQUESTS");
            }}
            onOfferCreated={handleOfferCreated}
          />
        )}

        {step === "WAITING" && submittedOffer && (
          <Step3WaitingApproval
            offer={submittedOffer}
            onCancelled={handleCancelled}
            onAccepted={() => setStep("ACCEPTED")}
          />
        )}

        {step === "ACCEPTED" && submittedOffer && (
          <Step4Accepted
            offer={submittedOffer}
            onGoToReview={() => setStep("REVIEW")}
          />
        )}

        {step === "REVIEW" && submittedOffer && (
          <Step5Reviews
            offer={submittedOffer}
            onDone={handleCancelled}
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
    </div>
  );
};

export default RequestsPage;