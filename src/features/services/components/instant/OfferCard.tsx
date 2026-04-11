import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <li className="border-border bg-card rounded-2xl border p-4 text-right shadow-sm">
      <p className="text-foreground font-extrabold">{offer.providerName}</p>
      <p className="text-primary mt-1 text-sm font-bold">
        {offer.price != null ? `${offer.price} ج.م` : "—"}
      </p>
      {offer.message ? (
        <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
          {offer.message}
        </p>
      ) : null}
      <Button
        type="button"
        variant="gradient"
        className="mt-4 w-full rounded-xl font-bold"
        disabled={disabled || isSubmitting}
        onClick={onAccept}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            جاري التعيين...
          </>
        ) : (
          "قبول"
        )}
      </Button>
    </li>
  );
}
