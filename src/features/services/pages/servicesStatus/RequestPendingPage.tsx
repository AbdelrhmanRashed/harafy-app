import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Shield, ChevronLeft, MapPin, Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

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
  console.log("Received payload:", payload);

  // Animate progress bar
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(65), 300);
    return () => clearTimeout(timer);
  }, []);

  const timeAgo = "قبل ١ دقيقة";

  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center justify-center px-5 py-12 "
    >
      <div className="w-full max-w-md flex flex-col items-center gap-8">

        {/* ── Success icon ── */}
        <div className="relative">
          {/* Outer glow rings
          <div className="absolute inset-0 rounded-full bg-primary/10 scale-150 animate-ping opacity-30" />
          <div className="absolute inset-0 rounded-full bg-primary/10 scale-125" /> */}

          {/* Icon circle */}
          <div className="relative w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center">
              <Check className="h-8 w-8  text-primary" strokeWidth={3.5} />

            </div>
          </div>
        </div>

        {/* ── Heading ── */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black text-foreground">
            تم إرسال طلبك بنجاح
          </h1>
          <p className="text-muted-foreground text-xl leading-relaxed font-medium">
            في انتظار رد مقدم الخدمة{" "}
            {payload?.providerName && (
              <span className="text-primary font-bold">
                ({payload.providerName})...
              </span>
            )}

          </p>
        </div>

        {/* ── Request summary card ── */}
        {payload && (
          <div className="min-w-xl bg-card rounded-3xl border border-border/40 shadow-sm overflow-hidden">
            <div className="flex items-center gap-6 px-8 pt-10 pb-8">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-2xl overflow-hidden  shrink-0">
                {payload.providerImage ? (
                  <img
                    src={payload.providerImage}
                    alt={payload.providerName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-950 flex items-center justify-center text-white font-bold text-xl">
                    {payload.providerAvatar || payload.providerName.charAt(0)}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="text-right space-y-1 flex-1 items-start">
                {/* Badge + time */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                    طلب مباشر
                  </span>
                  <span className="text-xs font-medium  text-muted-foreground">{timeAgo}</span>

                </div>

                <p className="text-lg  font-bold text-foreground truncate">
                  {payload?.profession}
                </p>

                {payload?.address && (
                  <div className="flex items-center justify-start gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground shrink-0" />
                    <span className="text-sm text-muted-foreground truncate max-w-[180px]">
                      {payload.address.split(",").slice(0, 2).join(",")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Progress bar ── */}
        <div className="w-full space-y-4">
          <div className="w-full h-1.5 bg-muted-foreground/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-[1500ms] ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-xs font-[inter] font-semibold tracking-widest text-muted-foreground uppercase">
            Processing Request
          </p>
        </div>

        {/* ── Action buttons ── */}
        <div className="w-full flex items-center gap-3">
          <Button
            variant="gradient"
            className="flex-1 h-14 rounded-3xl font-bold gap-2 shadow-primary-gradient"
            onClick={() => navigate(`/app/services/requests/${requestId}`)}
          >
            عرض تفاصيل الطلب
            {/* <ChevronLeft className="h-4 w-4" /> */}
          </Button>
          <Button
            variant="secondary"
            className="flex-1 h-14 rounded-3xl font-bold text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/app/home")}
          >
            الرجوع للرئيسية
          </Button>
        </div>

        {/* ── Trust badge ── */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <ShieldCheck  className="h-4 w-4" />
          <span className="text-sm font-medium">معاملة آمنة عبر منصة حرفي</span>
        </div>

      </div>
    </div>
  );
}

export default RequestPending
