import { Loader2, Star, ArrowRight, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProviderReviews } from "../hooks/useProviderReviews";
import type { SubmittedOffer } from "../types/providerOfferTypes";

type Props = {
  offer: SubmittedOffer;
  onDone: () => void;
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}

export default function Step5Reviews({ offer, onDone }: Props) {
  const { data: reviews, isLoading } = useProviderReviews(offer.serviceRequestId);

  return (
    <div className="flex flex-col gap-6 px-4 py-4 sm:px-5 pb-8 h-full" dir="rtl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onDone}
          className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
        <h2 className="text-foreground text-xl font-black">تقييماتي</h2>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 py-12">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
          <p className="text-muted-foreground text-sm font-bold">جاري تحميل التقييمات...</p>
        </div>
      ) : !reviews?.length ? (
        <div className="flex flex-col items-center flex-1 justify-center text-center py-6 gap-3">
          <div className="h-20 w-20 bg-primary/5 rounded-full flex items-center justify-center">
            <Star className="h-9 w-9 text-primary/30" />
          </div>
          <h3 className="text-foreground text-lg font-black">لا توجد تقييمات بعد</h3>
          <p className="text-muted-foreground text-[13px] leading-relaxed max-w-[240px]">
            ستظهر تقييمات العملاء هنا بعد إتمام الخدمة.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3 flex-1 overflow-y-auto">
          {reviews.map((review) => {
            const date = review.createdAt
              ? new Date(review.createdAt).toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : null;

            return (
              <li
                key={review.id}
                className="bg-card rounded-2xl border border-border p-4 space-y-3"
              >
                {/* Client row */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-primary/10 border border-border shrink-0 flex items-center justify-center">
                    {review.clientPictureUrl ? (
                      <img
                        src={review.clientPictureUrl}
                        alt={review.clientName ?? ""}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserCircle2 className="h-5 w-5 text-primary/50" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-extrabold text-foreground truncate">
                      {review.clientName ?? `عميل #${review.serviceRequestId}`}
                    </p>
                    {date && (
                      <span className="text-[11px] text-muted-foreground">{date}</span>
                    )}
                  </div>
                  <StarRating rating={review.rating} />
                </div>

                {/* Message / comment */}
                {(review.message || review.comment) && (
                  <p className="text-xs text-muted-foreground leading-relaxed border-t border-border/50 pt-2">
                    {review.message ?? review.comment}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {/* Done button */}
      <div className="mt-auto pt-2">
        <Button
          onClick={onDone}
          variant="outline"
          className="w-full h-12 rounded-2xl font-bold gap-2 border-primary/40 text-primary hover:bg-primary/5"
        >
          العودة للطلبات
        </Button>
      </div>
    </div>
  );
}