import { useMemo } from "react";
import { Loader2, RefreshCw, UserSearch, Zap, XCircle } from "lucide-react";
import { useGetRequestOffer } from "../../hooks/useGetRequestOffer";
import OfferCard from "./OfferCard";
import type { RequestOfferItem } from "./types";
import { Button } from "@/components/ui/button";

function normalizeOffers(raw: unknown): RequestOfferItem[] {
  if (!raw) return [];
  let list: unknown[] = [];
  if (Array.isArray(raw)) list = raw;
  else if (typeof raw === "object" && raw !== null && "data" in raw) {
    const d = (raw as { data?: unknown }).data;
    if (Array.isArray(d)) list = d;
  }
  return list
    .map((o) => {
      const x = o as Record<string, unknown>;
      const providerId = Number(x.providerId ?? x.ProviderId);
      if (!Number.isFinite(providerId)) return null;
      return {
        id: Number(x.id),
        providerId,
        providerName: String(x.providerName ?? x.ProviderName ?? ""),
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
  const { data: raw, isFetching } = useGetRequestOffer(requestId, {
    enabled: !!requestId,
    refetchInterval: 10000,
  });

  const offers = useMemo(() => normalizeOffers(raw), [raw]);

  return (
    <div className="flex flex-col gap-6 px-4 py-4 sm:px-5 pb-8 h-full relative">
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-xl font-black">عروض المحترفين</h2>
        <div className="bg-primary/10 text-primary flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold">
          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
          مباشر
        </div>
      </div>

      <div className="bg-primary/5 rounded-2xl px-5 py-4 flex items-center gap-4">
        <RefreshCw className="h-5 w-5 text-primary shrink-0" />
        <p className="text-muted-foreground text-xs leading-relaxed font-semibold">
          يتم التحديث تلقائياً كل 10 ثوان. اختر محترفاً ثم اضغط قبول.
        </p>
      </div>

      {isFetching && offers.length === 0 ? (
        <div className="text-muted-foreground flex flex-1 flex-col items-center justify-center gap-2 py-12 text-sm font-bold">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
          جاري تحميل العروض...
        </div>
      ) : offers.length === 0 ? (
        <div className="flex flex-col items-center flex-1 justify-center text-center py-6">
          <div className="relative mb-8">
            <div className="h-32 w-32 bg-primary/5 rounded-full outline outline-[12px] outline-primary/5 flex items-center justify-center">
              <UserSearch className="h-14 w-14 text-primary/40" />
            </div>
            <div className="absolute top-1 right-1 h-6 w-6 bg-[#B591E8] rounded-full border-[3px] border-white flex items-center justify-center shadow-sm">
              <Zap className="h-3 w-3 text-white fill-current" />
            </div>
          </div>
          
          <h3 className="text-foreground text-xl font-black">لا توجد عروض بعد</h3>
          <p className="text-muted-foreground text-[13px] leading-relaxed mt-3 max-w-[280px]">
            انتظر حتى يرسل الحرفيين عروضهم لهذا الطلب. سنقوم بإبلاغك فور وصول أول عرض.
          </p>

          <div className="mt-12 flex flex-col items-center gap-3 w-full max-w-[220px]">
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden relative" dir="ltr">
              <div
                className="absolute inset-y-0 left-0 w-1/3 bg-[#7C3AED] rounded-full transition-transform"
                style={{
                  animation: 'slide-loader 1.5s ease-in-out infinite alternate',
                }}
              />
            </div>
            <span className="text-[9px] font-bold text-muted-foreground tracking-[0.1em] uppercase">
              Searching nearby professionals
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
        <ul className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1 -mr-1">
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
            className="w-full text-lg rounded-2xl bg-red-500   hover:bg-red-600 py-6 font-bold text-white hover:text-white transition-all cursor-pointer"
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
