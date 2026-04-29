import { useState } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { CheckCircle, XCircle, Loader2, CreditCard, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { queryClient } from '@/lib/queryClient';
import { buyCredits } from '../../api/buyCredits';
import { PACKAGES } from '../../types/constants';
import type { PaymentStatus } from '../../types/types';

interface CheckoutFormProps {
  credits: number;
  onSuccess: () => void;
  status: PaymentStatus;
  setStatus: (status: PaymentStatus) => void;
}

export const CheckoutForm = ({ credits, onSuccess, status, setStatus }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { theme } = useTheme();

  const [errorMsg, setErrorMsg] = useState('');

  const elementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: theme === 'dark' ? '#f8fafc' : '#0f172a',
        fontFamily: 'Inter, system-ui, sans-serif',
        '::placeholder': { color: theme === 'dark' ? '#64748b' : '#94a3b8' },
        iconColor: theme === 'dark' ? '#10b981' : '#059669',
      },
      invalid: {
        color: '#ef4444',
        iconColor: '#ef4444',
      },
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      // Step 1 — get clientSecret from backend
      const { clientSecret } = await buyCredits(credits);

      // Step 2 — confirm payment with Stripe
      const cardNumber = elements.getElement(CardNumberElement);
      if (!cardNumber) throw new Error('Card element not found');

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardNumber },
      });

      if (result.error) {
        setErrorMsg(result.error.message ?? 'حدث خطأ أثناء الدفع');
        setStatus('error');
      } else if (result.paymentIntent?.status === 'succeeded') {
        setStatus('success');
        queryClient.invalidateQueries({ queryKey: ['provider-his-profile'] });
        setTimeout(onSuccess, 3000);
      }
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.message ?? 'فشل الاتصال بالخادم');
      setStatus('error');
    }
  };

  // ── Success screen ──
  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center animate-in fade-in zoom-in-95">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle className="h-10 w-10 text-emerald-600" />
        </div>
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-black text-foreground">تم الدفع بنجاح! </h3>
          <PartyPopper className="h-8 w-8 text-emerald-600" />
        </div>
        <p className="text-sm text-muted-foreground">
          سيتم إضافة <span className="font-bold text-emerald-600">{credits} نقطة</span> إلى رصيدك قريباً.
        </p>
      </div>
    );
  }

  // ── Form ──
  return (
    <form onSubmit={handleSubmit} className="space-y-5 pt-2">
      {/* Card number */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-foreground ps-2 ">رقم البطاقة</label>
        <div className="mt-2 rounded-xl border border-border bg-secondary/30 px-4 py-3 transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20">
          <CardNumberElement options={elementOptions} />
        </div>
      </div>

      {/* Expiry + CVC */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-foreground ps-2">تاريخ الانتهاء</label>
          <div className="mt-2 rounded-xl border border-border bg-secondary/30 px-4 py-3 transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20">
            <CardExpiryElement options={elementOptions} />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-foreground ps-2">CVC</label>
          <div className="mt-2 rounded-xl border border-border bg-secondary/30 px-4 py-3 transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20">
            <CardCvcElement options={elementOptions} />
          </div>
        </div>
      </div>

      {/* Error message */}
      {status === 'error' && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 dark:border-rose-800 dark:bg-rose-950/30">
          <XCircle className="h-4 w-4 shrink-0 text-rose-600" />
          <p className="text-sm font-medium text-rose-700 dark:text-rose-400">{errorMsg}</p>
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={!stripe || status === 'loading'}
        className="h-12 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 font-bold text-white shadow-lg hover:opacity-90 hover:scale-[1.02] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
      >
        {status === 'loading' ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            جاري المعالجة...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            ادفع الآن — {PACKAGES.find((p) => p.id === credits)?.price}
          </span>
        )}
      </Button>
    </form>
  );
};
