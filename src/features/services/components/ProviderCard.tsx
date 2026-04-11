import { Star, MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Provider } from '../types/types';

interface ProviderCardProps {
  provider: Provider;
  selected: boolean;
  onSelect: () => void;
}

export default function ProviderCard({
  provider,
  selected,
  onSelect,
}: ProviderCardProps) {

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'group bg-card relative flex w-full items-center gap-3 rounded-2xl p-4 text-right transition-all duration-300 sm:gap-5 sm:rounded-3xl sm:p-5',
        selected
          ? 'border-primary border-2 shadow-md'
          : 'hover:border-primary/20 border border-transparent shadow-sm hover:shadow-md',
      )}
    >
      {/* Rating badge */}
      <div className="text-primary absolute top-2 left-2 flex items-center gap-1 rounded-full bg-[#F0F0FF] px-2 py-0.5 text-xs font-bold sm:top-4 sm:left-4 sm:px-3 sm:py-1 sm:text-sm">
        <Star className="h-3 w-3 fill-current sm:h-3.5 sm:w-3.5" />
        <span className="leading-none">{provider.rating?.toFixed(1)}</span>
      </div>

      {/* Avatar/Image */}
      <div className="relative shrink-0">
        <div className="border-border/50 h-16 w-16 overflow-hidden rounded-xl border bg-slate-900 sm:h-20 sm:w-20 sm:rounded-[24px]">
          {provider.pictureUrl ? (
            <img
              src={provider.pictureUrl}
              alt={provider.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 text-lg font-bold text-white sm:text-2xl">
              {provider.nickname}
            </div>
          )}
        </div>
        {/* Status Dot */}
        {/* <div
          className={cn(
            'absolute -bottom-1 -left-1 h-4 w-4 rounded-full border-4 border-white transition-colors sm:h-5 sm:w-5',
               ? 'bg-green-500' : 'bg-orange-500',
          )}
        />
      </div> */}

      {/* Info section */}
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        {/* Name & Profession */}
        <h3 className="mb-0.5 truncate text-base font-extrabold text-[#1A1A1A] sm:text-lg">
          {provider.name}
        </h3>
        <p className="text-muted-foreground truncate text-xs font-medium sm:text-sm">
          {provider.services.map((service) => service.name).join(', ')}{' '}
        </p>

        {/* Bottom Details (Distance + Status) */}
        <div className="mt-2 flex items-center justify-start gap-2 border-t border-gray-50 pt-2 sm:mt-3 sm:gap-4 sm:pt-3">
          <div className="text-muted-foreground flex items-center gap-1 text-xs font-bold">
            <MapPin className="text-primary h-3 w-3 sm:h-4 sm:w-4" />
            <span>{provider.baseLocation.addressText}</span>
          </div>

          
        </div>
      </div>
      </div>
      
    </button>
  );
}
