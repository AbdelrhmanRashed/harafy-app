
import { useEffect, useState } from "react";
import { Zap, ChevronDown, Send, LocateFixed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CATEGORIES, SERVICES } from "../pages/instant/constants";


interface RequestFormProps {
  onSend?: (data: { service: string; description: string }) => void;
  address: string;
  locating: boolean;
  onDetect: () => void;
  onAddressSearch: (query: string) => void;
}

export default function RequestForm({ onSend, address, locating, onDetect, onAddressSearch }: RequestFormProps) {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [service, setService] = useState("");
  const [description, setDescription] = useState("");
  const [sent, setSent] = useState(false);
  const [manualAddress, setManualAddress] = useState(address);
  useEffect(() => {
    setManualAddress(address);
  }, [address]);
  function handleSend() {
    if (!service || service === SERVICES[0] || !description) return;
    onSend?.({ service, description });
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <div className="border-b border-border">
      {/* Header + categories */}
      <div className="px-5 pt-6 ">
        <h1 className="text-3xl font-black text-foreground mb-2 ">طلب فوري</h1>
        <p className="font-medium text-muted-foreground">
          احصل على عروض من أفضل الحرفيين القريبين منك        </p>

        {/* Category chips */}
        <div className="flex gap-2 mt-6 flex-wrap">
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
        </div>
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") onAddressSearch(manualAddress);
                }}
                placeholder="العنوان الحالي أو تلقائي"
                className="w-full h-12 pr-3 pl-4 text-sm rounded-full border-none bg-muted focus:ring-2 focus:ring-primary/20 outline-none placeholder:text-muted-foreground/90"
              />

              {/* زرار الـ detection */}
              <button
                type="button"
                onClick={onDetect}
                disabled={locating}
                className="shrink-0 h-12 w-12 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors disabled:opacity-50"
                title="تحديد موقعي تلقائياً"
              >
                {locating ? (
                  <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  <LocateFixed className="h-5 w-5 text-primary" />
                )}
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
