import { useState } from "react";
import type { ProviderOfferStep, AvailableRequestItem, SubmittedOffer } from "../types/providerOfferTypes";
import Step1AvailableRequests from "./Step1AvailableRequests ";
import Step2CreateOffer from "./Step2OffersSidebar";
import Step3WaitingApproval from "./Step3WaitingApproval";

export default function ProviderOfferFlow() {
  const [step, setStep] = useState<ProviderOfferStep>("REQUESTS");
  const [selectedRequest, setSelectedRequest] = useState<AvailableRequestItem | null>(null);
  const [submittedOffer, setSubmittedOffer] = useState<SubmittedOffer | null>(null);

  const handleSelectRequest = (request: AvailableRequestItem) => {
    setSelectedRequest(request);
    setStep("CREATE_OFFER");
  };

  const handleOfferCreated = (offer: SubmittedOffer) => {
    setSubmittedOffer(offer);
    setStep("WAITING");
  };

  const handleCancelled = () => {
    setSubmittedOffer(null);
    setSelectedRequest(null);
    setStep("REQUESTS");
  };

  const handleAccepted = () => {
    console.log("Offer accepted! Navigate to tracking.");
  };

  if (step === "CREATE_OFFER" && selectedRequest) {
    return (
      <Step2CreateOffer
        request={selectedRequest}
        onBack={() => setStep("REQUESTS")}
        onOfferCreated={handleOfferCreated}
      />
    );
  }

  if (step === "WAITING" && submittedOffer) {
    return (
      <Step3WaitingApproval
        offer={submittedOffer}
        onCancelled={handleCancelled}
        onAccepted={handleAccepted}
      />
    );
  }

  return (
    <Step1AvailableRequests
      onSelectRequest={handleSelectRequest}
      selectedRequestId={selectedRequest?.id ?? null}
    />
  );
}