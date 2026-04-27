import { useState } from 'react';
import {
  ArrowRight,
  Loader2,
  MapPin,
  SendHorizonal,
  Zap,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCreateOffer } from '../hooks/useCreateOffer';
import type {
  AvailableRequestItem,
  SubmittedOffer,
} from '../types/providerOfferTypes';
import { useGetServices } from '../hooks/useGetServices';

type Step2CreateOfferProps = {
  request: AvailableRequestItem;
  onBack: () => void;
  onOfferCreated: (offer: SubmittedOffer) => void;
};

export default function Step2CreateOffer({
  request,
  onBack,
  onOfferCreated,
}: Step2CreateOfferProps) {
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  const { mutate: create, isPending } = useCreateOffer();

  const handleSubmit = () => {
    const numPrice = Number(price);
    if (!numPrice || numPrice <= 0) return;
    create(
      {
        serviceRequestId: request.id,
        price: numPrice,
        message: message.trim() || undefined,
      },
      {
        onSuccess: (data) => {
          onOfferCreated({
            offerId: data?.id ?? data?.offerId ?? 0,
            serviceRequestId: request.id,
            price: numPrice,
            message: message.trim() || undefined,
          });
        },
      },
    );
  };
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
  const [lightbox, setLightbox] = useState<string | null>(null);
  return (
    <div
      className="flex h-full flex-col gap-5 px-4 py-4 pb-8 sm:px-5"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="hover:bg-muted text-muted-foreground hover:text-foreground rounded-xl p-2 transition-colors"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
        <h2 className="text-foreground text-xl font-black">تقديم عرض</h2>
      </div>

      {/* Request summary card — same style as RequestCard */}
      <div className="border-border bg-card overflow-hidden rounded-2xl border-2">
        <div className="space-y-3 p-4">
          {/* Client row */}
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 border-border flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border">
              {request.clientPictureUrl ? (
                <img
                  src={request.clientPictureUrl}
                  alt={request.clientName ?? 'عميل'}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-primary text-sm font-black">
                  {request.clientName?.charAt(0) ?? 'ع'}
                </span>
              )}
            </div>
            <div className="flex min-w-0 flex-1 items-center justify-between">
              <p className="text-foreground truncate text-sm font-extrabold">
                {request.clientName ?? 'عميل'}
              </p>
              <div className="flex shrink-0 items-center gap-2">
                {createdAt && (
                  <span className="text-muted-foreground text-[11px]">
                    {createdAt}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Service + description */}
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
              <Zap className="text-primary h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <p className="text-primary truncate text-sm font-bold">
                {serviceName}
              </p>
              {request.description && (
                <p className="text-muted-foreground line-clamp-3 text-xs leading-relaxed">
                  {request.description}
                </p>
              )}
              {request.serviceRequestLocation && (
                <span className="text-muted-foreground flex items-center gap-1 pt-0.5 text-[11px]">
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
                  className="border-border h-30 w-30 shrink-0 overflow-hidden rounded-xl border"
                >
                  <img
                    src={url}
                    alt={`صورة ${i + 1}`}
                    className="h-full w-full object-cover"
                    onClick={() => setLightbox(url)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-1 flex-col gap-4">
        {/* Price */}
        <div className="flex flex-col gap-2">
          <label className="text-foreground text-sm font-bold">
            السعر المقترح (جنيه) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min={1}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              className="border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:border-primary w-full rounded-2xl border-2 px-4 py-3 text-base font-bold transition-colors focus:outline-none"
            />
            <span className="text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2 text-sm font-bold">
              ج.م
            </span>
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label className="text-foreground text-sm font-bold">
            رسالة للعميل{' '}
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="اكتب رسالة توضيحية للعميل عن خدمتك..."
            rows={4}
            className="border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:border-primary w-full resize-none rounded-2xl border-2 px-4 py-3 text-sm leading-relaxed transition-colors focus:outline-none"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="mt-auto pt-2">
        <Button
          onClick={handleSubmit}
          disabled={isPending || !price || Number(price) <= 0}
          className="h-14 w-full gap-2 rounded-2xl text-base font-bold"
          variant="gradient"
        >
          {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <SendHorizonal className="h-5 w-5" />
          )}
          {isPending ? 'جاري الإرسال...' : 'إرسال العرض'}
        </Button>
        <p className="text-muted-foreground mt-2 px-2 text-center text-[11px] leading-relaxed">
          سيصل عرضك للعميل فوراً وسيتمكن من قبوله أو رفضه.
        </p>
      </div>
      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            onClick={() => setLightbox(null)}
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={lightbox}
            alt="صورة مكبرة"
            className="max-h-[80vh] max-w-[90vw] rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
