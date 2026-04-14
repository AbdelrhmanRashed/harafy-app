import { useState, useEffect } from "react";
import type { ProviderOfferStep, AvailableRequestItem, SubmittedOffer } from "../types/providerOfferTypes";

const STORAGE_KEY = "provider_offer_progress";

type SavedProgress = {
  step: ProviderOfferStep;
  selectedRequest: AvailableRequestItem | null;
  submittedOffer: SubmittedOffer | null;
};

const loadProgress = (): SavedProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { step: "REQUESTS", selectedRequest: null, submittedOffer: null };
    return JSON.parse(raw);
  } catch {
    return { step: "REQUESTS", selectedRequest: null, submittedOffer: null };
  }
};

const saveProgress = (data: SavedProgress) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const clearProgress = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const useProviderOfferProgress = () => {
  const initial = loadProgress();

  const [step, setStep] = useState<ProviderOfferStep>(initial.step);
  const [selectedRequest, setSelectedRequest] = useState<AvailableRequestItem | null>(initial.selectedRequest);
  const [submittedOffer, setSubmittedOffer] = useState<SubmittedOffer | null>(initial.submittedOffer);

  useEffect(() => {
    saveProgress({ step, selectedRequest, submittedOffer });
  }, [step, selectedRequest, submittedOffer]);

  const reset = () => {
    clearProgress();
    setStep("REQUESTS");
    setSelectedRequest(null);
    setSubmittedOffer(null);
  };

  return {
    step, setStep,
    selectedRequest, setSelectedRequest,
    submittedOffer, setSubmittedOffer,
    reset,
  };
};