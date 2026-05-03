import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Star, Loader2, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetMyReviews } from '../../reviews/hooks/useGetMyReviews';
import type { AssignedRequest } from '../types/providerOfferTypes';
import axiosInstance from '@/lib/axios';

const BASE_URL = axiosInstance.defaults.baseURL ?? '';

function resolveUrl(url?: string | null): string | null {
  if (!url) return null;
  return url.startsWith('http') ? url : `${BASE_URL}/${url}`;
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 transition-colors ${
            i < Math.round(rating)
              ? 'fill-amber-400 text-amber-400'
              : 'text-muted-foreground/20'
          }`}
        />
      ))}
    </div>
  );
}

interface Props {
  request: AssignedRequest;
}

export default function CompletionOverlay({ request }: Props) {
  const navigate = useNavigate();

  // Poll every 8 s; stops automatically when the component unmounts on navigation
  const { data: reviews, isLoading: reviewLoading } = useGetMyReviews(
    request.id,
    { refetchInterval: 8_000 },
  );

  const review = reviews?.[0] ?? null;
  const clientPic = resolveUrl(request.clientPictureUrl);

  return (
    <div
      className="animate-in fade-in fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl duration-500"
      dir="rtl"
    >
      {/* ── Glow background ─────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-primary/10 absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative flex w-full max-w-sm flex-col items-center gap-6 px-6 py-8">
        {/* ── Completion Badge ─────────────────────────────────── */}
        <div className="relative">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/10 ring-4 ring-emerald-500/20">
            <CheckCircle2 className="h-12 w-12 text-emerald-500" />
          </div>
          {/* Pulse ring */}
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/10" />
        </div>

        <div className="space-y-1 text-center">
          <h1 className="text-foreground text-2xl font-black">تمت الخدمة!</h1>
          <p className="text-muted-foreground text-sm">
            تم إكمال الطلب بنجاح لـ{' '}
            <span className="text-foreground font-bold">
              {request.clientName}
            </span>
          </p>
        </div>

        {/* ── Client card ──────────────────────────────────────── */}
        <div className="bg-card w-full rounded-3xl border p-4">
          <div className="flex items-center gap-3">
            {/* avatar */}
            <div className="ring-primary/20 h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2">
              {clientPic ? (
                <img
                  src={clientPic}
                  alt={request.clientName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="bg-primary/10 flex h-full w-full items-center justify-center">
                  <span className="text-primary text-lg font-black">
                    {request.clientName?.charAt(0) ?? 'ع'}
                  </span>
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-foreground truncate font-black">
                {request.clientName}
              </p>
              {request.finalPrice && (
                <p className="text-primary text-sm font-bold">
                  {Number(request.finalPrice).toLocaleString('ar-EG')} جنيه
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── Review section ───────────────────────────────────── */}
        {review ? (
          /* Review received */
          <div className="from-primary/5 to-primary/10 w-full space-y-4 rounded-3xl bg-gradient-to-br p-5">
            <div className="flex items-center justify-between">
              <p className="text-foreground font-black">تقييم العميل</p>
              <StarRow rating={review.rating} />
            </div>
            {review.message && (
              <p className="text-muted-foreground border-border/40 border-t pt-3 text-sm leading-relaxed">
                &ldquo;{review.message}&rdquo;
              </p>
            )}
          </div>
        ) : (
          /* Awaiting review */
          <div className="w-full rounded-3xl border border-dashed p-5">
            <div className="flex flex-col items-center gap-3 text-center">
              {reviewLoading ? (
                <Loader2 className="text-primary h-7 w-7 animate-spin" />
              ) : (
                <RefreshCw className="text-muted-foreground h-7 w-7 animate-spin [animation-duration:3s]" />
              )}
              <div>
                <p className="text-foreground font-bold">في انتظار تقييم العميل</p>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  سيظهر التقييم هنا فور تقييم العميل للخدمة
                </p>
              </div>
              {/* star placeholder */}
              <div className="flex gap-1 opacity-30">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Actions ──────────────────────────────────────────── */}
        <div className="flex w-full flex-col gap-3">
          <Button
            variant="gradient"
            className="h-12 w-full rounded-2xl text-base font-black"
            onClick={() => navigate('/provider/requests')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            بدء طلب جديد
          </Button>

          {review && (
            <Button
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/5 h-11 w-full rounded-2xl font-bold"
              onClick={() => navigate('/provider/reviews')}
            >
              <Star className="mr-2 h-4 w-4" />
              عرض جميع تقييماتي
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
