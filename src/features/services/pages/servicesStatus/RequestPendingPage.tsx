import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MapPin, Check, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── Types ────────────────────────────────────────────────────────────────────

interface RequestState {
  payload: {
    providerName: string;
    profession: string;
    providerImage?: string;
    providerAvatar?: string;
    description: string;
    datetime?: Date;
    images?: string[];
    location: {
      customer: {
        lat: number;
        lng: number;
      };
      provider: {
        lat: number;
        lng: number;
      };
    };

    address: string;
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const RequestPending = () => {
  const { requestId } = useParams();
  const { state } = useLocation() as { state: RequestState };
  const navigate = useNavigate();

  const payload = state?.payload;
  console.log('Received payload:', payload);

  const timeAgo = 'قبل ١ دقيقة';

  return (
    <div className="bg-background flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-5 py-12">
      <div className="flex w-full max-w-md flex-col items-center gap-8">
        {/* ── Success icon ── */}
        <div className="relative">
          {/* Outer glow rings
          <div className="absolute inset-0 rounded-full bg-primary/10 scale-150 animate-ping opacity-30" />
          <div className="absolute inset-0 rounded-full bg-primary/10 scale-125" /> */}

          {/* Icon circle */}
          <div className="bg-primary shadow-primary/30 relative flex h-24 w-24 items-center justify-center rounded-full shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
              <Check className="text-primary h-8 w-8" strokeWidth={3.5} />
            </div>
          </div>
        </div>

        {/* ── Heading ── */}
        <div className="space-y-2 text-center">
          <h1 className="text-foreground text-4xl font-black">
            تم إرسال طلبك بنجاح
          </h1>
          <p className="text-muted-foreground text-xl leading-relaxed font-medium">
            في انتظار رد مقدم الخدمة{' '}
            {payload?.providerName && (
              <span className="text-primary font-bold">
                ({payload.providerName})...
              </span>
            )}
          </p>
        </div>

        {/* ── Request summary card ── */}
        {payload && (
          <div className="bg-card border-border/40 min-w-xl overflow-hidden rounded-3xl border shadow-sm">
            <div className="flex items-center gap-6 px-8 pt-10 pb-8">
              {/* Avatar */}
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl">
                {payload.providerImage ? (
                  <img
                    src={payload.providerImage}
                    alt={payload.providerName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-slate-700 to-slate-950 text-xl font-bold text-white">
                    {payload.providerAvatar || payload.providerName.charAt(0)}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 items-start space-y-1 text-right">
                {/* Badge + time */}
                <div className="flex items-center justify-between">
                  <span className="text-primary bg-primary/10 rounded-full px-2.5 py-0.5 text-xs font-bold">
                    طلب مباشر
                  </span>
                  <span className="text-muted-foreground text-xs font-medium">
                    {timeAgo}
                  </span>
                </div>

                <p className="text-foreground truncate text-lg font-bold">
                  {payload?.profession}
                </p>

                {payload?.address && (
                  <div className="flex items-center justify-start gap-1">
                    <MapPin className="text-muted-foreground h-3 w-3 shrink-0" />
                    <span className="text-muted-foreground max-w-[180px] truncate text-sm">
                      {payload.address.split(',').slice(0, 2).join(',')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Action buttons ── */}
        <div className="flex w-full items-center gap-3">
          <Button
            variant="gradient"
            className="shadow-primary-gradient h-14 flex-1 gap-2 rounded-xl font-bold"
            onClick={() => navigate(`/app/services/requests/${requestId}`)}
          >
            عرض تفاصيل الطلب
            {/* <ChevronLeft className="h-4 w-4" /> */}
          </Button>
          <Button
            variant="secondary"
            className="text-muted-foreground hover:text-foreground h-14 flex-1 cursor-pointer rounded-xl font-bold"
            onClick={() => navigate('/app/home')}
          >
            الرجوع للرئيسية
          </Button>
        </div>

        {/* ── Trust badge ── */}
        <div className="text-muted-foreground flex items-center gap-2">
          <ShieldCheck className="h-4 w-4" />
          <span className="text-sm font-medium">معاملة آمنة عبر منصة حرفي</span>
        </div>
      </div>
    </div>
  );
};

export default RequestPending;
