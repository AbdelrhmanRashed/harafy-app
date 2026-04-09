import { MapPin } from 'lucide-react';
import ProviderCard from './ProviderCard';
import type { Provider } from '../types/types';

interface ProvidersListProps {
  providers: Provider[];
  selectedId: number | null;
  onSelect: (provider: Provider) => void;
}

export default function ProvidersList({
  providers,
  selectedId,
  onSelect,
}: ProvidersListProps) {
  return (
    <div className="flex-1 px-5 py-4">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-4 text-[#842CD3]" />
          <span className="text-foreground text-lg font-bold">
            محترفون متاحون الآن
          </span>
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
        </div>
        <span className="text-primary text-sm font-bold">
          {providers.length} مزود قريب
        </span>
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
