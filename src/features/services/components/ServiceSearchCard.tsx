import { Star, MapPin, ShieldCheck, ArrowLeft, Heart, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { Provider } from '@/features/services/types/types';
import { useMemo } from 'react';

interface ServiceSearchCardProps {
  provider: Provider;
  onServiceRequest: (provider: Provider) => void;
  onViewProfile: (provider: Provider) => void;
}

export default function ServiceSearchCard({
  provider,
  onServiceRequest,
  onViewProfile,
}: ServiceSearchCardProps) {
  
  // 1. Logic: التعامل مع الصورة (pictureUrl)
  const avatarContent = useMemo(() => {
    if (provider.pictureUrl) {
      return (
        <img 
          src={provider.pictureUrl} 
          alt={provider.name} 
          className="h-full w-full rounded-3xl object-cover" 
        />
      );
    }
    // Fallback: أول حرف من الاسم أو النيك نيم
    return <span>{(provider.nickname || provider.name)?.charAt(0)}</span>;
  }, [provider.pictureUrl, provider.name, provider.nickname]);

  // 2. Logic: استخراج التخصص من قائمة الخدمات (Services)
  const displayProfession = useMemo(() => {
    if (provider.services && provider.services.length > 0) {
      return provider.services[0].name; // عرض أول خدمة كتخصص رئيسي
    }
    return "مقدم خدمة";
  }, [provider.services]);

  // 3. Logic: معالجة التقييم (Rating) وحالة التوفر
  const displayRating = provider.rating ? provider.rating.toFixed(1) : "0.0";
  
  // نفترض أن المتاح هو من لديه خدمات وموقع محدد (أو يمكنك ربطها بـ status لو موجودة في الـ API لاحقاً)
  const isAvailable = true; 

  return (
    <div className="group border-border/40 bg-card relative w-full rounded-[2.5rem] border p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-20px_rgba(79,70,229,0.15)]">
      {/* 1. Header: Avatar & Status */}
      <div className="mb-5 flex items-start justify-between">
        <div className="relative">
          <div className="bg-secondary border-border/50 flex h-20 w-20 items-center justify-center rounded-3xl border text-4xl shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 overflow-hidden">
            {avatarContent}
          </div>
          
          <div className={cn(
            'border-card absolute -right-1.5 -bottom-1.5 flex h-6 w-6 items-center justify-center rounded-full border-4',
            isAvailable ? 'bg-green-500' : 'bg-orange-500',
          )}>
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className={cn(
            'rounded-full px-4 py-1.5 text-[11px] font-black tracking-wider uppercase shadow-sm',
            isAvailable ? 'border border-green-500/20 bg-green-500/10 text-green-600' : 'border border-orange-500/20 bg-orange-500/10 text-orange-600',
          )}>
            {isAvailable ? 'متاح الآن' : 'مشغول'}
          </span>
          <button className="hover:bg-destructive/5 text-muted-foreground/40 hover:text-destructive rounded-full p-2 transition-colors">
            <Heart className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* 2. Body: Info */}
      <div className="space-y-3 text-right">
        <div>
          <div className="mb-1 flex flex-row-reverse items-center gap-1.5">
            <h3 className="text-foreground group-hover:text-primary text-xl font-black transition-colors">
              {provider.name}
            </h3>
            <ShieldCheck className="h-5 w-5 fill-blue-500/10 text-blue-500" />
          </div>
          <p className="text-muted-foreground text-sm font-bold">
            {displayProfession}
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex flex-row-reverse items-center gap-4 pt-1">
          {/* التقييم */}
          <div className="flex items-center gap-1.5 rounded-2xl bg-yellow-500/10 px-3 py-1 text-xs font-black text-yellow-700">
            <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
            {displayRating} ({provider.reviewsCount})
          </div>
          
          {/* عدد العمليات المنفذة - Jobs Count */}
          <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-bold">
            <Briefcase className="text-primary/60 h-3.5 w-3.5" />
            {provider.jobsCount} عملية
          </div>

          {/* الموقع */}
          <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-bold">
            <MapPin className="text-primary/60 h-4 w-4" />
            {provider?.baseLocation?.addressText?.split(',')[0]} {/* عرض أول جزء من العنوان */}
          </div>
        </div>
      </div>

      {/* 3. Footer: Buttons */}
      <div className="mt-8 flex gap-3">
        <Button
          onClick={() => onServiceRequest(provider)}
          className="bg-primary-gradient text-md shadow-primary-gradient h-14 flex-[1.5] gap-3 rounded-[1.5rem] font-black text-white transition-all hover:scale-[1.02] active:scale-95"
        >
          اطلب الآن
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <Button
          variant="outline"
          onClick={() => onViewProfile(provider)}
          className="border-border bg-secondary/30 text-foreground hover:bg-secondary h-14 flex-1 rounded-[1.5rem] font-black transition-all"
        >
          الملف
        </Button>
      </div>
    </div>
  );
}