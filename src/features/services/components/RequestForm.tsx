import { useEffect, useRef, useState } from 'react';
import {
  Zap,
  ChevronDown,
  Send,
  LocateFixed,
  SplinePointer,
  CameraIcon,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CATEGORIES, SERVICES } from '../types/constants';

interface RequestFormProps {
  onSend?: (data: {
    service: string;
    description: string;
    images: File[];
  }) => void;
  address: string;
  locating: boolean;
  onDetect: () => void;
  onAddressSearch: (query: string) => void;
  initialService?: string;
  initialCategory?: string;
}

export default function RequestForm({
  onSend,
  address,
  locating,
  onDetect,
  onAddressSearch,
  initialService,
  initialCategory,
}: RequestFormProps) {
  const [service, setService] = useState(initialService || '');
  const [description, setDescription] = useState('');
  const [sent, setSent] = useState(false);
  const [manualAddress, setManualAddress] = useState(address);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    setManualAddress(address);
  }, [address]);

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setImages((prev) => [...prev, ...files].slice(0, 5));
  }

  function handleSend() {
    if (!service || service === SERVICES[0] || !description) return;
    onSend?.({ service, description, images });
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAddressSearch(manualAddress);
    }
  };

  return (
    <div className="border-border border-b">
      {/* Header + categories */}
      <div className="px-4 pt-4 sm:px-5 sm:pt-6">
        <h1 className="text-foreground mb-1 text-2xl font-black sm:mb-2 sm:text-3xl">
          طلب فوري
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm">
          احصل على عروض من أفضل الحرفيين القريبين منك
        </p>
      </div>

      {/* Form */}
      <div className="bg-background mx-2 mt-3 mb-4 space-y-3 rounded-2xl px-4 py-3 sm:mx-3 sm:mt-4 sm:mb-6 sm:rounded-3xl sm:px-5 sm:py-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="bg-muted flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10">
            <Zap className="text-primary h-4 w-4 sm:h-5 sm:w-4" />
          </div>
          <span className="text-foreground text-base font-bold sm:text-lg">
            تفاصيل الطلب السريع
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {/* Service select */}
          <div>
            <label className="text-muted-foreground mb-2 block text-xs font-semibold sm:text-sm">
              نوع الخدمة
            </label>
            <div className="relative">
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="bg-muted focus:ring-primary/20 h-11 w-full appearance-none rounded-2xl pr-3 pl-8 text-right text-sm focus:ring-2 focus:outline-none sm:h-12 sm:rounded-3xl"
              >
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2" />
            </div>
          </div>

          {/* Address input */}
          <div className="flex-1">
            <label className="text-muted-foreground mb-2 block text-xs font-semibold sm:text-sm">
              الموقع
            </label>
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={manualAddress}
                onChange={(e) => setManualAddress(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="العنوان الحالي أو تلقائي"
                className="bg-muted focus:ring-primary/20 placeholder:text-muted-foreground/90 h-11 w-full rounded-full border-none pr-3 pl-4 text-sm outline-none focus:ring-2 sm:h-12"
              />

              {/* Location detect button */}
              <button
                type="button"
                onClick={onDetect}
                disabled={locating}
                className="bg-primary/10 hover:bg-primary/20 flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors disabled:opacity-50 sm:h-12 sm:w-12"
                title="تحديد موقعي تلقائياً"
              >
                {locating ? (
                  <SplinePointer className="text-primary h-4 w-4 animate-spin sm:h-5 sm:w-5" />
                ) : (
                  <LocateFixed className="text-primary h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-muted-foreground mb-2 block text-xs font-semibold sm:text-sm">
            وصف المشكلة
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="اشرح لنا ما تحتاجه باختصار لضمان عروض دقيقة..."
            rows={3}
            className="bg-muted focus:ring-primary/20 placeholder:text-muted-foreground w-full resize-none rounded-2xl px-3 py-2 text-right text-sm focus:ring-2 focus:outline-none sm:rounded-3xl"
          />
        </div>

        {/* Image upload */}
        <div className="space-y-2">
          <label className="text-foreground block text-xs font-bold sm:text-sm">
            الصور التوضيحية (اختياري)
          </label>

          {/* Image previews */}
          {images.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="border-border relative h-14 w-14 overflow-hidden rounded-lg border sm:h-16 sm:w-16 sm:rounded-xl"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`uploaded ${i}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setImages((prev) => prev.filter((_, j) => j !== i))
                    }
                    className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-black/60 transition-colors hover:bg-black/80"
                  >
                    <X className="h-2.5 w-2.5 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="border-border/60 bg-muted/30 hover:bg-muted/50 flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed py-6 transition-colors sm:rounded-2xl sm:py-8"
          >
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl sm:h-12 sm:w-12 sm:rounded-2xl">
              <CameraIcon className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <span className="text-foreground text-xs font-bold sm:text-sm">
              رفع صور توضيحية
            </span>
            <span className="text-muted-foreground text-xs">
              PNG, JPG (حتى 5 صور)
            </span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        {/* Submit button */}
        <Button
          variant="gradient"
          className="h-10 w-full gap-2 rounded-lg text-xs font-bold sm:h-11 sm:rounded-xl sm:text-sm"
          onClick={handleSend}
          disabled={sent}
        >
          <Send className="h-4 w-4" />
          {sent ? '✓ تم إرسال الطلب!' : 'إرسال الطلب الآن'}
        </Button>
      </div>
    </div>
  );
}
