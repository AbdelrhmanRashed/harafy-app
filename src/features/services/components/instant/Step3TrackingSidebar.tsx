import {
  CheckCircle2,
  Loader2,
  Truck,
  MapPin,
  Wrench,
  Phone,
  MessageSquare,
  Star,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetServiceReqById } from "../../hooks/useGetServiceReqById";
import { useSetReqCompleted } from "../../hooks/useSetReqCompleted";
import { cn } from "@/lib/utils";
import { useGetProviderData } from "../../hooks/useGetProviderData";
// ─── Tracking steps ───────────────────────────────────────────────────────────

const TRACKING_STEPS = [
  {
    id: 1,
    label: "تم قبول العرض",
    sublabel: "10:30 صباحاً",
    icon: CheckCircle2,
  },
  {
    id: 2,
    label: "في الطريق إليك",
    sublabel: "جاري تتبع الموقع الآن",
    icon: Truck,
  },
  {
    id: 3,
    label: "وصل للموقع",
    sublabel: "",
    icon: MapPin,
  },
  {
    id: 4,
    label: "جاري العمل",
    sublabel: "",
    icon: Wrench,
  },
  {
    id: 5,
    label: "مكتمل",
    sublabel: "",
    icon: CheckCircle2,
  },
];

// requestStatus → which tracking step is active
function getTrackingStep(requestStatus: number): number {
  if (requestStatus === 3) return 5;
  if (requestStatus === 2) return 2;
  return 1;
}

// ─── Props ────────────────────────────────────────────────────────────────────

type Step3TrackingSidebarProps = {
  requestId: string;
  onCompleteSuccess: () => void;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Step3TrackingSidebar({
  requestId,
  onCompleteSuccess,
}: Step3TrackingSidebarProps) {
  const { data: reqData, isFetching: fetchingReq } = useGetServiceReqById(requestId, {
    enabled: !!requestId,
    refetchInterval: 8000,
  });
  // {
  //     "id": 63,
  //     "requestStatus": 2,
  //     "description": "شصيشصيشصيشصيشصي",
  //     "finalPrice": null,
  //     "createdAt": "2026-04-12T23:51:14.0430056",
  //     "preferredTime": null,
  //     "clientId": 142,
  //     "providerId": 72,
  //     "serviceRequestLocation": {
  //         "latitude": 30.589011538430825,
  //         "longitude": 31.5223503112793
  //     },
  //     "serviceId": 1,
  //     "imageUrls": []
  // }

  const req = reqData as Record<string, unknown> | undefined;

  const assignedId = req?.providerId?.toString();

  const { data: providerData, isLoading: loadingProvider } = useGetProviderData(assignedId);

  const { mutate: completeMutate, isPending: completing } = useSetReqCompleted();

  // export interface Provider {
  //   id: number;
  //   name: string;
  //   pictureUrl?: string | null;
  //   bio: string;
  //   nickname: string;
  //   rating: number | null;
  //   reviewsCount: number;
  //   jobsCount: number;
  //   governorateId: number;
  //   regionId: number;
  //   baseLocation: {
  //     id: number;
  //     latitude: number;
  //     longitude: number;
  //     addressText: string;
  //     providerId: number;
  //   };
  //   services: {
  //     id: number;
  //     name: string;
  //   }[];
  // }

  const providerName = providerData?.name || (req?.providerName as string) || "حرفي متخصص";
  const providerPic = providerData?.pictureUrl || (req?.providerPictureUrl as string);
  const providerProfession = providerData?.services[0]?.name || (req?.providerProfession as string) || "حرفي متخصص"; const providerRating = providerData?.rating || (req?.providerRating as number) || 4.9;
  const phoneNumber = providerData?.phoneNumber || "0123456789";


  const requestStatus = (req?.requestStatus as number) ?? 1;
  const finalPrice = req?.finalPrice as number | null | undefined;
  const serviceId = req?.serviceId as number | undefined;
  const currentTrackingStep = getTrackingStep(requestStatus);
  const isCompleted = requestStatus === 3;


  const handleComplete = () => {
    completeMutate(requestId, {
      onSuccess: () => onCompleteSuccess(),
    });
  };
  console.log("Assigned ID:", assignedId);
  console.log("Provider Data from API:", providerData);
  // ── Loading state ──────────────────────────────────────────────────────────
  if (fetchingReq && !req) {
    return (
      <div className="flex flex-1 items-center justify-center gap-2 py-20 text-sm text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        جاري تحميل التفاصيل...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full" dir="rtl">

      {/* ── 1. Provider card ── */}
      <div className="px-5 py-5 border-b border-border">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0 flex items-center justify-center border border-border">
            {loadingProvider ? (
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            ) : providerPic ? (
              <img src={providerPic} alt={providerName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-bold text-primary">
                {providerName?.charAt(0) || "P"}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 text-right space-y-0.5">
            {/* Rating */}
            <div className="flex items-center justify-end gap-1 mb-1">
              <span className="text-xs font-bold text-foreground">
                {providerRating.toFixed(1)}
              </span>
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            </div>
            <p className="text-lg font-extrabold text-foreground leading-tight">
              {providerName}
            </p>
            <p className="text-sm text-muted-foreground">{providerProfession}</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button
            variant="gradient"
            className="h-11 rounded-2xl font-bold gap-2"
            onClick={() => phoneNumber && (window.location.href = `tel:${phoneNumber}`)}
            disabled={!phoneNumber}
          >
            <Phone className="h-4 w-4" />
            اتصال
          </Button>
          <Button
            variant="outline"
            className="h-11 rounded-2xl font-bold gap-2 border-border"
            onClick={() => {/* TODO: chat */ }}
          >
            <MessageSquare className="h-4 w-4" />
            محادثة
          </Button>
        </div>
      </div>

      {/* ── 2. Request details ── */}
      <div className="px-5 py-4 border-b border-border">
        <p className="text-xs text-muted-foreground text-right mb-3">
          تفاصيل الطلب
        </p>

        <div className="bg-muted/40 rounded-2xl p-4 space-y-3">
          {/* Service name + request id */}
          <div className="flex items-center justify-between">
            {/* Request ID badge */}
            <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
              #{requestId}
            </span>

            {/* Service name */}
            <div className="flex items-center gap-2 text-right">
              <span className="text-sm font-extrabold text-foreground">
                {providerData?.services?.find((s: any) => s.id === serviceId)?.name || "خدمة فورية"}              </span>
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="h-3.5 w-3.5 text-primary" />
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-1 border-t border-border/50">
            <span className="text-base font-black text-primary">
              {finalPrice != null ? `${finalPrice} جنيه` : "—"}
            </span>
            <span className="text-xs text-muted-foreground">
              السعر المتفق عليه
            </span>
          </div>
        </div>
      </div>

      {/* ── 3. Vertical status timeline ── */}
      <div className="px-5 py-4 flex-1 overflow-y-auto">
        <p className="text-xs text-muted-foreground text-right mb-4">
          حالة الطلب
        </p>

        <div className="relative">
          {TRACKING_STEPS.map((step, index) => {
            const isStepCompleted = step.id < currentTrackingStep;
            const isStepActive = step.id === currentTrackingStep;
            const isStepPending = step.id > currentTrackingStep;
            const isLast = index === TRACKING_STEPS.length - 1;
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex gap-4 relative">
                {/* Left: circle + line */}
                <div className="flex flex-col items-center">
                  {/* Circle */}
                  <div
                    className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center shrink-0 z-10 border-2 transition-all",
                      isStepCompleted
                        ? "bg-primary border-primary text-white"
                        : isStepActive
                          ? "bg-white border-primary text-primary shadow-md shadow-primary/20"
                          : "bg-muted border-border text-muted-foreground"
                    )}
                  >
                    {isStepActive && (
                      <span className="absolute w-9 h-9 rounded-full bg-primary/20 animate-ping" />
                    )}
                    <Icon className="h-4 w-4 relative z-10" />
                  </div>

                  {/* Vertical line */}
                  {!isLast && (
                    <div
                      className={cn(
                        "w-0.5 flex-1 min-h-[28px] mt-1",
                        isStepCompleted ? "bg-primary" : "bg-border"
                      )}
                    />
                  )}
                </div>

                {/* Right: text */}
                <div className="flex-1 text-right pb-6">
                  <p
                    className={cn(
                      "text-sm font-bold leading-tight",
                      isStepActive
                        ? "text-primary"
                        : isStepCompleted
                          ? "text-foreground"
                          : "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </p>
                  {(isStepActive || isStepCompleted) && step.sublabel && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {step.sublabel}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 4. Complete button ── */}
      <div className="px-5 py-4 border-t border-border shrink-0">
        <Button
          type="button"
          variant="outline"
          className={cn(
            "w-full h-14 rounded-2xl font-bold text-base border-2 transition-all",
            isCompleted
              ? "border-green-500 text-green-600 bg-green-50"
              : "border-border text-foreground hover:border-primary hover:text-primary"
          )}
          disabled={completing || isCompleted}
          onClick={handleComplete}
        >
          {completing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin ml-2" />
              جاري الإتمام...
            </>
          ) : isCompleted ? (
            <>
              <CheckCircle2 className="h-5 w-5 ml-2 text-green-500" />
              تم إتمام العمل
            </>
          ) : (
            "تأكيد إتمام العمل"
          )}
        </Button>

        <p className="text-center text-[11px] text-muted-foreground mt-2 leading-relaxed px-2">
          يمكنك تأكيد إتمام العمل فقط بعد وصول المحترف وقيامه بالخدمة المطلوبة.
        </p>
      </div>

    </div>
  );
}
