import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Clock, Calendar, X, Star, Menu } from 'lucide-react';
import { useGetServices } from '../../../Requests/hooks/useGetServices';
import MapView from '../../../services/components/MapView';
import { useLocationCustom } from '../../../services/hooks/useLocation';
import { useRoute } from '../../../services/hooks/useRoute';
import { Button } from '@/components/ui/button';
import axiosInstance from '@/lib/axios';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import type { AssignedRequest } from '../../types/providerOfferTypes';
import { useLiveLocation } from '../../hooks/useUpdateLiveLocation';

const BASE_URL = axiosInstance.defaults.baseURL ?? '';

const OrderTrackPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data: services } = useGetServices();
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const request = state?.request as AssignedRequest | undefined;

  const {
    position: providerPos,
    setPosition: setProviderPos,
    detect: detectMyPosition,
  } = useLocationCustom();
  useLiveLocation(true, (pos) => {
    setProviderPos(pos);
  });

  useEffect(() => {
    detectMyPosition();
  }, [detectMyPosition]);

  const clientPos = request?.serviceRequestLocation
    ? {
        lat: request.serviceRequestLocation.latitude,
        lng: request.serviceRequestLocation.longitude,
      }
    : null;

  const { route } = useRoute(providerPos, clientPos);

  const getDynamicZoom = () => {
    if (!providerPos || !clientPos) return 13;
    const latDiff = Math.abs(providerPos.lat - clientPos.lat);
    const lngDiff = Math.abs(providerPos.lng - clientPos.lng);
    if (latDiff < 0.005 && lngDiff < 0.005) return 18;
    return 14;
  };

  const serviceName =
    services?.find((s) => s.id === request?.serviceId)?.name ?? '';

  const createdAt = request?.createdAt
    ? new Date(request.createdAt).toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  const preferredTime = request?.preferredTime
    ? new Date(request.preferredTime).toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  const clientPictureUrl = request?.clientPictureUrl
    ? request.clientPictureUrl.startsWith('http')
      ? request.clientPictureUrl
      : `${BASE_URL}/${request.clientPictureUrl}`
    : null;

  const images: string[] = (request?.imageUrls ?? []).map((url: string) =>
    url.startsWith('http') ? url : `${BASE_URL}/${url}`,
  );

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col md:flex-row" dir="ltr">
      <div className="flex-1">
        <MapView
          center={providerPos ?? clientPos}
          customerPos={clientPos ?? providerPos}
          providers={[]}
          selectedProvider={
            {
              id: 'current-provider',
              name: 'أنا (الفني)',
              pictureUrl: '',
              services: [{ name: serviceName }],
              rating: 5,
            } as any
          }
          liveProviderPos={providerPos}
          route={route}
          onLocationSelect={setProviderPos}
          onProviderSelect={() => {}}
          onAddressSearch={() => {}}
          allowMapPickLocation={false}
          zoom={getDynamicZoom()}
        />
      </div>

<aside
  dir="rtl"
  className={cn(
    'bg-background/95 fixed inset-y-0 right-0 z-1050 flex w-full max-w-full flex-col backdrop-blur-xl transition-transform duration-300 ease-out',
    'md:relative md:max-h-none md:w-full md:max-w-md md:translate-x-0 md:transition-none',
    sidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0',
  )}
>
  {/* Mobile handle */}
  <div className="flex shrink-0 items-center justify-between px-5 pt-4 pb-3 md:hidden">
    <h2 className="text-foreground text-base font-black">تفاصيل الطلب</h2>
    <button
      type="button"
      onClick={() => setSidebarOpen(false)}
      className="bg-secondary hover:bg-muted flex h-8 w-8 items-center justify-center rounded-full transition-colors"
    >
      <X className="h-4 w-4" />
    </button>
  </div>

  <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-5 pt-4 pb-8">

    {/* Client Card */}
    <div className="flex items-center gap-4 rounded-3xl p-4">
      <div className="ring-primary/20 relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full ring-2">
        {clientPictureUrl ? (
          <img
            src={clientPictureUrl}
            alt={request?.clientName ?? ''}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="bg-primary/10 flex h-full w-full items-center justify-center">
            <span className="text-primary text-xl font-black">
              {request?.clientName?.charAt(0) ?? 'ع'}
            </span>
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="text-foreground truncate text-base font-black">
          {request?.clientName ?? 'عميل'}
        </h2>
        {serviceName && (
          <p className="text-primary truncate text-sm font-semibold">
            {serviceName}
          </p>
        )}
      </div>

    </div>

    {/* Description */}
    {request?.description && (
      <p className="text-muted-foreground px-1 text-sm leading-relaxed">
        {request.description}
      </p>
    )}

    {/* Meta Details */}
    <div className="flex flex-col gap-2">
      {preferredTime && (
        <div className="bg-secondary/30 flex items-center gap-3 rounded-2xl px-4 py-3">
          <div className="bg-primary/10 rounded-xl p-2">
            <Calendar className="text-primary h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-muted-foreground mb-0.5 text-[10px] font-bold uppercase tracking-wide">
              الموعد المفضل
            </p>
            <span className="text-foreground text-sm font-semibold">
              {preferredTime}
            </span>
          </div>
        </div>
      )}
      {createdAt && (
        <div className="bg-secondary/30 flex items-center gap-3 rounded-2xl px-4 py-3">
          <div className="bg-primary/10 rounded-xl p-2">
            <Clock className="text-primary h-4 w-4" />
          </div>
          <div className="min-w-0">

            <span className="text-foreground text-sm font-semibold">
              {createdAt}
            </span>
          </div>
        </div>
      )}
      {request?.serviceRequestLocation && (
        <div className="bg-secondary/30 flex items-center gap-3 rounded-2xl px-4 py-3">
          <div className="rounded-xl bg-amber-500/10 p-2">
            <MapPin className="h-4 w-4 text-amber-600" />
          </div>
          <div className="min-w-0">
            <span className="text-foreground text-sm font-semibold" dir="ltr">
              {request.serviceRequestLocation.address ??
                `${request.serviceRequestLocation.latitude.toFixed(3)}, ${request.serviceRequestLocation.longitude.toFixed(3)}`}
            </span>
          </div>
        </div>
      )}
    </div>

    {/* Final Price */}
    {request?.finalPrice && (
      <div className="from-primary/10 to-primary/5 flex items-center justify-between rounded-2xl bg-linear-to-l px-5 py-4">
        <span className="text-muted-foreground text-sm font-bold">
          السعر المتفق عليه
        </span>
        <span className="text-primary text-2xl font-black">
          {Number(request.finalPrice).toLocaleString('ar-EG')}
          <span className="text-primary/70 mr-1 text-sm font-bold">جنيه</span>
        </span>
      </div>
    )}

    {/* Images */}
    {images.length === 1 && (
      <div
        className="h-48 cursor-pointer overflow-hidden rounded-2xl"
        onClick={() => setLightbox(images[0])}
      >
        <img src={images[0]} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
      </div>
    )}
    {images.length === 2 && (
      <div className="grid h-48 grid-cols-2 gap-2">
        {images.map((src, i) => (
          <div
            key={i}
            className="cursor-pointer overflow-hidden rounded-2xl"
            onClick={() => setLightbox(src)}
          >
            <img src={src} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
          </div>
        ))}
      </div>
    )}
    {images.length >= 3 && (
      <div className="grid h-48 grid-cols-[1fr_2fr] gap-2">
        <div className="flex flex-col gap-2">
          {images.slice(0, 2).map((src, i) => (
            <div
              key={i}
              className="flex-1 cursor-pointer overflow-hidden rounded-2xl"
              onClick={() => setLightbox(src)}
            >
              <img src={src} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
            </div>
          ))}
        </div>
        <div
          className="cursor-pointer overflow-hidden rounded-2xl"
          onClick={() => setLightbox(images[2])}
        >
          <img src={images[2]} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
        </div>
      </div>
    )}

    <div className="flex-1" />

    {/* CTA Button */}
    <Button
      variant="gradient"
      className="h-12 w-full rounded-2xl font-black text-base"
      onClick={() => navigate('/provider/reviews')}
    >
      <Star className="ml-2 h-4 w-4" />
      التقييمات
    </Button>

  </div>
</aside>

      {!sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="absolute bottom-6 left-4 z-9999 flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-md md:hidden"
        >
          <Menu className="text-foreground h-5 w-5" />
        </button>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/90"
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

export default OrderTrackPage;