import { useState, useEffect, useRef } from "react";
import { Loader2, Clock, CheckCircle2, Edit3, XCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUpdateOffer } from "../hooks/useUpdateOffer";
import { useDeleteOffer } from "../hooks/useDeleteOffer";
import { useAssignedRequests } from "../hooks/useAssignedRequests";
import type { SubmittedOffer } from "../types/providerOfferTypes";

type Step3WaitingApprovalProps = {
  offer: SubmittedOffer;
  onCancelled: () => void;
  onAccepted?: () => void;
};

export default function Step3WaitingApproval({
  offer,
  onCancelled,
  onAccepted,
}: Step3WaitingApprovalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editPrice, setEditPrice] = useState(String(offer.price));
  const [editMessage, setEditMessage] = useState(offer.message ?? "");
  const [currentPrice, setCurrentPrice] = useState(offer.price);
  const [currentMessage, setCurrentMessage] = useState(offer.message ?? "");

  const { mutate: updateMutate, isPending: isUpdating } = useUpdateOffer();
  const { mutate: deleteMutate, isPending: isDeleting } = useDeleteOffer();

  const acceptedRef = useRef(false);
  const { data: assignedRequests } = useAssignedRequests(true, { enabled: !!onAccepted });

  useEffect(() => {
    if (!assignedRequests || !onAccepted) return;
    if (acceptedRef.current) return;
    console.log("=== POLLING CHECK ===");
    console.log("assignedRequests:", assignedRequests);
    console.log("offer.serviceRequestId:", offer.serviceRequestId);
    console.log("ids in assigned:", assignedRequests.map(r => r.id));
    const accepted = assignedRequests.some(
      (r) => r.id === offer.serviceRequestId
    );
    console.log("accepted:", accepted);
    if (accepted) {
      acceptedRef.current = true;
      onAccepted();
    }
  }, [assignedRequests, offer.serviceRequestId, onAccepted]);

  const handleUpdate = () => {
    const numPrice = Number(editPrice);
    if (!numPrice || numPrice <= 0) return;
    updateMutate(
      { id: offer.serviceRequestId, price: numPrice, message: editMessage.trim() || undefined },
      {
        onSuccess: () => {
          setCurrentPrice(numPrice);
          setCurrentMessage(editMessage.trim());
          setIsEditing(false);
        },
      }
    );
  };

  const handleDelete = () => {
    deleteMutate(offer.offerId, {
      onSuccess: () => onCancelled(),
    });
  };

  return (
    <div className="flex flex-col gap-6 px-4 py-4 sm:px-5 pb-8 h-full" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-xl font-black">في انتظار الموافقة</h2>
        <Badge className="bg-primary/10 text-primary font-bold">قيد الانتظار</Badge>
      </div>

      {/* Illustration */}
      <div className="flex flex-col items-center py-6">
        <div className="relative mb-6">
          <div className="h-28 w-28 bg-primary/5 rounded-full outline outline-[12px] outline-primary/5 flex items-center justify-center">
            <Clock className="h-12 w-12 text-primary/50" />
          </div>
          <span className="absolute -bottom-1 -right-1 h-8 w-8 bg-primary/10 rounded-full border-[3px] border-white flex items-center justify-center shadow-sm">
            <Zap className="h-4 w-4 text-primary fill-current" />
          </span>
        </div>
        <h3 className="text-foreground text-lg font-black text-center">تم إرسال عرضك بنجاح!</h3>
        <p className="text-muted-foreground text-[13px] leading-relaxed mt-2 max-w-[260px] text-center">
          في انتظار موافقة العميل. سيتم إعلامك فور قبوله للعرض.
        </p>
      </div>

      {/* Offer summary / edit form */}
      {!isEditing ? (
        <div className="bg-muted/40 rounded-2xl p-4 border border-border/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
              طلب #{offer.serviceRequestId}, #{offer.offerId}
            </span>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-border/50">
            <span className="text-xl font-black text-primary">
              {currentPrice.toLocaleString("ar-EG")} جنيه
            </span>
            <span className="text-xs text-muted-foreground">السعر المقترح</span>
          </div>
          {currentMessage && (
            <div className="pt-1 border-t border-border/50">
              <p className="text-xs text-muted-foreground leading-relaxed">{currentMessage}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-muted/40 rounded-2xl p-4 border-2 border-primary/40 space-y-4">
          <p className="text-sm font-bold text-foreground">تعديل العرض</p>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-muted-foreground">
              السعر (جنيه) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                min={1}
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                className="w-full rounded-xl border-2 border-border bg-background px-4 py-2.5 text-base font-bold text-foreground focus:border-primary focus:outline-none transition-colors"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-bold">
                ج.م
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-muted-foreground">رسالة (اختياري)</label>
            <textarea
              value={editMessage}
              onChange={(e) => setEditMessage(e.target.value)}
              rows={3}
              className="w-full rounded-xl border-2 border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none transition-colors resize-none"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <Button
              onClick={handleUpdate}
              disabled={isUpdating || !editPrice || Number(editPrice) <= 0}
              className="flex-1 h-10 rounded-xl font-bold text-sm gap-1.5"
              variant="gradient"
            >
              {isUpdating && <Loader2 className="h-4 w-4 animate-spin" />}
              {isUpdating ? "جاري الحفظ..." : "حفظ التعديل"}
            </Button>
            <Button
              variant="default"
              onClick={() => {
                setEditPrice(String(currentPrice));
                setEditMessage(currentMessage);
                setIsEditing(false);
              }}
              disabled={isUpdating}
              className="h-10 px-4 rounded-xl font-bold text-sm"
            >
              إلغاء
            </Button>
          </div>
        </div>
      )}

      {/* Loader bar */}
      {!isEditing && (
        <div className="flex flex-col items-center gap-3 w-full max-w-[240px] mx-auto">
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden relative" dir="ltr">
            <div
              className="absolute inset-y-0 left-0 w-1/3 bg-primary rounded-full"
              style={{ animation: "slide-loader 1.5s ease-in-out infinite alternate" }}
            />
          </div>
          <span className="text-sm font-bold text-muted-foreground tracking-[0.1em] uppercase">
            انتظار قبول العميل
          </span>
          <style>{`
            @keyframes slide-loader {
              0%   { transform: translateX(0); }
              100% { transform: translateX(200%); }
            }
          `}</style>
        </div>
      )}

      {/* Actions */}
      <div className="mt-auto flex flex-col gap-3 pt-2">
        {!isEditing && (
          <Button
            variant="outline"
            className="w-full h-12 rounded-2xl font-bold gap-2 border-primary/40 text-primary hover:bg-primary/5 hover:border-primary transition-all"
            onClick={() => setIsEditing(true)}
            disabled={isDeleting}
          >
            <Edit3 className="h-4 w-4" />
            تعديل العرض
          </Button>
        )}
        <Button
          className="w-full h-12 rounded-2xl font-bold gap-2 transition-all"
          onClick={handleDelete}
          disabled={isDeleting || isUpdating}
        >
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <XCircle className="h-4 w-4 text-white" />
          )}
          {isDeleting ? "جاري الإلغاء..." : "إلغاء العرض"}
        </Button>
      </div>
    </div>
  );
}