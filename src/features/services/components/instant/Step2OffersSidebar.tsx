import { useMemo } from "react";
import { Loader2 } from "lucide-react";
import { useGetRequestOffer } from "../../hooks/useGetRequestOffer";
import OfferCard from "./OfferCard";
import type { RequestOfferItem } from "./types";

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
};

export default function Step2OffersSidebar({
  requestId,
  onAccept,
  isAssigning,
}: Step2OffersSidebarProps) {
  const { data: raw, isFetching } = useGetRequestOffer(requestId, {
    enabled: !!requestId,
    refetchInterval: 10000,
  });

  const offers = useMemo(() => normalizeOffers(raw), [raw]);

  return (
    <div className="flex flex-col gap-4 px-4 py-4 sm:px-5">
      <div className="text-right">
        <h2 className="text-foreground text-lg font-black">عروض الحرفيين</h2>
        <p className="text-muted-foreground mt-1 text-xs">
          يتم التحديث تلقائياً كل 10 ثوانٍ. اختر محترفاً ثم اضغط قبول.
        </p>
      </div>

      {isFetching && offers.length === 0 ? (
        <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 py-12 text-sm font-bold">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
          جاري تحميل العروض...
        </div>
      ) : offers.length === 0 ? (
        <div className="border-border bg-muted/30 flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed px-4 py-10 text-center">
          <p className="text-foreground font-bold">لا توجد عروض بعد</p>
          <p className="text-muted-foreground text-xs leading-relaxed">
            انتظر حتى يرسل الحرفيين عروضهم لهذا الطلب.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
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
    </div>
  );
}
