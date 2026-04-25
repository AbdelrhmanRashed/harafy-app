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
      <Card className="rounded-xl border-r-4 border-primary">
        <CardContent className="px-4 py-3 space-y-3">

          {/* Header */}
          <div className="flex justify-between items-center">
            <Badge className="text-xs bg-muted px-2 py-2 text-primary">
              طلب مباشر
            </Badge>
            {createdAt && (
              <Badge className="text-xs text-muted-foreground bg-muted-foreground/10 px-4 py-2">
                {createdAt}
              </Badge>
            )}
          </div>

          {/* Client */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10 border border-border shrink-0 flex items-center justify-center">
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
              <p className="font-medium text-sm">{data.clientName}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-md text-muted-foreground leading-relaxed line-clamp-2">
            {data.description}
          </p>

          {/* Preferred time */}
          {preferredTimeFormatted && (
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {preferredTimeFormatted}
            </p>
          )}

          {/* Final price */}
          {data.finalPrice && (
            <p className="text-sm font-bold text-primary">
              {Number(data.finalPrice).toLocaleString("ar-EG")} جنيه
            </p>
          )}

          {/* Images */}
          {images.length > 0 && (
            <div className="flex gap-2 overflow-x-auto scrollbar-none -mx-1 px-1">
              {images.map((url, i) => (
                <div
                  key={i}
                  className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-border cursor-pointer"
                  onClick={() => setLightbox(url)}
                >
                  <img
                    src={url}
                    alt={`صورة ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Location */}
          {data.serviceRequestLocation && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {data.serviceRequestLocation.latitude.toFixed(3)},{" "}
              {data.serviceRequestLocation.longitude.toFixed(3)}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              className="flex-1 rounded-2xl py-2 font-bold"
              onClick={() => setShowConfirm(true)} // ← opens dialog
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "قبول الطلب"
              )}
            </Button>
            <Button
              variant="secondary"
              className="flex-1 rounded-2xl py-2 text-primary font-bold"
              onClick={handleReject}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "رفض"
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