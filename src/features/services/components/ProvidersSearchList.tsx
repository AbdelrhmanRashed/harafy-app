import { SearchX, Users } from 'lucide-react';
import ServiceSearchCard from './ServiceSearchCard';
import type { Provider } from '@/features/services/types/types';
import { cn } from '@/lib/utils';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

interface ProvidersSearchListProps {
  providers: Provider[];
  isLoading: boolean;
  onServiceRequest: (provider: Provider) => void;
  onViewProfile: (provider: Provider) => void;
  searchQuery?: string;
}

export default function ProvidersSearchList({
  providers,
  isLoading,
  onServiceRequest,
  onViewProfile,
  searchQuery,
}: ProvidersSearchListProps) {
  console.log(providers);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <div className="relative flex items-center justify-center">
          <LoadingSpinner />
          <div className="bg-primary/10 absolute h-20 w-20 animate-ping rounded-full" />
        </div>
        <p className="text-muted-foreground animate-pulse font-black">
          جاري البحث عن الحرفيين...
        </p>
      </div>
    );
  }

  // 2. حالة عدم وجود نتائج (Empty State)
  if (providers.length === 0) {
    return (
      <div className="border-border/60 bg-card/40 flex flex-col items-center justify-center rounded-[3.5rem] border-2 border-dashed py-24 text-center">
        <div className="bg-secondary mb-6 flex h-24 w-24 items-center justify-center rounded-full shadow-inner">
          <SearchX className="text-muted-foreground/40 h-12 w-12" />
        </div>
        <h3 className="text-foreground text-2xl font-black">
          لم نجد نتائج مطابقة!
        </h3>
        <p className="text-muted-foreground mt-3 max-w-sm leading-relaxed font-bold">
          {searchQuery
            ? `عذراً، لم نجد فنيين متاحين حالياً لـ "${searchQuery}". جرب تغيير كلمات البحث أو القسم.`
            : 'لم نجد فنيين متاحين في منطقتك حالياً. جرب اختيار قسم آخر.'}
        </p>
      </div>
    );
  }

  // 3. عرض القائمة (Results List)
  return (
    <div className="space-y-8">
      {/* Header بسيط لعدد النتائج */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-2xl">
            <Users className="text-primary h-5 w-5" />
          </div>
          <div>
            <h2 className="text-foreground text-lg font-black tracking-tight">
              الحرفيين المتاحين
            </h2>
            <p className="text-muted-foreground text-xs font-bold">
              وجدنا {providers.length} حرفي متاح لخدمتك
            </p>
          </div>
        </div>
      </div>

      {/* Grid القائمة */}
      <div
        className={cn(
          'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3',
          'transition-all duration-500 ease-in-out',
        )}
      >
        {providers.map((provider) => (
          <ServiceSearchCard
            key={provider.id}
            provider={provider}
            onServiceRequest={onServiceRequest}
            onViewProfile={onViewProfile}
          />
        ))}
      </div>
    </div>
  );
}
