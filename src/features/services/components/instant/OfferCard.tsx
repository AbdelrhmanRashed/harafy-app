import { Loader2, MessageCircleCode, MessageSquare, User, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTimeAgo } from "@/lib/utils";
import type { RequestOfferItem } from "./types";

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
  return (
    <li className="border-border bg-card hover:border-primary/30 group relative flex flex-col gap-4 rounded-[24px] border p-4 shadow-sm transition-all hover:shadow-md cursor-default w-[350px]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-1 items-center gap-3">
          <div className="bg-primary/5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/10 overflow-hidden">
            {offer.providerPictureUrl ? (
              <img
                src={offer.providerPictureUrl}
                alt={offer.providerName}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-6 w-6 text-primary/50" />
            )}
          </div>

          <div className="flex flex-col text-right">
            <span className="text-foreground text-xl font-bold line-clamp-1">
              {offer.providerName}
            </span>
            <span className="text-muted-foreground mt-0.5 text-xs font-semibold tracking-wide">
              عرض جديد
            </span>
          </div>
        </div>

        <div className=" flex shrink-0  gap-2  px-3 py-1.5 font-bold flex-col items-center">
          <span className="text-lg leading-none bg-primary/10 text-primary rounded-full px-4 py-1">
            {offer.price != null ? offer.price : "—"} ج.م
          </span>

          {/* "createdAt": "2026-04-12T04:44:19.0476638" */}
          <span className="text-xs ">
            {offer.createdAt 
              ? getTimeAgo(new Date(offer.createdAt + (offer.createdAt.endsWith("Z") ? "" : "Z")))
              : "--"}
          </span>
        </div>
      </div>

      {offer.message ? (
        <div className="bg-muted/40 rounded-[16px] px-4 py-3 text-right flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary/50" />
          <p className="text-muted-foreground  font-medium leading-relaxed">
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
          "قبول العرض"
        )}
      </Button>
    </li>
  );
}
