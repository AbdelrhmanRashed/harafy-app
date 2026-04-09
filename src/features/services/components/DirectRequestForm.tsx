import { useState, useRef, useEffect } from "react";
import { DrawerHeader, DrawerTitle, DrawerFooter, DrawerDescription, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Send, X, CameraIcon, SplinePointer, LocateFixed } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { useLocation } from "../pages/instant/hooks/useLocation";
import { DataTimeInput } from "./DataTimeInput";
import type { Provider } from "../pages/instant/types/types";
import { useNavigate } from "react-router-dom";
interface DirectRequestFormProps {
  provider: Provider;
  onClose: (data?: any) => void;
}

export function DirectRequestForm({ provider, onClose }: DirectRequestFormProps) {
  const [description, setDescription] = useState("");
  const [datetime, setDatetime] = useState<Date | undefined>(undefined);
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { position: customerPos, setPosition: setCustomerPos, address, locating, detect, searchAddress } = useLocation();
  const [manualAddress, setManualAddress] = useState(address);
  const navigate = useNavigate();

  useEffect(() => {
    setManualAddress(address);
  }, [address]);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
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
        provider: { lat: provider.position.lat, lng: provider.position.lng }
      },
      address: manualAddress
    };
    console.log("payload:", payload);
    onClose(payload);
    // TODO: api call
    const requestId = { id: "12345" }; // mock request ID returned from backend
    // navigate to pending page with request data
    navigate(`/app/services/requests/${requestId.id}/pending`, { state: { payload:payload } });
  }

  return (
    <div className="flex flex-col h-full bg-background font-[Cairo,sans-serif]">

      {/* ── Header ── */}
      <DrawerHeader className="border-b border-border flex items-center justify-between px-5 py-4 bg-background shrink-0">
        <div className="flex items-center gap-3">
          <DrawerClose asChild>
            <button className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </DrawerClose>
          <DrawerTitle className="text-lg font-bold text-foreground">طلب خدمة جديد</DrawerTitle>
        </div>

        <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
          مباشر
        </span>

      </DrawerHeader>
      <DrawerDescription className="text-sm text-muted-foreground px-5 pt-2 mt-1">
        أدخل تفاصيل طلبك لإرساله إلى الفني المختص.
      </DrawerDescription>
      {/* ── Body ── */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">

        {/* Provider card */}
        <Card className="rounded-3xl border-border/40 shadow-sm">
          <CardContent className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-primary/5 shrink-0 flex items-center justify-center">
              {provider.image ? (
                <img src={provider.image} alt={provider.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-bold text-primary">{provider.name.charAt(0)}</span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-right space-y-1">
              <h4 className="text-lg font-extrabold text-foreground">{provider.name}</h4>
              <p className="text-sm text-muted-foreground">{provider.profession}</p>
              <div className="flex items-center justify-start gap-1.5">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-bold text-foreground">{provider.rating}</span>
                <span className="text-xs text-muted-foreground">(124 تقييم)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-foreground block">تفاصيل الطلب</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="اشرح تفاصيل الخدمة التي تحتاجها..."
            rows={4}
            className="w-full rounded-2xl bg-muted/50 border border-border/30 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground text-right"
          />
        </div>

        {/* Date/Time */}
        {/* <DataTimeInput date={datetime} setDate={setDatetime} /> */}

        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-foreground block">موقع العمل</label>
          <div className="relative flex items-center gap-2">
            <input
              type="text"
              value={manualAddress}
              onChange={(e) => setManualAddress(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="العنوان الحالي أو تلقائي"
              className="w-full h-12 pr-3 pl-4 text-sm rounded-full border-none bg-muted focus:ring-2 focus:ring-primary/20 outline-none placeholder:text-muted-foreground/90"
            />

            {/*button detect */}
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); detect(); }}
              disabled={locating}
              className="shrink-0 h-12 w-12 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors disabled:opacity-50"
              title="تحديد موقعي تلقائياً"
            >
              {locating ? <SplinePointer className="h-5 w-5 text-primary" /> : <LocateFixed className="h-5 w-5 text-primary" />}
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
          <label className="text-sm font-bold text-foreground block">الصور التوضيحية</label>

          {images.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-2">
              {images.map((img, i) => (
                <div key={i} className="w-16 h-16 rounded-xl overflow-hidden border border-border relative">
                  <img src={URL.createObjectURL(img)} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setImages((prev) => prev.filter((_, j) => j !== i))}
                    className="absolute top-0.5 right-0.5 w-4 h-4 bg-black/60 rounded-full flex items-center justify-center"
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
            className="w-full rounded-2xl border-2 border-dashed border-border/60 bg-muted/30 hover:bg-muted/50 transition-colors py-8 flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <CameraIcon className="h-6 w-6 text-primary" />
            </div>
            <span className="text-sm font-bold text-foreground">رفع صور توضيحية</span>
            <span className="text-xs text-muted-foreground">يمكنك رفع حتى 5 صور (PNG, JPG)</span>
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
      <DrawerFooter className="border-t border-border px-5 py-4 shrink-0 space-y-3">
        <Button
          variant="gradient"
          className="w-full h-14 rounded-2xl font-bold text-base gap-2"
          onClick={handleSubmit}
        >
          <Send className="h-4 w-4 rotate-180" />
          إرسال الطلب
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          بإرسال هذا الطلب، فإنك توافق على{" "}
          <a href="#" className="text-primary hover:underline">شروط الخدمة</a>
          {" "}و{" "}
          <a href="#" className="text-primary hover:underline">سياسة الخصوصية</a>
          {" "}الخاصة بالمنصة.
        </p>
      </DrawerFooter>
    </div>
  );
}