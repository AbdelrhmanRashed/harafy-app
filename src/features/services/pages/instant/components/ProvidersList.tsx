import { MapPin } from "lucide-react";
import ProviderCard from "./ProviderCard";
import type { Provider } from "../types/types";

interface ProvidersListProps {
  providers: Provider[];
  selectedId: number | null;
  onSelect: (provider: Provider) => void;
}

export default function ProvidersList({ providers, selectedId, onSelect }: ProvidersListProps) {
  return (
    <div className="px-5 py-4 flex-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-4 text-[#842CD3]" />
          <span className="text-lg font-bold text-foreground">محترفون متاحون الآن</span>
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        </div>
        <span className="text-sm font-bold text-primary">{providers.length} مزود قريب</span>

      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-3">
        {providers.map((provider) => (
          <ProviderCard
            key={provider.id}
            provider={provider}
            selected={selectedId === provider.id}
            onSelect={() => onSelect(provider)}
          />
        ))}
      </div>
    </div>
  );
}
