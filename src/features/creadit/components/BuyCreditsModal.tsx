import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { queryClient } from '@/lib/queryClient';
import type { ProviderProfile } from '@/features/profile/types/providerProfileTypes';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CheckoutForm } from './BuyCredits/CheckoutForm';
import { PackageSelector } from './BuyCredits/PackageSelector';
import type { PaymentStatus } from '../types/types';

// ─── Stripe Promise (loaded once) ───────────────────────────────────────────
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string
);

// ─── Public Modal Component ───────────────────────────────────────────────────
interface BuyCreditsModalProps {
  open: boolean;
  onClose: () => void;
}

export const BuyCreditsModal = ({ open, onClose }: BuyCreditsModalProps) => {
  const [selectedCredits, setSelectedCredits] = useState(100);
  const [status, setStatus] = useState<PaymentStatus>('idle');

  // Reset status when modal opens/closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => setStatus('idle'), 300); // reset after animation
    }
  }, [open]);

  const handleSuccess = () => {
    onClose();

    queryClient.setQueryData<ProviderProfile | undefined>(
      ['provider-his-profile'],
      (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          credits: oldData.credits + selectedCredits,
        };
      }
    );

    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['provider-his-profile'] });
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-md h-fit rounded-3xl border-0 p-0 shadow-2xl overflow-hidden"
      >
        {/* Gradient header */}
        <div className="relative bg-gradient-to-br from-emerald-600 to-teal-500 px-6 pt-6 pb-8 text-white text-center">
          <div className="absolute -bottom-6 left-0 right-0 h-10 rounded-t-3xl bg-card" />
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-white">شحن الرصيد</DialogTitle>
          </DialogHeader>
          <p className="mt-1 text-sm text-emerald-100">اختر الباقة المناسبة وادفع بأمان</p>
        </div>

        <div className="px-6 pb-6 space-y-6">
          <PackageSelector
            selectedCredits={selectedCredits}
            setSelectedCredits={setSelectedCredits}
            status={status}
          />

          {/* Stripe Elements checkout */}
          <Elements stripe={stripePromise}>
            <CheckoutForm
              credits={selectedCredits}
              onSuccess={handleSuccess}
              status={status}
              setStatus={setStatus}
            />
          </Elements>
        </div>
      </DialogContent>
    </Dialog>
  );
};
