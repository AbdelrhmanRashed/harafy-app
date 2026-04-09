
import { useEffect, useRef, useState } from "react";
import { Zap, ChevronDown, Send, LocateFixed, SplinePointer, CameraIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CATEGORIES, SERVICES } from "../types/constants";


interface RequestFormProps {
  onSend?: (data: { service: string; description: string; images: File[] }) => void;
  address: string;
  locating: boolean;
  onDetect: () => void;
  onAddressSearch: (query: string) => void;
  initialService?: string;
  initialCategory?: string;
}

export default function RequestForm({ onSend, address, locating, onDetect, onAddressSearch ,initialService , initialCategory }: RequestFormProps) {
  // const [selectedCategory, setSelectedCategory] = useState(initialCategory||"الكل");
  const [service, setService] = useState(initialService||"");
  const [description, setDescription] = useState("");
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
    if (e.key === "Enter") {
      onAddressSearch(manualAddress);
    }
  };

  return (
    <div className="border-b border-border">
      {/* Header + categories */}
      <div className="px-5 pt-6 ">
        <h1 className="text-3xl font-black text-foreground mb-2 ">طلب فوري</h1>
        {/* <p className="font-medium text-muted-foreground">
          احصل على عروض من أفضل الحرفيين القريبين منك        </p> */}

        {/* Category chips */}
        {/* <div className="flex gap-2 mt-6 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "text-sm px-5 py-2 rounded-full font-bold transition-all",
                selectedCategory === cat
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              )}
            >
              {cat}
            </button>
          ))}
        </div> */}
      </div>

      {/* Form */}
      <div className="px-5 py-4 space-y-3 bg-background rounded-3xl mx-3 mt-4 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-muted flex justify-center items-center"><Zap className="h-5 w-4 text-primary" />
          </div>
          <span className="text-xl font-bold text-foreground">تفاصيل الطلب السريع</span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {/* Service select */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">نوع الخدمة</label>
            <div className="relative">
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full h-12 pr-3 pl-8  rounded-3xl  bg-muted appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 text-right"
              >
                {SERVICES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div className="flex-1">
            <label className="text-sm text-muted-foreground mb-2 block mr-1">الموقع</label>
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
                onClick={onDetect}
                disabled={locating}
                className="shrink-0 h-12 w-12 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors disabled:opacity-50"
                title="تحديد موقعي تلقائياً"
              >
               {locating ? <SplinePointer className="h-5 w-5 text-primary" /> : <LocateFixed className="h-5 w-5 text-primary" />}
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">وصف المشكلة</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="اشرح لنا ما تحتاجه باختصار لضمان عروض دقيقة..."
            rows={3}
            className="w-full rounded-3xl  bg-muted px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground text-right"
          />
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

        {/* Submit */}
        <Button
          variant="gradient"
          className="w-full h-11 text-sm font-bold gap-2 rounded-xl"
          onClick={handleSend}
          disabled={sent}
        >
          <Send className="h-4 w-4" />
          {sent ? "✓ تم إرسال الطلب!" : "إرسال الطلب الآن"}
        </Button>
      </div>
    </div>
  );
}
