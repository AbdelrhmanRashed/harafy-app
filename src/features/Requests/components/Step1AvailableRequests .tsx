import { Loader2, ClipboardList, MapPin, Zap, RefreshCw } from 'lucide-react';
import { useGetAvailableRequests } from '../hooks/useGetAvailableRequests';
import { useGetServices } from '../hooks/useGetServices';
import type { AvailableRequestItem } from '../types/providerOfferTypes';
import { cn } from '@/lib/utils';

type Step1AvailableRequestsProps = {
  onSelectRequest: (request: AvailableRequestItem) => void;
  selectedRequestId?: number | null;
};

export default function Step1AvailableRequests({
  onSelectRequest,
  selectedRequestId,
}: Step1AvailableRequestsProps) {
  // const { data: services } = useGetServices();

  const {
    data: raw,
    isFetching,
    refetch,
  } = useGetAvailableRequests({
    refetchInterval: 15000,
  });

  const requests: AvailableRequestItem[] = Array.isArray(raw) ? raw : [];

  return (
    <div
      className="relative flex h-full flex-col gap-6 px-4 py-4 pb-8 sm:px-5"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-xl font-black">الطلبات المتاحة</h2>
        <button
          onClick={() => refetch()}
          className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl p-1.5 transition-colors"
          disabled={isFetching}
        >
          <RefreshCw
            className={cn('h-4 w-4', isFetching && 'text-primary animate-spin')}
          />
        </button>
      </div>

      {/* Info bar */}
      <div className="bg-primary/5 flex items-center gap-4 rounded-2xl px-5 py-4">
        <RefreshCw className="text-primary h-5 w-5 shrink-0" />
        <p className="text-muted-foreground text-xs leading-relaxed font-semibold">
          يتم التحديث تلقائياً كل 15 ثانية. اضغط على طلب لتقديم عرضك.
        </p>
      </div>

      {/* Content */}
      {isFetching && requests.length === 0 ? (
        <div className="text-muted-foreground flex flex-1 flex-col items-center justify-center gap-2 py-12 text-sm font-bold">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
          جاري تحميل الطلبات...
        </div>
      ) : requests.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center py-6 text-center">
          <div className="relative mb-8">
            <div className="bg-primary/5 outline-primary/5 flex h-32 w-32 items-center justify-center rounded-full outline outline-12">
              <ClipboardList className="text-primary/40 h-14 w-14" />
            </div>
            <div className="bg-primary/10 border-background absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full border-[3px] shadow-sm">
              <Zap className="text-primary h-3 w-3 fill-current" />
            </div>
          </div>
          <h3 className="text-foreground text-xl font-black">
            لا توجد طلبات متاحة
          </h3>
          <p className="text-muted-foreground mt-3 max-w-[280px] text-[13px] leading-relaxed">
            لا توجد طلبات في منطقتك حالياً. سنعلمك فور وصول طلب جديد.
          </p>
        </div>
      ) : (
        <ul className="-mr-1 flex flex-1 flex-col gap-3 overflow-y-auto pr-1">
          {requests.map((req) => (
            <RequestCard
              key={req.id}
              request={req}
              isSelected={selectedRequestId === req.id}
              onSelect={() => onSelectRequest(req)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function RequestCard({
  request,
  isSelected,
  onSelect,
}: {
  request: AvailableRequestItem;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const createdAt = request.createdAt
    ? new Date(request.createdAt).toLocaleTimeString('ar-EG', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;
  const { data: services } = useGetServices();
  const serviceName =
    services?.find((s) => s.id === request.serviceId)?.name ?? '';
  const images = request.imageUrls ?? [];
  return (
    <li>
      <button
        onClick={onSelect}
        className={cn(
          'w-full overflow-hidden rounded-2xl border-2 text-right transition-all',
          isSelected
            ? 'border-primary bg-primary/5 shadow-primary/10 shadow-sm'
            : 'border-border bg-card hover:border-primary/40 hover:bg-primary/[0.02]',
        )}
      >
        <div className="space-y-3 p-4">
          {/* Client row */}
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 border-border flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border">
              {request.clientPictureUrl ? (
                <img
                  src={request.clientPictureUrl}
                  alt={request.clientName ?? ''}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-primary text-sm font-black">
                  {request.clientName?.charAt(0) ?? ''}
                </span>
              )}
            </div>
            <div className="flex min-w-0 flex-1 items-center justify-between">
              <p className="text-foreground truncate text-sm font-extrabold">
                {request.clientName ?? ''}
              </p>
              {createdAt && (
                <span className="text-muted-foreground mr-2 shrink-0 text-[11px]">
                  {createdAt}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="min-w-0 flex-1 space-y-1">
              <p className="text-primary truncate text-sm font-bold">
                {serviceName}
              </p>
              <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">
                {request.description || 'لا يوجد وصف'}
              </p>
              {request.serviceRequestLocation && (
                <span className="text-muted-foreground flex items-center gap-1 pt-1 text-[11px]">
                  <MapPin className="h-3 w-3 shrink-0" />
                  {request.serviceRequestLocation.latitude.toFixed(3)},{' '}
                  {request.serviceRequestLocation.longitude.toFixed(3)}
                </span>
              )}
            </div>
          </div>

          {/* Images */}
          {images.length > 0 && (
            <div className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1">
              {images.map((url, i) => (
                <div
                  key={i}
                  className="border-border h-24 w-24 shrink-0 overflow-hidden rounded-xl border"
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
        </div>
      </button>
    </li>
  );
}
