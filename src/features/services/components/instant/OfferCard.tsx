import {
  Loader2,
  MessageSquare,
  User,
  Check,
  MapPin,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getImageUrl, getTimeAgo } from '@/lib/utils';
import type { RequestOfferItem } from './types';
import { useGetProviderData } from '../../hooks/useGetProviderData';

type OfferCardProps = {
  offer: RequestOfferItem;
  onAccept: () => void;
  disabled?: boolean;
  isSubmitting?: boolean;
};

export default function OfferCard({
  offer,
  onAccept,
  disabled,
  isSubmitting,
}: OfferCardProps) {
  const { data: providerProfile } = useGetProviderData(
    String(offer?.providerId),
  );

  return (
    <li className="group border-border bg-card relative mt-2 flex w-[360px] flex-col gap-4 overflow-hidden rounded-3xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* ✨ glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="from-primary/5 to-primary/5 absolute inset-0 bg-gradient-to-r via-transparent" />
      </div>

      {/* 👤 Header */}
      <div className="relative z-10 flex items-start justify-between gap-3">
        {/* left */}
        <div className="flex flex-1 items-start gap-3">
          {/* 🖼️ Avatar */}
          <div className="relative">
            <div className="border-primary/10 bg-primary/5 h-14 w-14 overflow-hidden rounded-2xl border shadow-sm">
              {offer.providerPictureUrl ? (
                <img
                  src={getImageUrl(offer.providerPictureUrl)}
                  alt={offer.providerName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="text-primary/40 h-full w-full p-3" />
              )}
            </div>

            {/* 🟢 online */}
            <div className="absolute -top-1 -left-1 h-3 w-3 rounded-full border-2 border-white bg-green-500 shadow" />
          </div>

          {/* 🧠 Info */}
          <div className="flex flex-col gap-1 text-right">
            {/* name */}
            <span className="text-foreground text-lg leading-tight font-extrabold">
              {offer.providerName}
            </span>

            {/* ⭐ rating + reviews */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1 rounded-md bg-amber-50 px-2 py-[2px]">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="text-[11px] font-bold text-amber-700">
                  {providerProfile?.rating?.toFixed(1) || '—'}
                </span>
              </div>

              <span className="text-muted-foreground/80">
                ({providerProfile?.reviewsCount ?? 0})
              </span>
            </div>
          </div>
        </div>

        {/* 💰 price */}
        <div className="flex flex-col items-end gap-1">
          <span className="bg-primary rounded-xl px-4 py-1.5 text-lg font-extrabold text-white shadow-md">
            {offer.price != null
              ? new Intl.NumberFormat('en-EG').format(offer.price)
              : '—'}{' '}
            <span className="text-xs font-semibold">ج.م</span>
          </span>

          <span className="text-muted-foreground text-xs font-medium">
            {offer.createdAt
              ? getTimeAgo(
                  new Date(
                    offer.createdAt +
                      (offer.createdAt.endsWith('Z') ? '' : 'Z'),
                  ),
                )
              : '--'}
          </span>
        </div>
      </div>
      {/* 📍 location */}
      {providerProfile?.baseLocation?.addressText && (
        <div className="text-muted-foreground flex max-w-full items-center gap-1 text-[11px]">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="truncate">
            {providerProfile.baseLocation.addressText}
          </span>
        </div>
      )}
      {/* 💬 message */}
      {offer.message && (
        <div className="bg-muted/50 group-hover:bg-muted relative z-10 flex items-start gap-2 rounded-2xl px-4 py-3 transition-colors">
          <MessageSquare className="text-primary/60 mt-1 h-4 w-4" />
          <p className="text-muted-foreground text-sm leading-relaxed font-medium">
            {offer.message}
          </p>
        </div>
      )}

      {/* 🚀 action */}
      <Button
        type="button"
        variant="gradient"
        className="relative z-10 mt-2 w-full rounded-2xl py-6 text-base font-bold shadow-md transition-all duration-200 active:scale-[0.97]"
        disabled={disabled || isSubmitting}
        onClick={onAccept}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            جاري التعيين...
          </>
        ) : (
          <>
            <Check className="mr-2 h-4 w-4" />
            قبول العرض
          </>
        )}
      </Button>
    </li>
  );
}
