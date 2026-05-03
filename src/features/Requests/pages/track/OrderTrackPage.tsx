import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Clock, Calendar, X, Star, Menu } from 'lucide-react';
import { useGetServices } from '../../../Requests/hooks/useGetServices';
import MapView from '../../../services/components/MapView';
import { useLocationCustom } from '../../../services/hooks/useLocation';
import { useRoute } from '../../../services/hooks/useRoute';
import { Button } from '@/components/ui/button';
import axiosInstance from '@/lib/axios';
import { useState, useEffect, useMemo, useRef } from 'react';
import { cn } from '@/lib/utils';
import type { AssignedRequest } from '../../types/providerOfferTypes';
import { useLiveLocation } from '../../hooks/useUpdateLiveLocation';
import { ServiceStatus } from '@/constants/service-status';
import CompletionOverlay from '../../components/CompletionOverlay';
import { useServiceRequestGeneral } from '../../hooks/useServiceRequestGeneral';

const BASE_URL = axiosInstance.defaults.baseURL ?? '';

const OrderTrackPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data: services } = useGetServices();
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const request = state?.request as AssignedRequest | undefined;

  // Poll every 10 s to detect when the client marks the service as completed
  // const { data: assignedRequests } = useAssignedRequests(true, {
  //   refetchInterval: 10_000,
  //   enabled: !!request?.id,
  // });
  // const liveRequest = useMemo(
    //   () => assignedRequests?.find((r) => r.id === request?.id) ?? request,
    //   [assignedRequests, request],
    // );
    
    const { data: liveRequest } = useServiceRequestGeneral(request?.id, {
      refetchInterval: 8_000,
    });
  const isCompleted = liveRequest?.requestStatus === ServiceStatus.COMPLETED;

  const fullRequest = useMemo(() => {
    if (!request) return null;
    if (!liveRequest) return request;
    return { ...request, ...liveRequest } as AssignedRequest;
  }, [request, liveRequest]);

  console.log(liveRequest);
  console.log(isCompleted);

  const {
    position: providerPos,
    setPosition: setProviderPos,
    detect: detectMyPosition,
  } = useLocationCustom();

  useLiveLocation(true, setProviderPos);
  // ↑ بدل (pos) => setProviderPos(pos) — arrow function جديدة كل render

  // ← مرة واحدة بس عند mount
  const detected = useRef(false);
  useEffect(() => {
    if (detected.current) return;
    detected.current = true;
    detectMyPosition();
  }, []);
  // ↑ مش محتاج detectMyPosition في deps لأنها ref-stable من useLocationCustom
  // لو مش stable نضيف eslint-disable-line

  const clientPos = useMemo(
    () =>
      request?.serviceRequestLocation
        ? {
            lat: request.serviceRequestLocation.latitude,
            lng: request.serviceRequestLocation.longitude,
          }
        : null,
    // client position ثابت طول الـ session
    [
      request?.serviceRequestLocation?.latitude,
      request?.serviceRequestLocation?.longitude,
    ],
  );

  const { route } = useRoute(providerPos, clientPos);

  // zoom بيتحسب بس لما providerPos أو clientPos يتغيروا فعلاً
  const zoom = useMemo(() => {
    if (!providerPos || !clientPos) return 13;
    const latDiff = Math.abs(providerPos.lat - clientPos.lat);
    const lngDiff = Math.abs(providerPos.lng - clientPos.lng);
    return latDiff < 0.005 && lngDiff < 0.005 ? 18 : 14;
  }, [providerPos?.lat, providerPos?.lng, clientPos?.lat, clientPos?.lng]);

  const serviceName = useMemo(
    () => services?.find((s) => s.id === request?.serviceId)?.name ?? '',
    [services, request?.serviceId],
  );

  // هذين ثابتين — بيتحسبوا مرة واحدة
  const createdAt = useMemo(
    () =>
      request?.createdAt
        ? new Date(request.createdAt).toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        : null,
    [request?.createdAt],
  );

  const preferredTime = useMemo(
    () =>
      request?.preferredTime
        ? new Date(request.preferredTime).toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        : null,
    [request?.preferredTime],
  );

  const clientPictureUrl = useMemo(() => {
    if (!request?.clientPictureUrl) return null;
    return request.clientPictureUrl.startsWith('http')
      ? request.clientPictureUrl
      : `${BASE_URL}/${request.clientPictureUrl}`;
  }, [request?.clientPictureUrl]);

  const images = useMemo<string[]>(
    () =>
      (request?.imageUrls ?? []).map((url: string) =>
        url.startsWith('http') ? url : `${BASE_URL}/${url}`,
      ),
    [request?.imageUrls],
  );

  // selectedProvider ثابت — object جديد كل render كان بيسبب re-render في MapView
  const selectedProvider = useMemo(
    () => ({
      id: 0,
      name: 'أنا (الفني)',
      pictureUrl: '',
      services: [{ id: 0, name: serviceName }],
      rating: 5,
    }),
    [serviceName],
  );

  return (
    <div
      className="relative flex h-[calc(100vh-8rem)] flex-col overflow-hidden md:h-[calc(100vh-4rem)] md:flex-row"
      dir="ltr"
    >
      <div className="relative flex-1 transition-all duration-300 z-0">
        <div className="absolute inset-0">
          <MapView
            center={providerPos ?? clientPos ?? { lat: 30.5877, lng: 31.502 }}
            customerPos={
              clientPos ?? providerPos ?? { lat: 30.5877, lng: 31.502 }
            }
            providers={[]}
            selectedProvider={selectedProvider}
            liveProviderPos={providerPos}
            route={route}
            onLocationSelect={setProviderPos}
            onProviderSelect={() => {}}
            onAddressSearch={() => {}}
            allowMapPickLocation={false}
            zoom={zoom}
          />
        </div>
      </div>

      {/* باقي الـ JSX زي ما هو */}
      <aside
        dir="rtl"
        className={cn(
          'bg-background/95 z-[1000] flex w-full flex-col rounded-t-3xl border-t shadow-[0_-10px_40px_rgba(0,0,0,0.1)] backdrop-blur-xl transition-all duration-300 ease-in-out',
          'absolute right-0 bottom-0 left-0 md:relative md:w-full md:max-w-md md:rounded-none md:border-t-0 md:border-l md:shadow-none md:backdrop-blur-none',
          sidebarOpen
            ? 'h-[60vh] translate-y-0 md:h-auto'
            : 'h-0 translate-y-full overflow-hidden md:h-auto md:translate-y-0 md:overflow-visible',
        )}
      >
        <div className="flex w-full justify-center pt-3 pb-1 md:hidden">
          <div className="bg-muted-foreground/30 h-1.5 w-12 rounded-full" />
        </div>

        <div className="flex shrink-0 items-center justify-between px-5 pt-2 pb-3 md:pt-6">
          <h2 className="text-foreground text-lg font-black">تفاصيل الطلب</h2>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="bg-secondary hover:bg-muted flex h-8 w-8 items-center justify-center rounded-full transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-5 pt-4 pb-8">
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

          {request?.description && (
            <p className="text-muted-foreground px-1 text-sm leading-relaxed">
              {request.description}
            </p>
          )}

          <div className="flex flex-col gap-2">
            {preferredTime && (
              <div className="bg-secondary/30 flex items-center gap-3 rounded-2xl px-4 py-3">
                <div className="bg-primary/10 rounded-xl p-2">
                  <Calendar className="text-primary h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-muted-foreground mb-0.5 text-[10px] font-bold tracking-wide uppercase">
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
                  <span
                    className="text-foreground text-sm font-semibold"
                    dir="ltr"
                  >
                    {request.serviceRequestLocation.address ??
                      `${request.serviceRequestLocation.latitude.toFixed(3)}, ${request.serviceRequestLocation.longitude.toFixed(3)}`}
                  </span>
                </div>
              </div>
            )}
          </div>

          {request?.finalPrice && (
            <div className="from-primary/10 to-primary/5 flex items-center justify-between rounded-2xl bg-linear-to-l px-5 py-4">
              <span className="text-muted-foreground text-sm font-bold">
                السعر المتفق عليه
              </span>
              <span className="text-primary text-2xl font-black">
                {Number(request.finalPrice).toLocaleString('ar-EG')}
                <span className="text-primary/70 mr-1 text-sm font-bold">
                  جنيه
                </span>
              </span>
            </div>
          )}

          {images.length === 1 && (
            <div
              className="h-48 cursor-pointer overflow-hidden rounded-2xl"
              onClick={() => setLightbox(images[0])}
            >
              <img
                src={images[0]}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
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
                  <img
                    src={src}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
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
                    <img
                      src={src}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
              <div
                className="cursor-pointer overflow-hidden rounded-2xl"
                onClick={() => setLightbox(images[2])}
              >
                <img
                  src={images[2]}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          )}

          <div className="flex-1" />

          <Button
            variant="gradient"
            className="h-12 w-full rounded-2xl text-base font-black"
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
          className="bg-primary text-primary-foreground absolute bottom-6 left-1/2 z-[1000] flex -translate-x-1/2 items-center gap-2 rounded-full px-6 py-3 font-bold shadow-xl transition-all hover:scale-105 active:scale-95 md:hidden"
        >
          <Menu className="h-5 w-5" />
          عرض التفاصيل
        </button>
      )}

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

      {/* Completion overlay — shown when client marks service as done */}
      {isCompleted && fullRequest && (
        <CompletionOverlay request={fullRequest} />
      )}
    </div>
  );
};

export default OrderTrackPage;
