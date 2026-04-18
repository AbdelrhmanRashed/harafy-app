import { useLocation, useNavigate } from "react-router-dom";
import { MapPin, Clock, Calendar, X, Star, Menu } from "lucide-react";
import { useGetServices } from "../../../Requests/hooks/useGetServices";
import MapView from "../../../services/components/MapView";
import { useLocation as useProviderLocation } from "../../../services/hooks/useLocation";
import { useRoute } from "../../../services/hooks/useRoute";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const BASE_URL = axiosInstance.defaults.baseURL ?? "";

const DirectRequestPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const request = state?.request;
  const { data: services } = useGetServices();
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    position: providerPos,
    setPosition: setProviderPos,
    detect,
    searchAddress,
  } = useProviderLocation();

  // ✅ Auto-detect provider's real GPS location on mount
  useEffect(() => {
    detect();
  }, []);

  // ✅ Client's real location comes from the request data
  const clientPos = request?.serviceRequestLocation
    ? {
        lat: request.serviceRequestLocation.latitude,
        lng: request.serviceRequestLocation.longitude,
      }
    : null;

  // ✅ Route from provider's real location to client's location
  const { route } = useRoute(clientPos, providerPos);

  if (!request) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">لا توجد بيانات للطلب</p>
      </div>
    );
  }

  const serviceName =
    services?.find((s) => s.id === request.serviceId)?.name ?? "";

  const createdAt = request.createdAt
    ? new Date(request.createdAt).toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const preferredTime = request.preferredTime
    ? new Date(request.preferredTime).toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const clientPictureUrl = request.clientPictureUrl
    ? request.clientPictureUrl.startsWith("http")
      ? request.clientPictureUrl
      : `${BASE_URL}/${request.clientPictureUrl}`
    : null;

  const images: string[] = (request.imageUrls ?? []).map((url: string) =>
    url.startsWith("http") ? url : `${BASE_URL}/${url}`
  );

  return (
    <div className="bg-background flex h-[calc(100vh-64px)] flex-col overflow-hidden font-[Cairo,sans-serif] md:flex-row">

      {/* Mobile toggle button */}
      <button
        type="button"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-4 left-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-105 md:hidden"
      >
        {sidebarOpen ? (
          <X className="text-foreground h-5 w-5" />
        ) : (
          <Menu className="text-foreground h-5 w-5" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        dir="rtl"
        className={cn(
          "border-border bg-background absolute inset-y-0 right-0 z-30 flex w-full flex-col overflow-y-auto border-l shadow-[-10px_0_30px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-out",
          "md:relative md:w-full md:max-w-md md:translate-x-0 md:transition-none",
          sidebarOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Mobile header */}
        <div className="border-border flex shrink-0 items-center justify-between border-b px-4 py-3 md:hidden">
          <h2 className="text-foreground text-sm font-bold">تفاصيل الطلب</h2>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="hover:bg-muted flex h-8 w-8 items-center justify-center rounded-full"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-4 px-5 pt-5 pb-6">

          {/* Client header */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="border-border bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border">
                {clientPictureUrl ? (
                  <img
                    src={clientPictureUrl}
                    alt={request.clientName ?? ""}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-primary text-sm font-bold">
                    {request.clientName?.charAt(0) ?? "ع"}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-base font-bold">
                  {request.clientName}
                </h2>
                {serviceName && (
                  <p className="text-primary truncate text-sm font-semibold">
                    {serviceName}
                  </p>
                )}
              </div>
            </div>
            <span className="text-muted-foreground shrink-0">
              رقم الطلب: ORD-{request.id}
            </span>
          </div>

          {/* Description */}
          <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
            {request.description ?? "لا يوجد وصف"}
          </p>

          {/* Meta */}
          <div className="flex flex-col gap-1.5">
            {preferredTime && (
              <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                <Calendar className="h-3.5 w-3.5 shrink-0" />
                {preferredTime}
              </span>
            )}
            {createdAt && (
              <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                {createdAt}
              </span>
            )}
            {request.serviceRequestLocation && (
              <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                {request.serviceRequestLocation.latitude.toFixed(3)},{" "}
                {request.serviceRequestLocation.longitude.toFixed(3)}
              </span>
            )}
            {request.finalPrice && (
              <span className="text-primary text-sm font-bold">
                {Number(request.finalPrice).toLocaleString("ar-EG")} جنيه
              </span>
            )}
          </div>

          {/* Images */}
          {images.length === 1 && (
            <div
              className="border-border h-44 cursor-pointer overflow-hidden rounded-2xl border"
              onClick={() => setLightbox(images[0])}
            >
              <img src={images[0]} className="h-full w-full object-cover" />
            </div>
          )}
          {images.length === 2 && (
            <div className="grid h-44 grid-cols-2 gap-2">
              {images.map((src, i) => (
                <div
                  key={i}
                  className="border-border cursor-pointer overflow-hidden rounded-2xl border"
                  onClick={() => setLightbox(src)}
                >
                  <img src={src} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}
          {images.length >= 3 && (
            <div className="grid h-44 grid-cols-[1fr_2fr] gap-2">
              <div className="flex flex-col gap-2">
                {images.slice(0, 2).map((src, i) => (
                  <div
                    key={i}
                    className="border-border flex-1 cursor-pointer overflow-hidden rounded-2xl border"
                    onClick={() => setLightbox(src)}
                  >
                    <img src={src} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
              <div
                className="border-border relative cursor-pointer overflow-hidden rounded-2xl border"
                onClick={() => setLightbox(images[2])}
              >
                <img src={images[2]} className="h-full w-full object-cover" />
                {images.length > 3 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-lg font-bold text-white">
                    +{images.length - 3}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Button */}
          <div className="border-border border-t pt-4">
            <Button
              variant="gradient"
              className="h-11 w-full rounded-2xl font-bold"
              onClick={() => navigate("/provider/reviews")}
            >
              <Star className="ml-1 h-4 w-4" />
              التقييمات
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="إغلاق"
          onClick={() => setSidebarOpen(false)}
          className="absolute inset-0 z-20 bg-black/50 md:hidden"
        />
      )}

      {/* Map — provider real GPS + client location from request */}
      <MapView
        center={clientPos ?? providerPos}
        customerPos={clientPos ?? providerPos}
        providers={[]}
        selectedProvider={null}
        route={route}
        onLocationSelect={setProviderPos}
        onProviderSelect={() => {}}
        onAddressSearch={searchAddress}
      />

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white"
            onClick={() => setLightbox(null)}
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={lightbox}
            className="max-h-[80vh] max-w-[90vw] rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default DirectRequestPage;