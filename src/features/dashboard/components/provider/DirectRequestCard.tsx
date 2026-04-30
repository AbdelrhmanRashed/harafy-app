import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, MapPin, Calendar, X, Wallet } from "lucide-react";
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
  const [showConfirm, setShowConfirm] = useState(false); // ← NEW

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
    ? new Date(data.preferredTime).toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
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
      <Card className="border-primary/20 hover:border-primary/50 relative overflow-hidden rounded-3xl border-2 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="bg-primary/5 absolute right-0 top-0 h-full w-2" />
        <CardContent className="space-y-4 p-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1 font-bold shadow-none">
              طلب مباشر
            </Badge>
            {createdAt && (
              <span className="bg-secondary/50 text-muted-foreground rounded-full px-3 py-1 text-xs font-semibold">
                {createdAt}
              </span>
            )}
          </div>

          {/* Client */}
          <div className="flex items-center gap-3 ">
            <div className="border-border bg-primary/5 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 shadow-sm">
              {data.clientPictureUrl ? (
                <img
                  src={data.clientPictureUrl}
                  alt={data.clientName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm font-black text-primary">
                  {data.clientName?.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <p className="text-foreground text-base font-black">
                {data.clientName}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed font-medium">
            {data.description}
          </p>

          {/* Details Row */}
          <div className="bg-secondary/30 flex flex-wrap items-center gap-4 rounded-2xl p-3">
            {data.serviceRequestLocation && (
              <div className="flex items-center gap-2">
                <div className="bg-amber-500/10 rounded-full p-1.5">
                  <MapPin className="h-4 w-4 text-amber-600" />
                </div>
                <p className="text-foreground text-xs font-semibold" dir="ltr">
                  {data.serviceRequestLocation.address ?? 
  `${data.serviceRequestLocation.latitude.toFixed(3)}, ${data.serviceRequestLocation.longitude.toFixed(3)}`}
                </p>
              </div>
            )}
          </div>
          {images.length > 0 && (
            <div className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 pb-2 pt-1">
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

          {/* Actions */}
          <div className="flex gap-3 ">
            <Button
              className="h-12 flex-1 cursor-pointer rounded-2xl text-sm font-black shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
              onClick={() => setShowConfirm(true)}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'قبول الطلب'
              )}
            </Button>
            <Button
              variant="outline"
              className="border-destructive/30 text-destructive hover:bg-destructive/10 h-12 flex-1 cursor-pointer rounded-2xl text-sm font-black transition-all hover:scale-[1.02]"
              onClick={handleReject}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'رفض'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/60 px-4 pb-6 sm:pb-0"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="w-full max-w-sm bg-card rounded-3xl border-2 border-border p-6 flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon + text */}
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-base font-black text-foreground">تأكيد قبول الطلب</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  سيتم خصم{" "}
                  <span className="font-black text-primary">25 جنيه</span>{" "}
                  من رصيدك عند قبول الطلب
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirm(false)}
                className="flex-1 h-12 rounded-2xl border-2 border-border bg-background text-sm font-bold text-foreground"
              >
                إلغاء
              </Button>
              <Button
                onClick={handleAcceptConfirmed}
                className="flex-1 h-12 rounded-2xl bg-primary text-primary-foreground text-sm font-bold"
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "تأكيد القبول"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition"
            onClick={() => setLightbox(null)}
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={lightbox}
            alt="صورة مكبرة"
            className="max-w-[90vw] max-h-[80vh] rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}