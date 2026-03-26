import { BadgeDollarSign, Headset, ShieldCheck, Star } from 'lucide-react';
import registerImg from '@/assets/images/register-img.png';
//import imges
import heropanel1 from '@/assets/images/heropanel1.jpg';
import heropanel2 from '@/assets/images/heropanel2.jpg';
import heropanel3 from '@/assets/images/heropanel3.jpg';
import FeatureCard from './FeatureCard';
import { cn } from '@/lib/utils';

const HeroPanel = () => {
  return (
    <div className="order-last hidden flex-col gap-4 lg:order-last lg:flex">
      {/* Main dark card */}
      <div className="relative flex min-h-125 max-w-md flex-col justify-end overflow-hidden rounded-2xl text-white shadow-xl">
        {/* Background image */}
        <img
          src={registerImg}
          alt="hero"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark overlay so text stays readable */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950/90 via-zinc-900/50 to-zinc-800/20" />

        {/* Warm orange glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(234,88,12,0.25)_0%,transparent_55%)]" />

        {/* Trusted badge */}
        <span className="bg-primary text-primary-foreground absolute top-44 right-8 z-10 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs shadow-md">
          <Star className="h-3 w-3" />
          منصة موثوقة
        </span>

        {/* Content — sits on top of overlay */}
        <div className="relative z-10 space-y-3 p-8">
          <h2 className="text-3xl leading-snug font-bold">
            ابحث عن أفضل الحرفيين في مدينتك
          </h2>
          <p className="m-4 max-w-96 text-lg leading-relaxed text-white/80">
            نوفر لك شبكة واسعة من المهنيين المعتمدين <br /> لإنجاز مشاريعك
            بكفاءة وجودة عالية.
          </p>

          {/* Avatars row */}
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 px-6 py-4 backdrop-blur-xs">
            <div className="flex -space-x-3 rtl:-space-x-3 rtl:space-x-reverse">
              {[heropanel1, heropanel2, heropanel3].map((source, i) => (
                <img
                  key={i}
                  src={source}
                  className={cn(
                    'h-9 w-9 rounded-full border-2 border-zinc-800 object-cover shadow-sm',
                    i !== 0 && '-mr-3',
                  )}
                />
              ))}
            </div>
            <div className="text-right">
              <p className="text-sm text-white/80">+٥٠٠٠ مستخدم</p>
              <p className="text-sm text-white/80">وثقوا بنا لإنجاز أعمالهم</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature cards grid */}
      <div className="grid max-w-md grid-cols-2 gap-3">
        <FeatureCard
          icon={<ShieldCheck className="h-5 w-5 text-blue-700" />}
          title="ضمان الجودة"
          desc="خدمات مضمونة وموثوقة"
        />
        <FeatureCard
          icon={<BadgeDollarSign className="h-5 w-5 text-green-700" />}
          title="أسعار تنافسية"
          desc="عروض تناسب ميزانيتك"
        />

        <FeatureCard
          icon={<Headset className="h-5 w-5 text-green-700" />}
          title="دعم فني 24/7"
          desc="نحن هنا لمساعدتك دائماً"
          width="450px"
        />
      </div>
    </div>
  );
};
export default HeroPanel;
