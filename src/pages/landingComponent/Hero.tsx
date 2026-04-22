import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BadgeCheck, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Hero = () => (
  <div className="relative mx-auto flex min-h-130 w-full max-w-7xl flex-col items-center gap-12 overflow-hidden px-8 py-20 md:flex-row">
    <div className="flex-1 space-y-6">
      <Badge variant="secondary" className="text-primary font-bold">
        منصة الحرفين الأولى
      </Badge>
      <h1 className="text-4xl leading-tight font-extrabold tracking-tight lg:text-5xl">
        منصتك الموثوقة
        <br />
        للوصول إلى
        <br />
        <span className="text-primary"> نخبة للحرفين </span>
      </h1>
      <p className="text-muted-foreground mr-auto max-w-sm text-sm leading-relaxed lg:mr-0">
        حِرَفِيّ هو الجسر الذي يربطك بأفضل الكفاءات والمهارات المهنية في منطقتك.
        نضمن لك الجودة، الأمان، والسرعة في تنفيذ طلباتك.
      </p>
      <div className="flex items-center gap-3">
        <Button
          variant="gradient"
          size={'lg'}
          className="rounded-xl px-6 py-4 text-sm font-bold"
        >
          ابحث عن حرفي
        </Button>
        <Button
          size={'lg'}
          variant="secondary"
          className="text-primary rounded-xl px-6 py-4 text-sm font-bold"
        >
          اكتشف الخدمات
        </Button>
      </div>
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <div className="flex -space-x-3">
          {[1, 2, 3].map((_, i) => (
            <Avatar
              key={i}
              className="border-background bg-primary/10 h-8 w-8 border-2"
            >
              <AvatarFallback className="text-primary">
                <User size={16} />
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
        <span>+500 من مستخدمي منصتنا</span>
      </div>
    </div>
    <div className="flex flex-1 justify-center">
      <div className="relative">
        {/* Image */}
        <div className="border-foreground/10 relative h-100 w-100 overflow-hidden rounded-3xl border shadow-[0_30px_80px_rgba(0,0,0,0.25)] md:rotate-[4deg] lg:h-180 lg:w-135">
          <img
            src="/images/landing1.png"
            alt="workshop tools"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Floating Card */}
        <div className="absolute bottom-4 left-1/2 w-[90%] -translate-x-1/2 md:rotate-[4deg]">
          <div className="bg-background/90 border-border flex items-center gap-4 rounded-2xl border px-4 py-3 shadow-lg backdrop-blur-md">
            {/* Icon */}
            <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
              <BadgeCheck className="text-primary" size={18} />
            </div>
            {/* Text */}
            <div className="text-right">
              <p className="text-sm font-semibold">توثيق كامل للهوية</p>
              <p className="text-muted-foreground text-xs">
                جميع الحرفيين خاضعون لفحص أمني
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Hero;
