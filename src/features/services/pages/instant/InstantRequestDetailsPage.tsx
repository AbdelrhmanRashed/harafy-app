"use client";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  MapPin, FileText, Wrench, ExternalLink,
  Megaphone, Search, CheckCircle2, Clock,
  Users, CircleDot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { customerIcon } from "@/features/services/utils/mapIcons";
import { useGetServiceReqById } from "../../hooks/useGetServiceReqById";
import { useGetRequestOffer } from "../../hooks/useGetRequestOffer";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RequestState {
  id: number;
  requestStatus: number;
  description: string;
  finalPrice: number;
  createdAt: string;
  preferredTime: string;
  clientId: number;
  providerId: number;
  serviceRequestLocation: {
    latitude: number;
    longitude: number;
  };
  serviceId: number;
  imageUrls: string[];
}

// ─── Status Timeline ──────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "تم الإرسال",      icon: CheckCircle2 },
  { id: 2, label: "انتظار العروض",   icon: Clock        },
  { id: 3, label: "اختيار المحترف",  icon: Users        },
  { id: 4, label: "الإتمام",         icon: CircleDot    },
];

function StatusTimeline({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full px-2">
      <div className="relative flex items-start justify-between">
        {/* Connecting line */}
        <div className="absolute top-5 right-5 left-5 h-px bg-border" />
        <div
          className="absolute top-5 right-5 h-px bg-primary transition-all duration-700"
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />

        {STEPS.map((step) => {
          const isCompleted = step.id < currentStep;
          const isActive    = step.id === currentStep;
          const Icon        = step.icon;

          return (
            <div key={step.id} className="relative flex flex-col items-center gap-2 z-10">
              {/* Circle */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                isCompleted
                  ? "bg-primary border-primary text-white"
                  : isActive
                  ? "bg-white border-primary text-primary shadow-md shadow-primary/20"
                  : "bg-muted border-border text-muted-foreground"
              }`}>
                {isActive && (
                  <span className="absolute w-10 h-10 rounded-full bg-primary/20 animate-ping" />
                )}
                <Icon className="h-4 w-4 relative z-10" />
              </div>

              {/* Label */}
              <span className={`text-[11px] font-bold text-center leading-tight max-w-[60px] ${
                isActive    ? "text-primary"
                : isCompleted ? "text-foreground"
                : "text-muted-foreground"
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InstantRequestDetailsPage() {
  const { requestId } = useParams();
  const navigate      = useNavigate();
  const location      = useLocation();
  const state         = location.state as any;
  

  // call api get service request by id
  const { data, isLoading } = useGetServiceReqById(requestId!);  

  // call api get request offer by id
  const {  data: requestOffers, isLoading: requestOfferLoading } = useGetRequestOffer(requestId!);  

  // Map Data from API or fallback to state
  const reqData = data as RequestState | undefined;
  const id = reqData?.id || state?.requestId || requestId;
  const description = reqData?.description || state?.description || "لا يوجد تفاصيل إضافية";
  const position = reqData?.serviceRequestLocation ? {
    lat: reqData.serviceRequestLocation.latitude,
    lng: reqData.serviceRequestLocation.longitude
  } : state?.position || { lat: 24.7136, lng: 46.6753 };

  const serviceName = state?.serviceName || (reqData?.serviceId ? `خدمة #${reqData.serviceId}` : "خدمة فوري");
  const address = state?.address || `موقع محدد (${position.lat.toFixed(4)}, ${position.lng.toFixed(4)})`;
  const tags = state?.tags || ["فوري"];

  // Mock: providers online nearby
  const onlineProviders = 3;

  // const { mutateAsync: setReqCompleted } = useSetReqCompleted();
  // const { mutateAsync: setReqCancelled } = useSetReqCancelled();
  // const { mutateAsync: assignServiceReq } = useAssignServiceReq();
  // const { mutateAsync: deleteServiceReq } = useDeleteServiceReq();

  // const { data: nearbyProviders, isLoading: nearbyProvidersLoading } = useGetNearbyProviders(position.lat, position.lng, '10' ,reqData?.serviceId?.toString() || "25"   );
  // console.log('nearbyProviders',nearbyProviders);

  if (isLoading && !state) {
    return (
      <div  className="min-h-screen bg-background flex items-center justify-center font-[Cairo,sans-serif]">
        <div className="text-primary font-bold animate-pulse text-lg">جاري تحميل تفاصيل الطلب...</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-background font-[Cairo,sans-serif] pb-10"
    >
      <div className="max-w-2xl mx-auto px-4 pt-6 space-y-6">

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4">
          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="destructive"
              size="sm"
              className="rounded-full text-xs font-bold h-9 px-4"
              onClick={() => navigate(-1)}
            >
              إلغاء الطلب
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full text-xs font-bold h-9 px-4 border-primary text-primary hover:bg-primary/5"
              onClick={() => navigate(-1)}
            >
              تعديل الطلب
            </Button>
          </div>

          {/* Title + ID */}
          <div className="text-right">
            <h1 className="text-2xl font-black text-foreground">
              تفاصيل الطلب الفوري
            </h1>
            <div className="flex items-center justify-end gap-2 mt-1">
              <Badge
                variant="secondary"
                className="text-xs font-bold text-primary bg-primary/10 rounded-full"
              >
                في انتظار عروض المحترفين
              </Badge>
              <span className="text-sm font-bold text-muted-foreground">
                #{id}
              </span>
            </div>
          </div>
        </div>

        {/* ── Status Timeline ── */}
        <StatusTimeline currentStep={2} />

        <Separator />

        {/* ── Success Banner ── */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-l from-violet-600 to-purple-700 p-6 text-white">
          {/* Decorative circles */}
          <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-white/10" />
          <div className="absolute -bottom-4 -left-2 w-16 h-16 rounded-full bg-white/5" />

          <div className="relative flex items-center gap-4">
            {/* Text */}
            <div className="flex-1 text-right space-y-2">
              <h2 className="text-xl font-black">تم نشر طلبك بنجاح!</h2>
              <p className="text-sm text-white/80 leading-relaxed">
                المحترفون في منطقتك يراجعون طلبك الآن لإرسال أفضل عروضهم.
                ستصلك إشعارات فورية عند توفر عروض جديدة.
              </p>
            </div>

            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
              <Megaphone className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        {/* ── Two column: offers placeholder + request summary ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Left: Offers placeholder */}
          {requestOffers?.length > 0 ? (<div>
            {requestOffers?.map((offer:any) => (
              <div key={offer.id}>
                {/* <p>{offer.provider.name}</p>
                <p>{offer.provider.nickname}</p>
                <p>{offer.provider.baseLocation.addressText}</p> */}
                <p>{offer.price}</p>
                <p>{offer.message}</p>
              </div>
            ))}
          </div>) : (
            <div className="flex flex-col items-center justify-center gap-4 py-10 px-6 bg-muted/30 rounded-3xl border-2 border-dashed border-border text-center">
              <div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center relative">
                <FileText className="h-8 w-8 text-muted-foreground" />
                <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                  <Search className="h-3.5 w-3.5 text-primary" />
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-base font-extrabold text-foreground">
                  ستظهر العروض هنا قريباً
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
                  يقوم النظام حالياً بمطابقة طلبك مع المحترفين الموثوقين.
                  عادة ما يستغرق أول عرض من 5 إلى 15 دقيقة.
                </p>
              </div>

              {/* Online providers */}
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-border">
                <span className="text-sm font-bold text-foreground">
                  {onlineProviders} محترفين متصلين الآن في منطقتك
                </span>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
              </div>
            </div>
          )}  

          {/* Right: Request summary */}
          <div className="bg-card rounded-3xl border border-border/50 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-base font-extrabold text-foreground text-right">
                ملخص الطلب
              </h3>
            </div>

            <div className="px-5 py-4 space-y-4">
              {/* Service type */}
              <SummaryRow
                icon={<Wrench className="h-4 w-4 text-primary" />}
                label="نوع الخدمة"
                value={serviceName}
              />

              {/* Location */}
              <SummaryRow
                icon={<MapPin className="h-4 w-4 text-primary" />}
                label="الموقع"
                value={address.split(",").slice(0, 2).join(",")}
              />

              {/* Description */}
              <div className="space-y-1 text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className="text-xs text-muted-foreground">التفاصيل</span>
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground leading-relaxed line-clamp-4">
                  {description}
                </p>
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex items-center justify-end gap-2 flex-wrap">
                  {tags.map((tag: string) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs font-bold bg-primary/10 text-primary rounded-full"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Mini map */}
            <div className="relative h-40 border-t border-border">
              <MapContainer
                center={[position.lat, position.lng]}
                zoom={13}
                className="w-full h-full"
                zoomControl={false}
                dragging={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
                attributionControl={false}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                <Marker
                  position={[position.lat, position.lng]}
                  icon={customerIcon}
                />
              </MapContainer>

              {/* Open in maps button */}
              <button
                className="absolute bottom-3 left-3 z-[1000] flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-xs font-bold text-foreground px-3 py-1.5 rounded-full shadow-md hover:bg-white transition-colors"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps?q=${position.lat},${position.lng}`,
                    "_blank"
                  )
                }
              >
                <ExternalLink className="h-3 w-3" />
                موقع الخدمة المختار
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── SummaryRow ───────────────────────────────────────────────────────────────

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
    <div className="space-y-0.5 text-right">
      <div className="flex items-center justify-end gap-2">
        <span className="text-xs text-muted-foreground">{label}</span>
        {icon}
      </div>
      <p className="text-sm font-extrabold text-foreground">{value}</p>
    </div>
  );
}
