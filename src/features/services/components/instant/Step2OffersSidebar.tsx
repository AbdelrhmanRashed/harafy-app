import { useMemo } from 'react';
import { Loader2, RefreshCw, UserSearch, Zap, XCircle } from 'lucide-react';
import { useGetRequestOffer } from '../../hooks/useGetRequestOffer';
import OfferCard from './OfferCard';
import type { RequestOfferItem } from './types';
import { Button } from '@/components/ui/button';

function normalizeOffers(raw: unknown): RequestOfferItem[] {
  if (!raw) return [];
  let list: unknown[] = [];
  if (Array.isArray(raw)) list = raw;
  else if (typeof raw === 'object' && raw !== null && 'data' in raw) {
    const d = (raw as { data?: unknown }).data;
    if (Array.isArray(d)) list = d;
  }
  return list
    .map((o): RequestOfferItem | null => {
      const x = o as Record<string, unknown>;
      const providerId = Number(x.providerId ?? x.ProviderId);
      if (!Number.isFinite(providerId)) return null;
      return {
        id: Number(x.id),
        providerId,
        providerName: String(x.providerName ?? x.ProviderName ?? ''),
        providerPictureUrl: x.providerPictureUrl as string | null | undefined,
        price: Number(x.price ?? x.Price ?? 0),
        message: (x.message ?? x.Message) as string | undefined,
        createdAt: x.createdAt as string | undefined,
      };
    })
    .filter((x): x is RequestOfferItem => x != null);
}

type Step2OffersSidebarProps = {
  requestId: string;
  onAccept: (providerId: number) => void;
  isAssigning?: boolean;
  onCancel?: () => void;
  isCancelling?: boolean;
};

export default function Step2OffersSidebar({
  requestId,
  onAccept,
  isAssigning,
  onCancel,
  isCancelling,
}: Step2OffersSidebarProps) {
  const { data: raw } = useGetRequestOffer(requestId, {
    enabled: !!requestId,
    refetchInterval: 3000,
  });

  const offers = useMemo(() => normalizeOffers(raw), [raw]);

  return (
    <div className="relative flex h-full flex-col gap-6 px-4 py-4 pb-8 sm:px-5">
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-xl font-black">عروض الحرفيين</h2>
        <div className="bg-primary/10 text-primary flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold">
          <div className="bg-primary h-1.5 w-1.5 rounded-full" />
          مباشر
        </div>
      </div>

      <div className="bg-primary/5 flex items-center gap-4 rounded-2xl px-5 py-4">
        <RefreshCw className="text-primary h-5 w-5 shrink-0" />
        <p className="text-muted-foreground text-xs leading-relaxed font-semibold">
          جارى البحث عن الحرفيين بالقرب منك
        </p>
      </div>

      {offers.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center py-6 text-center">
          <div className="relative mb-8">
            <div className="bg-primary/5 outline-primary/5 flex h-32 w-32 items-center justify-center rounded-full outline outline-[12px]">
              <UserSearch className="text-primary/40 h-14 w-14" />
            </div>
            <div className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full border-[3px] border-white bg-[#B591E8] shadow-sm">
              <Zap className="h-3 w-3 fill-current text-white" />
            </div>
          </div>

          <h3 className="text-foreground text-xl font-black">
            لا توجد عروض بعد
          </h3>
          <p className="text-muted-foreground mt-3 max-w-[280px] text-[13px] leading-relaxed">
            انتظر حتى يرسل الحرفيين عروضهم لهذا الطلب. سنقوم بإبلاغك فور وصول
            أول عرض.
          </p>

          <div className="mt-12 flex w-full max-w-[220px] flex-col items-center gap-3">
            <div
              className="bg-muted relative h-1.5 w-full overflow-hidden rounded-full"
              dir="ltr"
            >
              <div
                className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-[#7C3AED] transition-transform"
                style={{
                  animation: 'slide-loader 1.5s ease-in-out infinite alternate',
                }}
              />
            </div>
            <span className="text-muted-foreground text-[9px] font-bold tracking-[0.1em] uppercase">
              جار البحث عن حرفيين بالقرب منك...
            </span>
          </div>

          <style>{`
            @keyframes slide-loader {
              0% { transform: translateX(0); }
              100% { transform: translateX(200%); }
            }
          `}</style>
        </div>
      ) : (
        <ul className="-mr-1 flex flex-1 flex-col gap-3 overflow-y-auto pr-1">
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              isSubmitting={isAssigning}
              onAccept={() => onAccept(offer.providerId)}
            />
          ))}
        </ul>
      )}

      {onCancel && (
        <div className="mt-auto pt-2 pb-2">
          <Button
            variant="outline"
            className="w-full cursor-pointer rounded-2xl bg-red-500 py-6 text-lg font-bold text-white transition-all hover:bg-red-600 hover:text-white"
            onClick={onCancel}
            disabled={isCancelling}
          >
            {isCancelling ? (
              <Loader2 className="ml-2 h-5 w-5 animate-spin" />
            ) : (
              <XCircle className="ml-2 h-5 w-5 text-white" />
            )}
            إلغاء الطلب
          </Button>
        </div>
      )}
    </div>
  );
}
