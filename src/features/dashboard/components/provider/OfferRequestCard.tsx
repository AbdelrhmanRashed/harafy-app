import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { useGetServices } from "../../../Requests/hooks/useGetServices";
import type { AvailableRequestItem } from "../../../Requests/types/providerOfferTypes";

type Props = {
  data: AvailableRequestItem;
};

export default function OfferRequestCard({ data }: Props) {
  const navigate = useNavigate();
  const { data: services } = useGetServices();

  const serviceName = services?.find((s) => s.id === data.serviceId)?.name ?? "";
  const images = data.imageUrls ?? [];

  const createdAt = data.createdAt
    ? new Date(data.createdAt).toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <Card className="rounded-xl border-r-4 border-primary">
      <CardContent className="px-4 py-3 space-y-3">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10 border border-border shrink-0 flex items-center justify-center">
              {data.clientPictureUrl ? (
                <img
                  src={data.clientPictureUrl}
                  alt={data.clientName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs font-black text-primary">
                  {data.clientName?.charAt(0)}
                </span>
              )}
            </div>
            <p className="text-sm font-extrabold text-foreground">{data.clientName}</p>
          </div>
          <Badge className="text-[11px] text-muted-foreground bg-muted px-4 py-2">{createdAt}</Badge>
        </div>

        {/* Service name */}
        {serviceName && (
          <p className="text-sm font-bold text-primary text-right">{serviceName}</p>
        )}

        {/* Description */}
        <p className="text-sm text-muted-foreground text-right line-clamp-2">
          {data.description || "لا يوجد وصف"}
        </p>

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
        {data.serviceRequestLocation && (
          <div className="flex items-center  gap-1 text-[11px] text-muted-foreground">
            <MapPin className="h-3 w-3 shrink-0" />
            <span>
              {data.serviceRequestLocation.latitude.toFixed(3)},{" "}
              {data.serviceRequestLocation.longitude.toFixed(3)}
            </span>
          </div>
        )}

        {/* Button */}
        <Button
          className="w-full"
          onClick={() =>
            navigate("/provider/requests", { state: { request: data } })
          }
        >
          تقديم عرض
        </Button>

      </CardContent>
    </Card>
  );
}