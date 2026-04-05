import { Star, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Provider } from "../pages/instant/types";

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
        "w-full text-right px-4 py-3 rounded-2xl bg-background  transition-all duration-200 flex items-center gap-4 relative",
        selected
          ? "border-primary border  shadow-sm"
          : "   hover:shadow-sm"
      )}
    >
      {/* Avatar */}
      <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0">
        {provider.image ? (
          <img src={provider.image} alt={provider.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-bold text-xl">
            {provider.avatar}
          </div>
        )}
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0 space-y-0.5">
        {/* Rating */}
        <div className="flex items-center justify-end gap-1 absolute top-2 left-2 text-primary px-2 py-0.5 rounded-full bg-primary/10">
                    <Star className="h-3.5 w-3.5  " />
          <span className="text-sm font-bold">{provider.rating.toFixed(1)}</span>
        </div>

        {/* Name */}
        <p className="text-base font-extrabold text-foreground truncate">{provider.name}</p>

        {/* Profession */}
        <p className="text-xs text-muted-foreground truncate">{provider.profession}</p>

        {/* Distance + Status */}
        <div className="flex items-center justify-start gap-3 pt-1">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs">{provider.distance} كم</span>
            <MapPin className="h-3 w-3" />
          </div>
          <div className="flex items-center gap-1">
            <span className={cn(
              "text-xs font-semibold",
              isAvailable ? "text-green-600" : "text-amber-500"
            )}>
              {provider.status}
            </span>
            <div className={cn(
              "w-2 h-2 rounded-full",
              isAvailable ? "bg-green-500" : "bg-amber-400"
            )} />
          </div>
        </div>
      </div>

      
    </button>
  );
}