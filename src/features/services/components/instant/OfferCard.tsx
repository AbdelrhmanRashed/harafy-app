import { Loader2, MessageSquare, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getImageUrl, getTimeAgo } from '@/lib/utils';
import type { RequestOfferItem } from './types';

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
  console.log(offer);
  return (
    <li className="border-border bg-card hover:border-primary/30 group relative flex w-[350px] cursor-default flex-col gap-4 rounded-[24px] border p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-1 items-center gap-3">
          <div className="bg-primary/5 border-primary/10 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border">
            {offer.providerPictureUrl ? (
              <img
                src={getImageUrl(offer.providerPictureUrl)}
                alt={offer.providerName}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="text-primary/50 h-6 w-6" />
            )}
          </div>

          <div className="flex flex-col text-right">
            <span className="text-foreground line-clamp-1 text-xl font-bold">
              {offer.providerName}
            </span>
            <span className="text-muted-foreground mt-0.5 text-xs font-semibold tracking-wide">
              عرض جديد
            </span>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-2 px-3 py-1.5 font-bold">
          <span className="bg-primary/10 text-primary rounded-full px-4 py-1 text-lg leading-none font-bold">
            {offer.price != null
              ? new Intl.NumberFormat('en-EG').format(offer.price)
              : '—'}
            <span className="mr-1 text-sm">ج.م</span>
          </span>

          <span className="text-xs">
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

      {offer.message ? (
        <div className="bg-muted/40 flex items-center gap-2 rounded-[16px] px-4 py-3 text-right">
          <MessageSquare className="text-primary/50 h-4 w-4" />
          <p className="text-muted-foreground leading-relaxed font-medium">
            {offer.message}
          </p>
        </div>
      ) : null}

      <Button
        type="button"
        variant="gradient"
        className="mt-1 w-full rounded-2xl py-6 font-bold shadow-none transition-transform active:scale-[0.98]"
        disabled={disabled || isSubmitting}
        onClick={onAccept}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            جاري التعيين...
          </>
        ) : (
          'قبول العرض'
        )}
      </Button>
    </li>
  );
}
