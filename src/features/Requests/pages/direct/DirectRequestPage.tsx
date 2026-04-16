import { useLocation, useNavigate } from "react-router-dom";
import { MapPin, Clock, Calendar, X, Star, CheckCircle2 } from "lucide-react";
import { useGetServices } from "../../../Requests/hooks/useGetServices";
import MapView from "../../../services/components/MapView";
import { useLocation as useProviderLocation } from "../../../services/hooks/useLocation";
import { useRoute } from "../../../services/hooks/useRoute";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";
import { useState } from "react";

const BASE_URL = axiosInstance.defaults.baseURL ?? "";

const DirectRequestPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const request = state?.request;
  const { data: services } = useGetServices();
  const [lightbox, setLightbox] = useState<string | null>(null);

  const {
    position: providerPos,
    setPosition: setProviderPos,
    searchAddress,
  } = useProviderLocation();

  const clientPos = request?.serviceRequestLocation
    ? {
        lat: request.serviceRequestLocation.latitude,
        lng: request.serviceRequestLocation.longitude,
      }
    : null;

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
 <div
      className="bg-background flex h-[calc(100vh-64px)] flex-col overflow-hidden font-[Cairo,sans-serif] md:flex-row"
    >
      {/* Sidebar — right side */}
      <div
      dir="rtl"
        className="w-full max-w-md bg-background border-l border-border shadow-[-10px_0_30px_rgba(0,0,0,0.08)] overflow-y-auto"
      >
        <div className="px-5 pt-5 pb-6 flex flex-col gap-4">
             <div className="flex flex-col gap-4 flex-1">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/10 border border-border flex items-center justify-center shrink-0">
                {clientPictureUrl ? (
                  <img
                    src={clientPictureUrl}
                    alt={request.clientName ?? ""}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-bold text-primary">
                    {request.clientName?.charAt(0) ?? "ع"}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <h2 className="text-base font-bold truncate">
                  {request.clientName}
                </h2>
                {serviceName && (
                  <p className="text-sm font-semibold text-primary truncate">
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
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {request.description ?? "لا يوجد وصف"}
          </p>
          <div className="flex flex-col gap-1.5">
            {preferredTime && (
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 shrink-0" />
                {preferredTime}
              </span>
            )}
            {createdAt && (
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                {createdAt}
              </span>
            )}
            {request.serviceRequestLocation && (
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                {request.serviceRequestLocation.latitude.toFixed(3)},{" "}
                {request.serviceRequestLocation.longitude.toFixed(3)}
              </span>
            )}
            {request.finalPrice && (
              <span className="text-sm font-bold text-primary">
                {Number(request.finalPrice).toLocaleString("ar-EG")} جنيه
              </span>
            )}
          </div>



          {/* Images */}
          {images.length === 1 && (
            <div
              className="h-44 rounded-2xl overflow-hidden border border-border cursor-pointer"
              onClick={() => setLightbox(images[0])}
            >
              <img src={images[0]} className="w-full h-full object-cover" />
            </div>
          )}

          {images.length === 2 && (
            <div className="grid grid-cols-2 gap-2 h-44">
              {images.map((src, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden border border-border cursor-pointer"
                  onClick={() => setLightbox(src)}
                >
                  <img src={src} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {images.length >= 3 && (
            <div className="grid grid-cols-[1fr_2fr] gap-2 h-44">
              <div className="flex flex-col gap-2">
                {images.slice(0, 2).map((src, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-2xl overflow-hidden border border-border cursor-pointer"
                    onClick={() => setLightbox(src)}
                  >
                    <img src={src} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div
                className="relative rounded-2xl overflow-hidden border border-border cursor-pointer"
                onClick={() => setLightbox(images[2])}
              >
                <img src={images[2]} className="w-full h-full object-cover" />
                {images.length > 3 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-lg font-bold">
                    +{images.length - 3}
                  </div>
                )}
              </div>
            </div>
          )}
          </div>
          {/* Button */}
          <div className="px-5 pb-5 pt-2 border-t border-border mt-auto">
          <Button
            variant="gradient"
            className="h-11 w-full rounded-2xl font-bold"
            onClick={() => navigate("/provider/reviews")}
          >
            <Star className="h-4 w-4 ml-1" />
            التقييمات
          </Button>
</div>
        </div>
      </div>
      {/* Map — left side */}
      <div className="relative flex-1 min-h-0 h-full">
        <MapView
          onLocationSelect={setProviderPos}
          center={clientPos ?? providerPos}
          customerPos={clientPos ?? providerPos}
          providers={[]}
          selectedProvider={null}
          route={route}
          onProviderSelect={() => {}}
          onAddressSearch={searchAddress}
        />
      </div>
      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white"
            onClick={() => setLightbox(null)}
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={lightbox}
            className="max-w-[90vw] max-h-[80vh] rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

    </div>
  );
};

export default DirectRequestPage;