import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BadgeCheck, User, ArrowLeft, Star } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { motion } from 'framer-motion';

const Hero = () => (
  <div className="relative mx-auto flex min-h-[90vh] w-full max-w-7xl flex-col items-center justify-center gap-12 overflow-hidden px-8 py-20 md:flex-row">
    
    {/* Decorative Background Elements */}
    <div className="absolute top-0 right-0 -z-10 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
    <div className="absolute bottom-0 left-0 -z-10 h-80 w-80 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary/10 blur-[80px]" />

    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex-1 space-y-8 z-10"
    >
      <Badge variant="secondary" className="text-primary font-bold px-4 py-1.5 rounded-full bg-primary/10 border-none shadow-sm">
        <Star className="w-3.5 h-3.5 ml-2 inline-block fill-primary text-primary" />
        منصة الحرفيين الأولى في مصر
      </Badge>
      <h1 className="text-4xl leading-[1.15] font-extrabold tracking-tight lg:text-[3.5rem]">
        منصتك الموثوقة
        <br />
        للوصول إلى
        <br />
        <span className="bg-primary-gradient bg-clip-text text-transparent"> نخبة الحرفيين </span>
      </h1>
      <p className="text-muted-foreground mr-auto max-w-lg text-lg leading-relaxed lg:mr-0">
        حِرَفِيّ هو الجسر الذي يربطك بأفضل الكفاءات والمهارات المهنية في منطقتك.
        نضمن لك الجودة، الأمان، والسرعة في تنفيذ طلباتك بضغطة زر.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <Button
          className="bg-primary-gradient shadow-primary/25 rounded-2xl px-8 py-6 text-base font-bold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
        >
          ابحث عن حرفي
          <ArrowLeft className="mr-2 h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="rounded-2xl border-2 px-8 py-6 text-base font-bold transition-all hover:bg-primary/5 hover:border-primary/50"
        >
          اكتشف الخدمات
        </Button>
      </div>
      <div className="flex items-center gap-4 pt-4">
        <div className="flex -space-x-3 -space-x-reverse">
          {[1, 2, 3].map((_, i) => (
            <Avatar
              key={i}
              className="border-background h-10 w-10 border-2 shadow-sm"
            >
              <AvatarFallback className="bg-primary/10 text-primary">
                <User size={18} />
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
        <div>
          <p className="text-sm font-bold text-foreground">+5,000</p>
          <p className="text-muted-foreground text-xs">مستخدم موثوق</p>
        </div>
      </div>
    </motion.div>
    
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      className="flex flex-1 justify-center relative z-10"
    >
      <div className="relative">
        {/* Main Image */}
        <div className="border-foreground/5 relative h-[25rem] w-[90vw] md:w-[22rem] overflow-hidden rounded-[2rem] border shadow-2xl md:rotate-[3deg] lg:h-[36rem] lg:w-[28rem] transition-transform hover:rotate-0 duration-500">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay z-10" />
          <img
            src="/images/landing1.png"
            alt="ورشة وحرفيون"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Floating Card */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute -bottom-6 -left-6 md:-left-12 z-20"
        >
          <div className="bg-background/95 border-border/50 flex items-center gap-4 rounded-2xl border p-4 shadow-[0_10px_40px_rgba(0,0,0,0.1)] backdrop-blur-xl">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
              <BadgeCheck className="text-primary" size={24} />
            </div>
            <div className="text-right">
              <p className="text-base font-bold text-foreground">توثيق كامل للهوية</p>
              <p className="text-muted-foreground text-xs mt-0.5">
                حرفيون معتمدون 100%
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </div>
);

export default Hero;
