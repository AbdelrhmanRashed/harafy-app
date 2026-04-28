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
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950" dir="rtl">
      <div className="mx-auto max-w-5xl space-y-8 p-4 pt-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-foreground">
              العروض المقدمة
            </h2>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              تابع الطلبات التي قدمت عروضاً لها
            </p>
          </div>
          <Badge className="bg-primary/10 text-primary px-4 py-2 text-sm font-bold shadow-sm">
            {offeredRequests.length} عرض
          </Badge>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
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
                className="group relative cursor-pointer overflow-hidden rounded-3xl border-2 border-transparent bg-white shadow-[0_2px_20px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:bg-slate-900"
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
                <div className="bg-primary/10 absolute right-0 top-0 h-full w-2" />
                <CardContent className="space-y-4 p-6">
                  {/* Client row */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="border-border bg-primary/5 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border shadow-sm">
                        {req.clientPictureUrl ? (
                          <img
                            src={req.clientPictureUrl}
                            alt={req.clientName ?? ""}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-primary text-sm font-black">
                            {req.clientName?.charAt(0) ?? "ع"}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-foreground text-base font-extrabold">
                          {req.clientName ?? "عميل"}
                        </p>
                        {createdAt && (
                          <p className="text-muted-foreground text-xs font-medium">
                            {createdAt}
                          </p>
                        )}
                      </div>
                    </div>
                    <Badge className="bg-primary/10 text-primary px-3 py-1 text-[11px] font-bold shadow-none">
                      قيد الانتظار
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
                  <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed font-medium">
                    {req.description || "لا يوجد وصف"}
                  </p>

                  {/* Offer price */}
                  {offerData?.price != null && (
                    <div className="border-border/50 flex items-center justify-between border-t pt-4">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
                          عرضك المقدم
                        </span>
                        <span className="text-primary text-xl font-black">
                          {offerData.price.toLocaleString("ar-EG")} جنيه
                        </span>
                      </div>

                      {/* Location */}
                      {req.serviceRequestLocation && (
                        <div className="bg-amber-500/10 flex items-center gap-1.5 rounded-full px-3 py-1.5">
                          <MapPin className="text-amber-600 h-3.5 w-3.5 shrink-0" />
                          <span className="text-amber-700 text-xs font-bold" dir="ltr">
                            {req.serviceRequestLocation.address ??
                              `${req.serviceRequestLocation.latitude.toFixed(3)}, ${req.serviceRequestLocation.longitude.toFixed(3)}`}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Images */}
                  {req.imageUrls?.length > 0 && (
                    <div className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 pt-1">
                      {req.imageUrls.map((url, i) => (
                        <div
                          key={i}
                          className="border-border hover:border-primary/40 h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-colors"
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
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyOffersPage;