import {
  CheckCircle2,
  Loader2,
  Wrench,
  Phone,
  
  Star,
  Zap,
  Clock,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetServiceReqById } from '../../hooks/useGetServiceReqById';
import { useSetReqCompleted } from '../../hooks/useSetReqCompleted';
import { cn, getImageUrl, getTimeAgo } from '@/lib/utils';
import { useGetProviderData } from '../../hooks/useGetProviderData';
import { useTrackingSocket } from '@/realtime/useTrackingSocket';
import { useState } from 'react';

import { useGetRequestOffer } from '../../hooks/useGetRequestOffer';
// ─── Tracking steps ───────────────────────────────────────────────────────────

const getSteps = (myOffer: any) => {
  return [
    {
      id: 1,
      label: 'تم قبول العرض',
      sublabel: `منذ ${getTimeAgo(new Date(myOffer?.createdAt))}`,
      icon: CheckCircle2,
    },

    {
      id: 2,
      label: 'جاري العمل',
      sublabel: myOffer?.message,
      icon: Wrench,
    },
    {
      id: 3,
      label: 'مكتمل',
      sublabel: '',
      icon: CheckCircle2,
    },
  ];
};

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
  onLocationChange?: (loc: { lat: number; lng: number }) => void;
  distance?: number;
  duration?: number;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Step3TrackingSidebar({
  requestId,
  onCompleteSuccess,
  onLocationChange,
  distance = 0,
  duration = 0,
}: Step3TrackingSidebarProps) {
  const { data: reqData, isFetching: fetchingReq } =
    useGetServiceReqById(requestId);
  const { data: offerData } = useGetRequestOffer(requestId);
  const myOffer = offerData?.find(
    (offer: any) => offer.providerId === reqData?.providerId,
  );

  console.log(myOffer);
  const req = reqData as Record<string, unknown> | undefined;

  const assignedId = req?.providerId?.toString();

  const { data: providerData, isLoading: loadingProvider } =
    useGetProviderData(assignedId);

  const { mutate: completeMutate, isPending: completing } =
    useSetReqCompleted();

  const providerName =
    providerData?.name || (req?.providerName as string) || 'حرفي متخصص';
  const providerPic =
    providerData?.pictureUrl || (req?.providerPictureUrl as string);
  const providerProfession =
    providerData?.services[0]?.name ||
    (req?.providerProfession as string) ||
    'حرفي متخصص';

  const phoneNumber = providerData?.phoneNumber || '0123456789';

  const requestStatus = (req?.requestStatus as number) ?? 1;
  const serviceId = req?.serviceId as number | undefined;
  const currentTrackingStep = getTrackingStep(requestStatus);
  const isCompleted = requestStatus === 3;

  const [, setProviderPos] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useTrackingSocket(assignedId, (lat, lng) => {
    const newLoc = { lat, lng };

    setProviderPos((prev) => {
      if (!prev) return newLoc;

      return {
        lat: prev.lat + (lat - prev.lat) * 0.2,
        lng: prev.lng + (lng - prev.lng) * 0.2,
      };
    });

    onLocationChange?.(newLoc);
  });

  const handleComplete = () => {
    completeMutate(requestId, {
      onSuccess: () => onCompleteSuccess(),
    });
  };
  console.log('Assigned ID:', assignedId);
  console.log('Provider Data from API:', providerData);
  // ── Loading state ──────────────────────────────────────────────────────────
  if (fetchingReq && !req) {
    return (
      <div className="text-muted-foreground flex flex-1 items-center justify-center gap-2 py-20 text-sm">
        <Loader2 className="text-primary h-6 w-6 animate-spin" />
        جاري تحميل التفاصيل...
      </div>
    );
  }

  return (
    <>
      <div className="flex h-full flex-col" dir="rtl">
        {/* ── 1. Provider card ── */}
        <div className="border-border border-b px-5 py-5">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="border-border flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border bg-slate-100">
              {loadingProvider ? (
                <Loader2 className="text-primary h-5 w-5 animate-spin" />
              ) : providerPic ? (
                <img
                  src={getImageUrl(providerPic)}
                  alt={providerName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-primary text-2xl font-bold">
                  {providerName?.charAt(0) || 'P'}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 space-y-0.5 text-right">
              {/* Rating */}
              <div className="mb-1 flex items-center justify-end gap-1">
                <span className="text-foreground text-xs font-bold">
                  {providerData?.rating?.toFixed(1) ?? '0.0'}
                </span>
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              </div>
              <p className="text-foreground text-lg leading-tight font-extrabold">
                {providerName}
              </p>
              <p className="text-muted-foreground text-sm">
                {providerProfession}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex justify-center">
            <Button
              variant="gradient"
              className="h-11 gap-2 rounded-2xl font-bold w-full"
              onClick={() =>
                phoneNumber && (window.location.href = `tel:${phoneNumber}`)
              }
              disabled={!phoneNumber}
            >
              <Phone className="h-4 w-4" />
              اتصال
            </Button>
          
          </div>
        </div>

        {/* ── 2. Request details ── */}
        <div className="border-border border-b px-5 py-4">
          <p className="text-muted-foreground mb-3 text-right text-xs">
            تفاصيل الطلب
          </p>

          <div className="bg-muted/40 space-y-3 rounded-2xl p-4">
            {/* Service name + request id */}
            <div className="flex items-center justify-between">
              {/* Request ID badge */}
              <span className="text-primary bg-primary/10 rounded-full px-2.5 py-1 text-xs font-bold">
                #{requestId}
              </span>

              {/* Service name */}
              <div className="flex items-center gap-2 text-right">
                <span className="text-foreground text-sm font-extrabold">
                  {providerData?.services?.find((s: any) => s.id === serviceId)
                    ?.name || 'خدمة فورية'}{' '}
                </span>
                <div className="bg-primary/10 flex h-7 w-7 items-center justify-center rounded-lg">
                  <Zap className="text-primary h-3.5 w-3.5" />
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="border-border/50 flex items-center justify-between border-t pt-3">
              <span className="text-primary text-base font-black">
                {myOffer?.price != null ? `${myOffer?.price} جنيه` : '—'}
              </span>
              <span className="text-muted-foreground text-xs font-semibold">
                السعر المتفق عليه
              </span>
            </div>

            {/* Distance & Time */}
            {!isCompleted && (
              <div className="border-border/50 flex items-center justify-between border-t pt-3">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="text-primary h-4 w-4" />
                    <span className="text-foreground text-sm font-bold">
                      {duration > 0
                        ? `${Math.ceil(duration / 60)} دقيقة`
                        : 'جاري الحساب...'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="text-primary h-4 w-4" />
                    <span className="text-foreground text-sm font-bold">
                      {distance > 0
                        ? `${(distance / 1000).toFixed(1)} كم`
                        : 'جاري الحساب...'}
                    </span>
                  </div>
                </div>
                <span className="text-muted-foreground text-xs font-semibold">
                  المسافة والوقت
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── 3. Vertical status timeline ── */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <p className="text-muted-foreground mb-4 text-right text-xs">
            حالة الطلب
          </p>

          <div className="relative">
            {getSteps(myOffer).map((step, index) => {
              const isStepCompleted = step.id < currentTrackingStep;
              const isStepActive = step.id === currentTrackingStep;
              const isLast = index === getSteps(myOffer).length - 1;
              const Icon = step.icon;

              return (
                <div key={step.id} className="relative flex gap-4">
                  {/* Left: circle + line */}
                  <div className="flex flex-col items-center">
                    {/* Circle */}
                    <div
                      className={cn(
                        'z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-all',
                        isStepCompleted
                          ? 'bg-primary border-primary text-white'
                          : isStepActive
                            ? 'border-primary text-primary shadow-primary/20 bg-card shadow-md'
                            : 'bg-muted border-border text-muted-foreground',
                      )}
                    >
                      {isStepActive && (
                        <span className="bg-primary/20 absolute h-9 w-9 animate-ping rounded-full" />
                      )}
                      <Icon className="relative z-10 h-4 w-4" />
                    </div>

                    {/* Vertical line */}
                    {!isLast && (
                      <div
                        className={cn(
                          'mt-1 min-h-[28px] w-0.5 flex-1',
                          isStepCompleted ? 'bg-primary' : 'bg-border',
                        )}
                      />
                    )}
                  </div>

                  {/* Right: text */}
                  <div className="flex-1 pb-6 text-right">
                    <p
                      className={cn(
                        'text-sm leading-tight font-bold',
                        isStepActive
                          ? 'text-primary'
                          : isStepCompleted
                            ? 'text-foreground'
                            : 'text-muted-foreground',
                      )}
                    >
                      {step.label}
                    </p>
                    {(isStepActive || isStepCompleted) && step.sublabel && (
                      <p className="text-muted-foreground mt-0.5 text-xs">
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
        <div className="border-border shrink-0 border-t px-5 py-4">
          <Button
            type="button"
            variant="gradient"
            className={cn(
              'h-14 w-full cursor-pointer rounded-2xl transition-all',
              isCompleted
                ? 'border-green-500 bg-green-50 text-green-600'
                : 'text-base font-bold',
            )}
            disabled={completing || isCompleted}
            onClick={handleComplete}
          >
            {completing ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                جاري الإتمام...
              </>
            ) : isCompleted ? (
              <>
                <CheckCircle2 className="ml-2 h-5 w-5 text-green-500" />
                تم إتمام العمل
              </>
            ) : (
              'تأكيد إتمام العمل'
            )}
          </Button>

          <p className="text-muted-foreground mt-2 px-2 text-center text-[11px] leading-relaxed">
            يمكنك تأكيد إتمام العمل فقط بعد وصول الحرفي وقيامه بالخدمة المطلوبة.
          </p>
        </div>
      </div>
    </>
  );
}
