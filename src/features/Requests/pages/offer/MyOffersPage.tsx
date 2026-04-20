import { useNavigate } from "react-router-dom";
import { Loader2, Tag, MapPin, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetAvailableRequests } from "../../../Requests/hooks/useGetAvailableRequests";
import { useGetServices } from "../../../Requests/hooks/useGetServices";
import { useGetMyOffers } from "../../hooks/useGetMyOffers";

const MyOffersPage = () => {
  const navigate = useNavigate();
  const { data: services } = useGetServices();
  const { data: requests, isLoading } = useGetAvailableRequests(services ?? []);
  const { data: myOffers } = useGetMyOffers();

  const offeredRequests = (requests ?? []).filter((r) => r.hasOffer);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!offeredRequests.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <div className="h-24 w-24 rounded-full bg-primary/5 flex items-center justify-center">
          <Tag className="h-10 w-10 text-primary/40" />
        </div>
        <h3 className="text-lg font-black text-foreground">لا توجد عروض مقدمة</h3>
        <p className="text-sm text-muted-foreground max-w-[240px] leading-relaxed">
          ستظهر هنا الطلبات التي قدمت عليها عروضاً.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-4 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-foreground">العروض المقدمة</h2>
          <Badge className="bg-primary/10 text-primary font-bold px-3 py-1">
            {offeredRequests.length} عرض
          </Badge>
        </div>

        {offeredRequests.map((req) => {
          const serviceName =
            services?.find((s) => s.id === req.serviceId)?.name ??
            `خدمة #${req.serviceId}`;
          const createdAt = req.createdAt
            ? new Date(req.createdAt).toLocaleDateString("ar-EG")
            : null;
          const offerData = myOffers?.find((o) => o.id === req.offerId);

          return (
            <Card
              key={req.id}
              className="rounded-xl border-r-4 border-primary cursor-pointer hover:shadow-md transition"
              onClick={() =>
                navigate("/provider/requests", {
                  state: {
                    request: req,
                    step: "WAITING",
                    offer: {
                      offerId: req.offerId!,
                      serviceRequestId: req.id,
                      price: offerData?.price ?? 0,
                      message: offerData?.message ?? undefined,
                    },
                  },
                })
              }
            >
              <CardContent className="px-4 py-3 space-y-3">

                {/* Client row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10 border border-border shrink-0 flex items-center justify-center">
                      {req.clientPictureUrl ? (
                        <img
                          src={req.clientPictureUrl}
                          alt={req.clientName ?? ""}
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
                  <Badge className="text-[10px] font-bold px-2.5 py-1 bg-primary/10 text-primary">
                    عرض مرسل
                  </Badge>
                </div>

                {/* Service + id */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                    #{req.id}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-primary shrink-0" />
                    <p className="text-sm font-bold text-primary">{serviceName}</p>
                  </div>
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
                    <span className="text-xs text-muted-foreground">عرضك المقدم</span>
                  </div>
                )}

                {/* Images */}
                {req.imageUrls?.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto scrollbar-none">
                    {req.imageUrls.map((url, i) => (
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
};

export default MyOffersPage;