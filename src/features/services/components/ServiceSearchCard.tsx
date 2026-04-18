import {
  Star,
  MapPin,
  ShieldCheck,
  ArrowLeft,
  Heart,
  Briefcase,
} from 'lucide-react';
import { cn, getImageUrl } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { Provider } from '@/features/services/types/types';
import { useServices } from '@/features/onboarding/hooks/useServices';

interface ServiceSearchCardProps {
  provider: Provider;
  onServiceRequest: (provider: Provider) => void;
  onViewProfile: (provider: Provider) => void;
}

const getProfessionName = (professionId: number) => {
  const { data: services } = useServices();
  return services?.find((service: any) => service.id === professionId)?.name;
};

const AvatarContent = ({ provider }: { provider: Provider }) => {
  if (provider.avatar) {
    return (
      <img
        src={getImageUrl(provider.avatar)}
        alt={provider.name}
        className="h-full w-full rounded-3xl object-cover"
      />
    );
  }
  return <span>{(provider.nickname || provider.name)?.charAt(0)}</span>;
};

export default function ServiceSearchCard({
  provider,
  onServiceRequest,
  onViewProfile,
}: ServiceSearchCardProps) {
  return (
    <div className="group border-border/40 bg-card relative w-full rounded-[2.5rem] border p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-20px_rgba(79,70,229,0.15)]">
      {/* 1. Header: Avatar & Status */}
      <div className="mb-5 flex items-start justify-between">
        <div className="relative">
          <div className="bg-secondary border-border/50 flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl border text-4xl shadow-inner transition-transform duration-500 group-hover:scale-110">
            <AvatarContent provider={provider} />
          </div>

          <div
            className={cn(
              'border-card absolute -right-1.5 -bottom-1.5 flex h-6 w-6 items-center justify-center rounded-full border-4',
              provider.status ? 'bg-green-500' : 'bg-orange-500',
            )}
          >
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span
            className={cn(
              'rounded-full px-4 py-1.5 text-[11px] font-black tracking-wider uppercase shadow-sm',
              provider.status
                ? 'border border-green-500/20 bg-green-500/10 text-green-600'
                : 'border border-orange-500/20 bg-orange-500/10 text-orange-600',
            )}
          >
            {provider.status ? 'متاح الآن' : 'مشغول'}
          </span>
        </div>
      </div>

      {/* 2. Body: Info */}
      <div className="space-y-3 text-right">
        <div>
          <div className="mb-1 flex items-center gap-1.5">
            <h3 className="text-foreground group-hover:text-primary text-xl font-black transition-colors">
              {provider.name}
            </h3>
            <ShieldCheck className="h-5 w-5 fill-blue-500/10 text-blue-500" />
          </div>
          <p className="text-muted-foreground text-sm font-bold">{}</p>
        </div>

        {/* Stats Row */}
        <div className="flex flex-row items-center gap-4 pt-1">
          {/* التقييم */}
          <div className="flex items-center gap-1.5 rounded-2xl bg-yellow-500/10 px-3 py-1 text-xs font-black text-yellow-700">
            <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
            {provider.rating?.toFixed(1)}
          </div>

          {/* عدد العمليات المنفذة - Jobs Count */}
          <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-bold">
            <Briefcase className="text-primary/60 h-3.5 w-3.5" />
            {provider.profession && getProfessionName(provider.profession)}
          </div>

          {/* الموقع */}
          <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-bold">
            <MapPin className="text-primary/60 h-4 w-4" />
            {provider?.distance?.toFixed(2)} كم
          </div>
        </div>
      </div>

      {/* 3. Footer: Buttons */}
      <div className="mt-8 flex gap-3">
        <Button
          onClick={() => onServiceRequest(provider)}
          className="bg-primary-gradient text-md shadow-primary-gradient h-14 flex-[1.5] cursor-pointer gap-3 rounded-[1.5rem] font-black text-white transition-all hover:scale-[1.02] active:scale-95"
        >
          اطلب الآن
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <Button
          variant="outline"
          onClick={() => onViewProfile(provider)}
          className="border-border bg-secondary/30 text-foreground hover:bg-secondary h-14 flex-1 cursor-pointer rounded-[1.5rem] font-black transition-all"
        >
          الملف
        </Button>
      </div>
    </div>
  );
}
