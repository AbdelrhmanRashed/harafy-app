import { Star, MapPin, CheckCircle2 } from 'lucide-react';
import { cn, getImageUrl } from '@/lib/utils';
import type { Provider } from '../types/types';
import {
  formatRating,
  getServicesList,
  getProviderInitials,
  getProviderImageUrl,
} from '../utils/providerUtils';

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
  const imageUrl = getProviderImageUrl(provider);
  const initials = getProviderInitials(provider);
  const rating = formatRating(provider.rating);
  const servicesList = getServicesList(provider);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'group relative flex w-full flex-row items-center gap-4 rounded-3xl p-4 transition-all duration-300',
        'text-right outline-none',
        'bg-card border-border border shadow-sm',
        'hover:border-primary/50 dark:hover:bg-accent/5 hover:shadow-md',
        selected
          ? 'border-primary ring-primary/20 bg-primary/5 shadow-md ring-2'
          : 'hover:scale-[1.01] active:scale-[0.98]',
      )}
    >
      {/* 1. الصورة */}
      <div className="relative shrink-0">
        <div
          className={cn(
            'h-16 w-16 overflow-hidden rounded-2xl border-2 transition-all duration-500 sm:h-20 sm:w-20',
            selected ? 'border-primary scale-105' : 'border-border/50',
          )}
        >
          {imageUrl ? (
            <img
              src={getImageUrl(imageUrl)}
              alt={provider.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : null}
          {!imageUrl && (
            <div className="bg-primary-gradient flex h-full w-full items-center justify-center text-xl font-bold text-white">
              {initials}
            </div>
          )}
        </div>
        {selected && (
          <div className="bg-primary dark:border-card absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white">
            <CheckCircle2 className="h-4 w-4 text-white" />
          </div>
        )}
      </div>

      {/* 2. المعلومات */}
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-foreground truncate text-base font-extrabold tracking-tight sm:text-lg">
            {provider.name}
          </h3>

          {/* التقييم المعدل ليشمل العدد */}
          <div className="flex flex-col items-end gap-1">
            <div
              className={cn(
                'flex items-center justify-center gap-1 rounded-full px-2 py-0.5 text-xs font-black',
                'bg-primary/10 text-primary dark:bg-primary/20',
              )}
            >
              <Star className="fill-primary text-primary h-3 w-3" />
              <span className="leading-none">{rating}</span>
              <span className="border-primary/30 mr-0.5 border-r pr-1.5 text-[10px] font-medium opacity-60">
                ( {provider?.reviewsCount || 0} )
              </span>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs font-medium sm:text-sm">
          {servicesList}
        </p>

        <div className="border-border/40 mt-2.5 flex items-center justify-start gap-2 border-t pt-2.5">
          <MapPin className="text-primary h-3.5 w-3.5 shrink-0" />
          <span className="text-muted-foreground truncate text-[11px] font-bold sm:text-xs">
            {provider.baseLocation?.addressText || 'موقع غير محدد'}
          </span>
        </div>
      </div>

      {selected && (
        <div className="bg-primary absolute top-1/4 right-0 h-1/2 w-1 rounded-l-full" />
      )}
    </button>
  );
}
