import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { useGetServices } from '../../../Requests/hooks/useGetServices';
import type { AvailableRequestItem } from '../../../Requests/types/providerOfferTypes';

type Props = {
  data: AvailableRequestItem;
};

export default function OfferRequestCard({ data }: Props) {
  const navigate = useNavigate();
  const { data: services } = useGetServices();

  const serviceName =
    services?.find((s) => s.id === data.serviceId)?.name ?? '';
  const images = data.imageUrls ?? [];

  const createdAt = data.createdAt
    ? new Date(data.createdAt).toLocaleTimeString('ar-EG', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  return (
    <Card className="hover:border-primary/50 relative overflow-hidden rounded-3xl border-2 shadow-[0_2px_20px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_4px_25px_rgb(0,0,0,0.08)]">
      <div className="bg-primary/5 absolute top-0 right-0 h-full w-2" />
      <CardContent className="space-y-4 p-5">
        {/* Header */}
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
              <p className="text-foreground text-base font-black">
                {data.clientName}
              </p>
            </div>
          </div>
          {createdAt && (
            <span className="bg-secondary/50 text-muted-foreground rounded-full px-3 py-1 text-xs font-semibold">
              {createdAt}
            </span>
          )}
        </div>

        {/* Service name & Description */}
        <div className="space-y-1">
          {serviceName && (
            <p className="text-primary text-right text-sm font-bold">
              {serviceName}
            </p>
          )}
          <p className="text-muted-foreground line-clamp-2 text-right text-sm leading-relaxed font-medium">
            {data.description || 'لا يوجد وصف'}
          </p>
        </div>

        {/* Location Row */}
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

        {/* Images */}
        {images.length > 0 && (
          <div className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 pt-1 pb-2">
            {images.map((url, i) => (
              <div
                key={i}
                className="border-border hover:border-primary/50 h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-2 transition-all hover:scale-105"
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

        {/* Button */}
        <div className="pt-2">
          <Button
            className="shadow-primary/20 h-12 w-full cursor-pointer rounded-2xl text-sm font-black shadow-lg transition-all hover:scale-[1.02]"
            onClick={() =>
              navigate('/provider/requests', { state: { request: data } })
            }
          >
            تقديم عرض
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
