import {
  Wrench,
  CalendarDays,
  ReceiptText,
  FileText,
  ImageIcon,
  ExternalLink,
} from 'lucide-react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { Separator } from '@/components/ui/separator';
import { customerIcon } from '../utils/mapIcons';
import { getImageUrl } from '@/lib/utils';
import { useServices } from '@/features/onboarding/hooks/useServices';
import { Button } from '@/components/ui/button';
import type { DirectRequestDetails } from '../types/directRequest';

// ─── SummaryRow Component ──────────────────────────────────────────────────
function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-0.5">
      <div className="flex items-center justify-start gap-2">
        {icon}
        <span className="text-muted-foreground text-xs">{label}:</span>
      </div>
      <p className="text-foreground text-left text-sm font-extrabold">
        {value}
      </p>
    </div>
  );
}

const RequestDetailsSection = ({
  requestDetails,
}: {
  requestDetails: DirectRequestDetails;
}) => {
  // Derived variables
  const position = {
    lat: requestDetails.serviceRequestLocation.latitude,
    lng: requestDetails.serviceRequestLocation.longitude,
  };

  const formattedDate = new Date(requestDetails.createdAt).toLocaleString(
    'ar-EG',
    {
      dateStyle: 'medium',
      timeStyle: 'short',
    },
  );
  const { data: services } = useServices();
  const getServiceType = (serviceId: number) => {
    return (
      services?.find((service: any) => service.id === serviceId)?.name ||
      'خدمة مباشرة'
    );
  };
  return (
    <div className="bg-card border-border/50 sticky top-20 overflow-hidden rounded-3xl border shadow-sm">
      <div className="bg-muted/30 border-border border-b px-5 py-4">
        <h3 className="text-foreground text-right text-lg font-extrabold">
          ملخص الطلب
        </h3>
      </div>

      <div className="space-y-5 px-5 py-5">
        {/* Service type / ID */}
        <SummaryRow
          icon={<Wrench className="text-primary h-4 w-4" />}
          label="نوع الخدمة المطلوبة"
          value={getServiceType(requestDetails.serviceId)}
        />

        {/* Date */}
        <SummaryRow
          icon={<CalendarDays className="text-primary h-4 w-4" />}
          label="تاريخ انشاء الخدمه"
          value={formattedDate}
        />

        {/* Final Price */}
        {requestDetails.finalPrice !== null && (
          <SummaryRow
            icon={<ReceiptText className="text-primary h-4 w-4" />}
            label="السعر النهائي"
            value={`${requestDetails.finalPrice} جنيه`}
          />
        )}

        <Separator className="my-2" />

        {/* Description */}
        <div className="w-full space-y-1.5 text-right">
          <div className="flex items-center gap-2">
            <FileText className="text-primary h-4 w-4" />
            <span className="text-muted-foreground text-xs">
              الوصف والتفاصيل
            </span>
          </div>
          <p className="text-foreground bg-muted/30 rounded-2xl p-3 text-sm leading-relaxed font-semibold wrap-break-word">
            {requestDetails.description || 'لا يوجد تفاصيل إضافية'}
          </p>
        </div>
      </div>

      {/* Attached Images */}
      {requestDetails.imageUrls && requestDetails.imageUrls.length > 0 && (
        <div className="border-border bg-muted/10 space-y-3 border-t px-5 py-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="text-primary h-4 w-4" />
            <span className="text-foreground text-xs font-bold">
              الصور المرفقة
            </span>
          </div>
          <div className="custom-scrollbar flex flex-row gap-3 overflow-x-auto pb-2">
            {requestDetails.imageUrls.map((url, i) => (
              <a
                key={i}
                href={getImageUrl(url)}
                target="_blank"
                rel="noreferrer"
                className="border-border block shrink-0 overflow-hidden rounded-xl border transition-opacity hover:opacity-80"
              >
                <img
                  src={getImageUrl(url)}
                  alt={`مرفق ${i + 1}`}
                  className="h-20 w-20 object-cover"
                />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Minimap Location */}
      <div className="border-border group relative h-48 border-t">
        <MapContainer
          center={[position.lat, position.lng]}
          zoom={14}
          className="h-full w-full"
          zoomControl={false}
          dragging={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
          <Marker position={[position.lat, position.lng]} icon={customerIcon} />
        </MapContainer>

        <div className="pointer-events-none absolute inset-0 z-400 bg-black/5 transition-colors group-hover:bg-transparent" />

        <Button
          className="text-primary border-border bg-card hover:bg-card/95 absolute bottom-3 left-3 z-1000 flex cursor-pointer items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-bold shadow-lg backdrop-blur-md transition-colors"
          onClick={() =>
            window.open(
              `https://www.google.com/maps?q=${position.lat},${position.lng}`,
              '_blank',
            )
          }
        >
          <ExternalLink className="h-3.5 w-3.5" />
          فتح في الخرائط
        </Button>
      </div>
    </div>
  );
};

export default RequestDetailsSection;
