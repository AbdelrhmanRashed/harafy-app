import { useState, useRef, useEffect } from 'react';
import {
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerDescription,
  DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Star,
  Send,
  X,
  CameraIcon,
  SplinePointer,
  LocateFixed,
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { useLocation } from '../hooks/useLocation';
import { DataTimeInput } from './DataTimeInput';
import type { Provider } from '../types/types';
import { useNavigate } from 'react-router-dom';
interface DirectRequestFormProps {
  provider: Provider;
  onClose: (data?: any) => void;
}

export function DirectRequestForm({
  provider,
  onClose,
}: DirectRequestFormProps) {
  const [description, setDescription] = useState('');
  const [datetime, setDatetime] = useState<Date | undefined>(undefined);
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    position: customerPos,
    setPosition: setCustomerPos,
    address,
    locating,
    detect,
    searchAddress,
  } = useLocation();
  const [manualAddress, setManualAddress] = useState(address);
  const navigate = useNavigate();

  useEffect(() => {
    setManualAddress(address);
  }, [address]);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchAddress(manualAddress);
    }
  };
  if (!provider) return null;

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setImages((prev) => [...prev, ...files].slice(0, 5));
  }

  function handleSubmit() {
    const customerLat = customerPos?.lat ?? 0;
    const customerLng = customerPos?.lng ?? 0;

    const payload = {
      providerName: provider.name,
      profession: provider.profession,
      providerImage: provider.image,
      description,
      datetime,
      images,
      location: {
        customer: { lat: customerLat, lng: customerLng },
        provider: { lat: provider.position.lat, lng: provider.position.lng },
      },
      address: manualAddress,
    };
    console.log('payload:', payload);
    onClose(payload);
    // TODO: api call
    const requestId = { id: '12345' }; // mock request ID returned from backend
    // navigate to pending page with request data
    navigate(`/app/services/requests/${requestId.id}/pending`, {
      state: { payload: payload },
    });
  }

  return (
    <div className="bg-background flex h-full flex-col font-[Cairo,sans-serif]">
      {/* ── Header ── */}
      <DrawerHeader className="border-border bg-background flex shrink-0 items-center justify-between border-b px-5 py-4">
        <div className="flex items-center gap-3">
          <DrawerClose asChild>
            <button className="hover:bg-muted flex h-8 w-8 items-center justify-center rounded-full transition-colors">
              <X className="text-muted-foreground h-4 w-4" />
            </button>
          </DrawerClose>
          <DrawerTitle className="text-foreground text-lg font-bold">
            طلب خدمة جديد
          </DrawerTitle>
        </div>

        <span className="text-primary bg-primary/10 rounded-full px-3 py-1 text-xs font-semibold">
          مباشر
        </span>
      </DrawerHeader>
      <DrawerDescription className="text-muted-foreground mt-1 px-5 pt-2 text-sm">
        أدخل تفاصيل طلبك لإرساله إلى الفني المختص.
      </DrawerDescription>
      {/* ── Body ── */}
      <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
        {/* Provider card */}
        <Card className="border-border/40 rounded-3xl shadow-sm">
          <CardContent className="flex items-center gap-4">
            {/* Avatar */}
            <div className="bg-primary/5 flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl">
              {provider.image ? (
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-primary text-2xl font-bold">
                  {provider.name.charAt(0)}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 space-y-1 text-right">
              <h4 className="text-foreground text-lg font-extrabold">
                {provider.name}
              </h4>
              <p className="text-muted-foreground text-sm">
                {provider.profession}
              </p>
              <div className="flex items-center justify-start gap-1.5">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-foreground text-sm font-bold">
                  {provider.rating}
                </span>
                <span className="text-muted-foreground text-xs">
                  (124 تقييم)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-foreground block text-sm font-bold">
            تفاصيل الطلب
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="اشرح تفاصيل الخدمة التي تحتاجها..."
            rows={4}
            className="bg-muted/50 border-border/30 focus:ring-primary/20 placeholder:text-muted-foreground w-full resize-none rounded-2xl border px-4 py-3 text-right text-sm focus:ring-2 focus:outline-none"
          />
        </div>

        {/* Date/Time */}
        {/* <DataTimeInput date={datetime} setDate={setDatetime} /> */}

        {/* Location */}
        <div className="space-y-2">
          <label className="text-foreground block text-sm font-bold">
            موقع العمل
          </label>
          <div className="relative flex items-center gap-2">
            <input
              type="text"
              value={manualAddress}
              onChange={(e) => setManualAddress(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="العنوان الحالي أو تلقائي"
              className="bg-muted focus:ring-primary/20 placeholder:text-muted-foreground/90 h-12 w-full rounded-full border-none pr-3 pl-4 text-sm outline-none focus:ring-2"
            />

            {/*button detect */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                detect();
              }}
              disabled={locating}
              className="bg-primary/10 hover:bg-primary/20 flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors disabled:opacity-50"
              title="تحديد موقعي تلقائياً"
            >
              {locating ? (
                <SplinePointer className="text-primary h-5 w-5" />
              ) : (
                <LocateFixed className="text-primary h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mini map */}
          {/* <div className="relative rounded-2xl overflow-hidden h-36 border border-border/30">
            <MapContainer
              center={[30.0444, 31.2357]}
              zoom={13}
              className="w-full h-full"
              zoomControl={false}
              dragging={false}
              scrollWheelZoom={false}
              doubleClickZoom={false}
              attributionControl={false}
            >
              <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
            </MapContainer>

          </div> */}
        </div>

        {/* Image upload */}
        <div className="space-y-2">
          <label className="text-foreground block text-sm font-bold">
            الصور التوضيحية
          </label>

          {images.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="border-border relative h-16 w-16 overflow-hidden rounded-xl border"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <button
                    onClick={() =>
                      setImages((prev) => prev.filter((_, j) => j !== i))
                    }
                    className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-black/60"
                  >
                    <X className="h-2.5 w-2.5 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="border-border/60 bg-muted/30 hover:bg-muted/50 flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed py-8 transition-colors"
          >
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-2xl">
              <CameraIcon className="text-primary h-6 w-6" />
            </div>
            <span className="text-foreground text-sm font-bold">
              رفع صور توضيحية
            </span>
            <span className="text-muted-foreground text-xs">
              يمكنك رفع حتى 5 صور (PNG, JPG)
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
      </div>

      {/* ── Footer ── */}
      <DrawerFooter className="border-border shrink-0 space-y-3 border-t px-5 py-4">
        <Button
          variant="gradient"
          className="h-14 w-full gap-2 rounded-2xl text-base font-bold"
          onClick={handleSubmit}
        >
          <Send className="h-4 w-4 rotate-180" />
          إرسال الطلب
        </Button>
        <p className="text-muted-foreground text-center text-xs">
          بإرسال هذا الطلب، فإنك توافق على{' '}
          <a href="#" className="text-primary hover:underline">
            شروط الخدمة
          </a>{' '}
          و{' '}
          <a href="#" className="text-primary hover:underline">
            سياسة الخصوصية
          </a>{' '}
          الخاصة بالمنصة.
        </p>
      </DrawerFooter>
    </div>
  );
}
