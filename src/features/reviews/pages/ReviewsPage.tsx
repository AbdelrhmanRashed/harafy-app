import { Star, MessageSquare } from 'lucide-react';
import { useGetMyReviews } from '../hooks/useGetMyReviews';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { getTimeAgo } from '@/lib/utils';

function StarRating({
  rating,
  size = 'md',
}: {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sz =
    size === 'lg' ? 'h-6 w-6' : size === 'md' ? 'h-4 w-4' : 'h-3.5 w-3.5';
  return (
    <div className="flex items-center gap-0.5" dir="ltr">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${sz} transition-all duration-300 ${
            i < Math.round(rating)
              ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
              : 'text-muted-foreground/20 fill-muted-foreground/20'
          }`}
        />
      ))}
    </div>
  );
}

function RatingBar({
  star,
  count,
  total,
}: {
  star: number;
  count: number;
  total: number;
}) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3" dir="ltr">
      <span className="text-muted-foreground flex w-4 items-center justify-end text-xs font-black">
        {star}
      </span>
      <div className="bg-muted h-2.5 flex-1 overflow-hidden rounded-full">
        <div
          className="h-full rounded-full bg-amber-400 transition-all duration-1000 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-muted-foreground w-8 text-left text-xs font-bold">
        {count}
      </span>
    </div>
  );
}

function ReviewsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="border-border rounded-3xl border-2 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="mt-4 h-16 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const { data: reviews, isLoading } = useGetMyReviews();

  const total = reviews?.length ?? 0;
  const avg =
    total > 0
      ? (reviews!.reduce((s, r) => s + r.rating, 0) / total).toFixed(1)
      : '0.0';

  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews?.filter((r) => Math.round(r.rating) === star).length ?? 0,
  }));

  console.log(reviews);
  return (
    <div
      className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8"
      dir="rtl"
    >
      {/* ── Header Section ── */}
      <div className="bg-primary-gradient text-primary-foreground relative overflow-hidden rounded-3xl p-8">
        <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="text-center md:text-right">
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              سجل التقييمات والآراء ⭐️
            </h1>
            <p className="mt-3 max-w-md text-base leading-relaxed font-medium text-white/80">
              تعرف على آراء عملائك ومستوى رضاهم. نحن فخورون بمستوى الخدمة التي
              تقدمها!
            </p>
          </div>

          <div className="flex min-w-[180px] flex-col items-center rounded-2xl border border-white/10 bg-white/10 p-6 shadow-inner backdrop-blur-md">
            <p className="text-sm font-bold text-white/70">التقييم العام</p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-5xl font-black">{avg}</span>
              <span className="text-xl font-bold text-white/50">/ 5</span>
            </div>
            <div className="mt-3">
              <StarRating rating={Number(avg)} size="md" />
            </div>
            <p className="mt-3 text-xs font-semibold text-white/60">
              بناءً على {total} تقييم
            </p>
          </div>
        </div>
      </div>

      {/* ── Body Section ── */}
      <div className="flex flex-col-reverse gap-8 lg:flex-row">
        {/* Reviews List */}
        <div className="flex-1">
          {isLoading ? (
            <ReviewsSkeleton />
          ) : !reviews?.length ? (
            <div className="border-border bg-muted/20 flex min-h-[300px] flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed p-8 text-center">
              <div className="bg-primary/5 flex h-20 w-20 items-center justify-center rounded-full">
                <Star className="text-primary/30 h-10 w-10" />
              </div>
              <div>
                <p className="text-foreground text-xl font-black">
                  لا توجد تقييمات بعد
                </p>
                <p className="text-muted-foreground mx-auto mt-2 max-w-sm text-sm leading-relaxed font-medium">
                  ستظهر تقييمات عملائك هنا بمجرد إتمام أولى خدماتك بنجاح.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {reviews.map((review) => {
                return (
                  <Card
                    key={review.id}
                    className="border-border hover:border-primary/30 rounded-3xl shadow-sm transition-all duration-300 hover:shadow-md"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="border-border/50 ring-primary/5 h-12 w-12 border-2 shadow-sm ring-2 ring-offset-1">
                            <AvatarImage
                              src={review.clientPictureUrl}
                              alt={review.clientName}
                            />
                            <AvatarFallback className="bg-primary/10 text-primary text-lg font-black">
                              {review.clientName?.charAt(0) ?? 'ع'}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-foreground text-base font-black">
                              {review.clientName || 'عميل'}
                            </p>
                            <p className="text-muted-foreground mt-0.5 text-xs font-medium">
                              {getTimeAgo(new Date(review.createdAt))}
                            </p>
                          </div>
                        </div>

                        <div className="rounded-full bg-amber-500/10 px-3 py-1.5">
                          <StarRating rating={review.rating} size="sm" />
                        </div>
                      </div>

                      {review.message && (
                        <div className="bg-muted/40 relative mt-5 rounded-2xl p-4">
                          <MessageSquare className="text-primary/20 absolute top-4 right-4 h-5 w-5 rotate-12" />
                          <p className="text-foreground/80 pr-8 text-sm leading-relaxed font-medium">
                            "{review.message}"
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar / Analysis */}
        <aside className="w-full shrink-0 lg:w-80">
          <Card className="border-border sticky top-24 rounded-3xl shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-foreground text-lg font-black">
                تحليل التقييمات
              </h3>
              <p className="text-muted-foreground mt-1 mb-6 text-xs font-medium">
                توزيع مستويات الرضا بين عملائك
              </p>
              <div className="flex flex-col gap-4">
                {distribution.map(({ star, count }) => (
                  <RatingBar
                    key={star}
                    star={star}
                    count={count}
                    total={total}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
