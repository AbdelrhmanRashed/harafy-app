import { CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAssignedRequests } from "../hooks/useAssignedRequests";
import type { SubmittedOffer } from "../types/providerOfferTypes";

type Props = {
  offer: SubmittedOffer;
  onGoToReview: () => void;
};

export default function Step4Accepted({ offer, onGoToReview }: Props) {
  const { data: assignedRequests } = useAssignedRequests(true);

  const assignedRequest = assignedRequests?.find(
    (r) => r.id === offer.serviceRequestId
  );

  return (
    <div className="flex flex-col gap-6 px-4 py-4 sm:px-5 pb-8 h-full" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-xl font-black">تم قبول عرضك!</h2>
      </div>

      {/* Success illustration */}
      <div className="flex flex-col items-center py-8">
        <div className="relative mb-6">
          <div className="h-28 w-28 bg-green-500/10 rounded-full outline outline-[12px] outline-green-500/5 flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
        </div>
        <h3 className="text-foreground text-lg font-black text-center">
          وافق العميل على عرضك!
        </h3>
        <p className="text-muted-foreground text-[13px] leading-relaxed mt-2 max-w-[260px] text-center">
          تم تعيينك لهذا الطلب. يمكنك الآن مراجعة تقييمات العملاء.
        </p>
      </div>

      {/* Assigned request summary */}
      {assignedRequest && (
        <div className="bg-muted/40 rounded-2xl p-4 border border-border/60 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-extrabold text-foreground truncate">
                {assignedRequest.clientName}
              </p>
              <p className="text-xs text-muted-foreground truncate">
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-border/50">
            <span className="text-xl font-black text-primary">
              {offer.price.toLocaleString("ar-EG")} جنيه
            </span>
            <span className="text-xs text-muted-foreground">السعر المتفق عليه</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-auto flex flex-col gap-3 pt-2">
        <Button
          onClick={onGoToReview}
          className="w-full h-12 rounded-2xl font-bold gap-2"
          variant="gradient"
        >
          <Star className="h-4 w-4" />
          عرض تقييماتي
        </Button>
      </div>
    </div>
  );
}