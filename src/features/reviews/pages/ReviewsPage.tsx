import { Star, Loader2 } from "lucide-react";
import { useMyProviderReviews } from "../hooks/useMyProviderReviews";
import { useCurrentProviderId } from "../../dashboard/hooks/useCurrentProviderId";

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sz = size === "lg" ? "h-6 w-6" : size === "md" ? "h-4 w-4" : "h-3 w-3";
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${sz} ${
            i < rating
              ? "text-amber-400 fill-amber-400"
              : "text-muted-foreground/20 fill-muted-foreground/20"
          }`}
        />
      ))}
    </div>
  );
}

function RatingBar({ star, count, total }: { star: number; count: number; total: number }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground w-3">{star}</span>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-muted-foreground w-6 text-left">{count}</span>
    </div>
  );
}

export default function ReviewsPage() {
  const providerId = useCurrentProviderId();
  const { data: reviews, isLoading } = useMyProviderReviews(providerId);

  const total = reviews?.length ?? 0;
  const avg =
    total > 0
      ? (reviews!.reduce((s, r) => s + r.rating, 0) / total).toFixed(1)
      : "0.0";

  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews?.filter((r) => r.rating === star).length ?? 0,
  }));

  return (
    <div className="min-h-screen mt-2 max-w-7xl mx-auto" dir="rtl">
      {/* Hero banner */}
      <div className="bg-primary-gradient px-6 py-10 rounded-3xl mx-5">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-white text-3xl font-black">سجل التقييمات والآراء</h1>
            <p className="text-primary-foreground/70 text-sm mt-1">
              نحن فخورون بمستوى الخدمة التي نقدمها. استمر في النمو!
            </p>
          </div>
          <div className="bg-white/10 rounded-2xl px-8 py-5 text-center min-w-[140px]">
            <p className="text-white/70 text-sm font-bold">/ 5.0</p>
            <p className="text-white text-5xl font-black leading-none">{avg}</p>
            <StarRating rating={Math.round(Number(avg))} size="md" />
            <p className="text-white/60 text-xs mt-2">بناء على {total} تقييم</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
        {/* Reviews list */}
        <div className="flex-1">
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : !reviews?.length ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
              <div className="h-16 w-16 rounded-full bg-primary/5 flex items-center justify-center">
                <Star className="h-8 w-8 text-primary/30" />
              </div>
              <p className="text-foreground font-black text-lg">لا توجد تقييمات بعد</p>
              <p className="text-muted-foreground text-sm max-w-[220px]">
                ستظهر تقييمات عملائك هنا بعد إتمام الخدمات.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-card rounded-2xl border border-border p-5 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-primary/10 border border-border shrink-0 overflow-hidden flex items-center justify-center">
                        {review.clientPictureUrl ? (
                          <img
                            src={review.clientPictureUrl}
                            alt={review.clientName ?? ""}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-sm font-black text-primary">
                            {review.clientName?.charAt(0) ?? "ع"}
                          </span>
                        )}
                      </div>
                      {/* Name + request */}
                      <div>
                        <p className="text-sm font-black text-foreground">
                          {review.clientName ?? `عميل #${review.serviceRequestId}`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          طلب #{review.serviceRequestId}
                        </p>
                      </div>
                    </div>
                    <StarRating rating={review.rating} size="sm" />
                  </div>

                  {review.message && (
                    <p className="text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-3">
                      {review.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar — rating distribution */}
        <aside className="w-full md:w-56 lg:w-100 shrink-0">
          <div className="bg-card rounded-2xl border border-border p-4">
            <p className="text-md font-black text-foreground mb-3">تحليل التقييمات</p>
            <div className="flex flex-col gap-2">
              {distribution.map(({ star, count }) => (
                <RatingBar key={star} star={star} count={count} total={total} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}