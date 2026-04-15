// components/Offer.tsx
import { useState, type Key } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Request } from "../../types/request";

interface OfferProps {
  open: boolean;
  onClose: () => void;
  request: Request;
}

const Offer = ({ open, onClose, request }: OfferProps) => {
  const [price, setPrice] = useState("0.00");
  const [selectedTime, setSelectedTime] = useState("1h");
  const [details, setDetails] = useState("");

  const handleSend = () => {
    console.log({
      requestId: request.id,
      price,
      selectedTime,
      details,
    });

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-160 w-full rounded-2xl p-0 overflow-hidden border-0 shadow-2xl bg-white"
      >
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-center px-6 pt-5 pb-3">
          <DialogTitle className="text-md text-primary font-bold">
            تقديم عرض
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-5 space-y-5">

          <div className="text-right space-y-1">
            <p className="font-bold text-sm">{request.user.name}</p>

            <p className="text-xs text-muted-foreground">
              {request.description}
            </p>
          </div>

          {/* Images */}
          <div className="flex gap-2 ">
            {request.images?.length ? (
              request.images.map((img: string | undefined, i: Key | null | undefined) => (
                <img
                  key={i}
                  src={img}
                  className="w-20 h-[70px] rounded-xl object-cover"
                />
              ))
            ) : (
              <div className=" rounded-xl flex items-center justify-center text-xs">
              </div>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="text-xs font-semibold block text-right mb-1">
              السعر
            </label>

            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border rounded-xl p-3 text-right"
            />
          </div>

          {/* Time */}
          <div>
            <label className="text-xs font-semibold block text-right mb-2">
              وقت التنفيذ
            </label>

            <div className="flex gap-2 justify-end">
              {["30min", "1h", "2h+"].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={cn(
                    "px-4 py-2 rounded-xl border text-sm",
                    selectedTime === t
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-background"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <Textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="اشرح للعميل كيف ستنفذ المهمة، وما هي الضمانات التي تقدمها..."
            className="h-"
          />

          {/* Submit */}
          <Button
            onClick={handleSend}
            variant="gradient"
            className="w-full "
          >
            <Send className="w-4 h-4 ml-2" />
            إرسال العرض
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Offer;