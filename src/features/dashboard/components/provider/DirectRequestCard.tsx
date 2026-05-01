import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, MapPin, Calendar, MessageSquare, Wallet, X } from "lucide-react";
import { useStartRequest } from "../../hooks/useStartRequest";
import type { AssignedRequest } from "../../../Requests/types/providerOfferTypes";
import axiosInstance from "@/lib/axios";

const BASE_URL = axiosInstance.defaults.baseURL ?? "";

type Props = {
  data: AssignedRequest;
};

export default function DirectRequestCard({ data }: Props) {
  const navigate = useNavigate();
  const { mutate: start, isPending } = useStartRequest();
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const images = (data.imageUrls ?? []).map((url: string) =>
    url.startsWith("http") ? url : `${BASE_URL}/${url}`
  );

  const createdAt = data.createdAt
    ? new Date(data.createdAt).toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const preferredTimeFormatted = data.preferredTime
    ? new Date(data.preferredTime).toLocaleString("ar-EG", {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const handleAcceptConfirmed = () => {
    setShowConfirm(false);
    start(
      { id: data.id, isAccepted: true },
      {
        onSuccess: (result) => {
          navigate(`/provider/requests/ordertrack/${data.id}`, {
            state: {
              request: {
                ...result,
                clientName: data.clientName,
                clientPictureUrl: data.clientPictureUrl,
                serviceRequestLocation:
                  result.serviceRequestLocation ?? data.serviceRequestLocation,
                imageUrls: result.imageUrls?.length
                  ? result.imageUrls
                  : data.imageUrls,
              },
            },
          });
        },
      }
    );
  };

  const handleReject = () => {
    start({ id: data.id, isAccepted: false });
  };

  return (
    <>
      <Card className="hover:border-primary/50 relative overflow-hidden rounded-3xl border-2 shadow-[0_2px_20px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_4px_25px_rgb(0,0,0,0.08)]">
        <div className="bg-primary/5 absolute top-0 right-0 h-full w-2" />
        <CardContent className="space-y-2 px-5">

          {/* Header: avatar + name + time */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="border-border bg-primary/5 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 shadow-sm">
                {data.clientPictureUrl ? (
                  <img
                    src={data.clientPictureUrl}
                    alt={data.clientName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-primary text-sm font-black">
                    {data.clientName?.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <p className="text-foreground text-lg font-black">{data.clientName}</p>
                {data.serviceName && (
                  <p className="text-primary text-sm font-bold">{data.serviceName}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              {createdAt && (
                <span className="bg-secondary/50 text-muted-foreground rounded-full px-3 py-1 text-xs font-semibold">
                  {createdAt}
                </span>
              )}
              <span className="bg-primary/10 text-primary rounded-full px-3 py-0.5 text-[11px] font-bold">
                طلب مباشر
              </span>
            </div>
          </div>

          {/* Description bubble — same as OfferRequestCard */}
          <div className="bg-muted/40 relative mt-2 rounded-2xl p-4">
            <MessageSquare className="text-primary/70 absolute top-5.5 right-4 h-5 w-5 rotate-12" />
            <p className="text-muted-foreground ms-10 text-right text-base font-medium leading-relaxed">
              {data.description || 'لا يوجد وصف'}
            </p>
          </div>

          {/* Location row — same as OfferRequestCard */}
          {data.serviceRequestLocation && (
            <div className="bg-secondary/30 flex items-center gap-2 rounded-2xl p-3">
              <div className="rounded-full bg-amber-500/10 p-1.5">
                <MapPin className="h-4 w-4 shrink-0 text-amber-600" />
              </div>
              <span className="text-foreground text-xs font-semibold" dir="ltr">
                {data.serviceRequestLocation.address ??
                  `${data.serviceRequestLocation.latitude.toFixed(3)}, ${data.serviceRequestLocation.longitude.toFixed(3)}`}
              </span>
            </div>
          )}

          {/* Preferred time */}
          {preferredTimeFormatted && (
            <div className="bg-secondary/30 flex items-center gap-2 rounded-2xl p-3">
              <div className="rounded-full bg-primary/10 p-1.5">
                <Calendar className="text-primary h-4 w-4 shrink-0" />
              </div>
              <span className="text-foreground text-xs font-semibold">
                {preferredTimeFormatted}
              </span>
            </div>
          )}

          {/* Budget */}
          {data.finalPrice != null && data.finalPrice > 0 && (
            <div className="bg-secondary/30 flex items-center gap-2 rounded-2xl p-3">
              <div className="rounded-full bg-primary/10 p-1.5">
                <Wallet className="text-primary h-4 w-4 shrink-0" />
              </div>
              <span className="text-foreground text-xs font-semibold">
                الميزانية: {Number(data.finalPrice).toLocaleString("ar-EG")} ج.م
              </span>
            </div>
          )}

          {/* Images — same scroll style as OfferRequestCard */}
          {images.length > 0 && (
            <div className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 pt-1 pb-2">
              {images.map((url, i) => (
                <div
                  key={i}
                  className="border-border hover:border-primary/50 h-24 w-24 shrink-0 cursor-pointer overflow-hidden rounded-2xl border-2 transition-all hover:scale-105"
                  onClick={() => setLightbox(url)}
                >
                  <img
                    src={url}
                    alt={`صورة ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 pt-2 pb-1">
            <Button
              className="shadow-primary/20 h-12 flex-1 cursor-pointer rounded-2xl text-sm font-black shadow-lg transition-all hover:scale-[1.02]"
              onClick={() => setShowConfirm(true)}
              disabled={isPending}
            >
              {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : 'قبول الطلب'}
            </Button>
            <Button
              variant="outline"
              className="border-destructive/30 text-destructive hover:bg-destructive/10 h-12 flex-1 cursor-pointer rounded-2xl text-sm font-black transition-all hover:scale-[1.02]"
              onClick={handleReject}
              disabled={isPending}
            >
              {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : 'رفض'}
            </Button>
          </div>

        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/60 px-4 pb-6 sm:items-center sm:pb-0"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="bg-card border-border flex w-full max-w-sm flex-col gap-5 rounded-3xl border-2 p-6"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="bg-primary/10 flex h-14 w-14 items-center justify-center rounded-2xl">
                <Wallet className="text-primary h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-foreground text-base font-black">تأكيد قبول الطلب</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  سيتم خصم{" "}
                  <span className="text-primary font-black">25 نقطة</span>{" "}
                  من رصيدك عند قبول الطلب
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirm(false)}
                className="border-border h-12 flex-1 rounded-2xl border-2 text-sm font-bold"
              >
                إلغاء
              </Button>
              <Button
                onClick={handleAcceptConfirmed}
                className="h-12 flex-1 rounded-2xl text-sm font-bold"
                disabled={isPending}
              >
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "تأكيد القبول"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            onClick={() => setLightbox(null)}
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={lightbox}
            alt="صورة مكبرة"
            className="max-h-[80vh] max-w-[90vw] rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}