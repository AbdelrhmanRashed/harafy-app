import { MapPin } from 'lucide-react';
import ProviderCard from './ProviderCard';
import type { Provider } from '../types/types';
import { cn } from '@/lib/utils';

interface ProvidersListProps {
  providers: Provider[];
  selectedId: number | null;
  onSelect: (provider: Provider) => void;
  isLoading: boolean;
}

export default function ProvidersList({
  providers,
  selectedId,
  onSelect,
  isLoading,
}: ProvidersListProps) {
  return (
    <div className="flex-1 px-5 py-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
            <MapPin className="text-primary h-4 w-4" />
          </div>
          <span className="text-foreground text-lg font-black tracking-tight">
            حرفيون متاحون الآن
          </span>
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
        </div>
        <span className="text-muted-foreground bg-secondary rounded-full px-3 py-1 text-xs font-bold">
          {providers.length} مزود قريب
        </span>
      </div>

      {/* List Container */}
      <div
        className={cn(
          'grid grid-cols-1 gap-4 transition-all duration-500',
          isLoading
            ? 'pointer-events-none opacity-40 blur-[2px]'
            : 'opacity-100',
        )}
      >
        {providers.map((provider) => (
          <ProviderCard
            key={provider.id}
            provider={provider}
            selected={selectedId === provider.id}
            onSelect={() => onSelect(provider)}
          />
        ))}

        {/* Empty State - إذا لم يوجد مزودين */}
        {!isLoading && providers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="bg-muted mb-3 flex h-12 w-12 items-center justify-center rounded-full">
              <MapPin className="text-muted-foreground h-6 w-6" />
            </div>
            <p className="text-muted-foreground text-sm font-medium">
              لا يوجد حرفيون متاحون في منطقتك حالياً
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
