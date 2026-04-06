import { Star, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Provider } from "../types/types";

interface ProviderCardProps {
  provider: Provider;
  selected: boolean;
  onSelect: () => void;
}

export default function ProviderCard({ provider, selected, onSelect }: ProviderCardProps) {
  const isAvailable = provider.status === "متاح الآن";
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full text-right p-5 rounded-[32px] bg-white transition-all duration-300 flex items-center gap-5 relative group",
        selected
          ? "border-primary border-2 shadow-md"
          : "border border-transparent hover:border-primary/20 shadow-sm hover:shadow-md"
      )}
    >
      {/* 1. Rating Badge (Top Left) - بستايل الألوان اللي في الصور */}
      <div className="absolute top-4 left-4 bg-[#F0F0FF] text-primary px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold">
        <Star className="h-3.5 w-3.5 fill-current" />
        <span className="leading-none">{provider.rating.toFixed(1)}</span>
      </div>

      {/* 2. Avatar Section - تكبير الحجم وتعديل الدوران */}
      <div className="relative shrink-0">
        <div className="w-20 h-20 rounded-[24px] overflow-hidden bg-slate-900 border border-border/50">
          {provider.image ? (
            <img src={provider.image} alt={provider.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center text-white font-bold text-2xl">
              {provider.avatar}
            </div>
          )}
        </div>
        {/* Status Dot */}
        <div className={cn(
          "absolute -bottom-1 -left-1 w-5 h-5 border-4 border-white rounded-full transition-colors",
          isAvailable ? "bg-green-500" : "bg-orange-500"
        )} />
      </div>

      {/* 3. Info Section - تحسين توزيع المسافات */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        {/* Name & Profession */}
        <h3 className="text-xl font-extrabold text-[#1A1A1A] truncate mb-0.5">
          {provider.name}
        </h3>
        <p className="text-muted-foreground text-sm font-medium truncate">
          {provider.profession} {provider.experience && `· ${provider.experience}`}
        </p>

        {/* Bottom Details (Distance + Status) */}
        <div className="flex items-center justify-start gap-4 mt-3 pt-3 border-t border-gray-50">
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-bold">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{provider.distance} كم</span>
          </div>

          <div className={cn(
            "flex items-center gap-1.5 text-xs font-bold",
            isAvailable ? "text-green-600" : "text-orange-600"
          )}>
            <Clock className="h-4 w-4" />
            <span>{provider.status}</span>
          </div>
        </div>
      </div>
    </button>
  );
}