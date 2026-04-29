import { useNavigate } from 'react-router-dom';
import { Loader2, Briefcase, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAssignedRequests } from '../../hooks/useAssignedRequests';
// import { useGetServices } from "../../hooks/useGetServices";
import { useGetMyOffers } from '../../hooks/useGetMyOffers';

export default function AssignedRequestsPage() {
  const navigate = useNavigate();
  const { data: requests, isLoading } = useAssignedRequests(true);
  // const { data: services } = useGetServices();
  const { data: myOffers } = useGetMyOffers();

  const sorted = [...(requests ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="text-primary h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!sorted.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <div className="bg-primary/5 flex h-24 w-24 items-center justify-center rounded-full">
          <Briefcase className="text-primary/40 h-10 w-10" />
        </div>
        <h3 className="text-foreground text-lg font-black">
          لا توجد أعمال حالياً
        </h3>
        <p className="text-muted-foreground max-w-[240px] text-sm leading-relaxed">
          ستظهر هنا الطلبات المسندة إليك فور قبول العميل لعرضك.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl space-y-8 p-4 pt-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-foreground text-3xl font-black tracking-tight">
              إجمالي الأعمال
            </h2>
            <p className="text-muted-foreground mt-1 text-sm font-medium">
              تابع جميع أعمالك المسندة إليك هنا
            </p>
          </div>
          <Badge className="bg-primary/10 text-primary px-4 py-2 text-sm font-bold shadow-sm">
            {sorted.length} طلب
          </Badge>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {sorted.map((req) => {
            const createdAt = req.createdAt
              ? new Date(req.createdAt).toLocaleDateString('ar-EG', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              : null;
            const images = req.imageUrls ?? [];
            const offerData = myOffers?.find(
              (o) => o.serviceRequestId === req.id,
            );

            return (
              <Card
                key={req.id}
                className="group hover:border-primary/30 relative cursor-pointer overflow-hidden rounded-3xl border-2 border-transparent bg-white shadow-[0_2px_20px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:bg-slate-900"
                onClick={() =>
                  navigate(`/provider/requests/ordertrack/${req.id}`, {
                    state: { request: req },
                  })
                }
              >
                <div className="bg-primary/10 absolute top-0 right-0 h-full w-2" />
                <CardContent className="space-y-4 p-6">
                  {/* Client row + status */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="border-border bg-primary/5 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border shadow-sm">
                        {req.clientPictureUrl ? (
                          <img
                            src={req.clientPictureUrl}
                            alt={req.clientName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-primary text-sm font-black">
                            {req.clientName?.charAt(0) ?? 'ع'}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-foreground text-base font-extrabold">
                          {req.clientName ?? 'عميل'}
                        </p>
                        {createdAt && (
                          <p className="text-muted-foreground text-xs font-medium">
                            {createdAt}
                          </p>
                        )}
                      </div>
                    </div>
                    <Badge className="bg-primary/10 text-primary px-3 py-1 text-[11px] font-bold shadow-none">
                      قيد التنفيذ
                    </Badge>
                  </div>

                  {/* Service + request id */}
                  <div className="flex items-center justify-between">
                    <span className="text-primary bg-primary/10 rounded-full px-2.5 py-1 text-xs font-bold">
                      #{req.id}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed font-medium">
                    {req.description || 'لا يوجد وصف'}
                  </p>

                  {/* Offer price */}
                  {offerData?.price != null && (
                    <div className="border-border/50 flex items-center justify-between border-t pt-4">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                          السعر المتفق عليه
                        </span>
                        <span className="text-primary text-xl font-black">
                          {offerData.price.toLocaleString('ar-EG')} جنيه
                        </span>
                      </div>

                      {/* Location */}
                      {req.serviceRequestLocation && (
                        <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-amber-600" />
                          <span
                            className="text-xs font-bold text-amber-700"
                            dir="ltr"
                          >
                            {req.serviceRequestLocation.address ??
                              `${req.serviceRequestLocation.latitude.toFixed(3)}, ${req.serviceRequestLocation.longitude.toFixed(3)}`}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Images */}
                  {images.length > 0 && (
                    <div className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 pt-1">
                      {images.map((url, i) => (
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
}
