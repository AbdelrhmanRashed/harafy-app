import { useNavigate } from "react-router-dom";
import { Loader2, Briefcase, MapPin, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAssignedRequests } from "../../hooks/useAssignedRequests";
import { useGetServices } from "../../hooks/useGetServices";
import { useGetMyOffers } from "../../hooks/useGetMyOffers";



export default function AssignedRequestsPage() {
  const navigate = useNavigate();
  const { data: requests, isLoading } = useAssignedRequests(true);
  const { data: services } = useGetServices();
  const { data: myOffers } = useGetMyOffers();

  const sorted = [...(requests ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!sorted.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <div className="h-24 w-24 rounded-full bg-primary/5 flex items-center justify-center">
          <Briefcase className="h-10 w-10 text-primary/40" />
        </div>
        <h3 className="text-lg font-black text-foreground">لا توجد أعمال حالياً</h3>
        <p className="text-sm text-muted-foreground max-w-[240px] leading-relaxed">
          ستظهر هنا الطلبات المسندة إليك فور قبول العميل لعرضك.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-4 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-foreground">إجمالي الأعمال</h2>
          <Badge className="bg-primary/10 text-primary font-bold px-3 py-1">
            {sorted.length} طلب
          </Badge>
        </div>

        {sorted.map((req) => {

          const createdAt = req.createdAt
            ? new Date(req.createdAt).toLocaleDateString("ar-EG")
            : null;
          const images = req.imageUrls ?? [];
          const offerData = myOffers?.find((o) => o.serviceRequestId === req.id);

          return (
            <Card
              key={req.id}
              className="rounded-xl border-r-4 border-primary cursor-pointer hover:shadow-md transition"
              onClick={() =>
                navigate("/provider/requests", {
                  state: {
                    request: req,
                    step: "ACCEPTED",
                    offer: {
                      offerId: offerData?.id ?? 0,
                      serviceRequestId: req.id,
                      price: offerData?.price ?? 0,
                      message: offerData?.message ?? undefined,
                    },
                  },
                })
              }
            >
              <CardContent className="px-4 py-3 space-y-3">

                {/* Client row + status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10 border border-border shrink-0 flex items-center justify-center">
                      {req.clientPictureUrl ? (
                        <img
                          src={req.clientPictureUrl}
                          alt={req.clientName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs font-black text-primary">
                          {req.clientName?.charAt(0) ?? "ع"}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-foreground">
                        {req.clientName ?? "عميل"}
                      </p>
                      {createdAt && (
                        <p className="text-[11px] text-muted-foreground">{createdAt}</p>
                      )}
                    </div>
                  </div>
                  <Badge className={`text-[11px] font-bold px-3 py-1 text-primary bg-primary/10`}>
                    جاري العمل</Badge>
                </div>

                {/* Service + request id */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                    #{req.id}
                  </span>

                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2 text-right leading-relaxed">
                  {req.description || "لا يوجد وصف"}
                </p>

                {/* Offer price */}
                {offerData?.price != null && (
                  <div className="flex items-center justify-between border-t border-border/50 pt-2">
                    <span className="text-base font-black text-primary">
                      {offerData.price.toLocaleString("ar-EG")} جنيه
                    </span>
                    <span className="text-xs text-muted-foreground">السعر المتفق عليه</span>
                  </div>
                )}

                {/* Images */}
                {images.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto scrollbar-none">
                    {images.map((url, i) => (
                      <div
                        key={i}
                        className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-border"
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
                {req.serviceRequestLocation && (
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <MapPin className="h-3 w-3 shrink-0" />
                    <span>
                      {req.serviceRequestLocation.latitude.toFixed(3)},{" "}
                      {req.serviceRequestLocation.longitude.toFixed(3)}
                    </span>
                  </div>
                )}

              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}