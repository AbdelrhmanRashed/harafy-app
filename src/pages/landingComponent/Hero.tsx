import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck,  User,  } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Hero = () => (
    <div className="relative overflow-hidden  px-8 py-20 min-h-130 flex  flex-col md:flex-row items-center gap-12 w-full max-w-7xl mx-auto">
        <div className="flex-1 space-y-6 ">
            <Badge variant="secondary" className="text-primary font-bold " >
                منصة الحرفين الأولى
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
                منصتك الموثوقة
                <br />
                للوصول إلى
                <br />
                <span className="text-primary "> نخبة للحرفين </span>
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mr-auto lg:mr-0">
                حِرَفِيّ هو الجسر الذي يربطك بأفضل الكفاءات والمهارات المهنية في
                منطقتك. نضمن لك الجودة، الأمان، والسرعة في تنفيذ طلباتك.
            </p>
            <div className="flex items-center gap-3 ">
                <Button
                    variant="gradient"
                    size={"lg"}
                    className="rounded-xl  px-6 py-4 text-sm font-bold">
                    ابحث عن محترف
                </Button>
                <Button
                    size={"lg"}
                    variant="secondary"
                    className="rounded-xl px-6 py-4 text-sm font-bold text-primary">
                   اكتشف الخدمات
                </Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex -space-x-3">
                    {[1, 2, 3].map((_, i) => (
                        <Avatar
                            key={i}
                            className="w-8 h-8 border-2 border-background bg-primary/10"
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
 <div className="flex-1 flex justify-center">
      <div className="relative">
        {/* Image */}
        <div className="relative w-100 h-100 lg:w-135 lg:h-180  rounded-3xl overflow-hidden border border-foreground/10 shadow-[0_30px_80px_rgba(0,0,0,0.25)] md:rotate-[4deg]">
          <img
            src="/images/landing1.png"
            alt="workshop tools"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Floating Card */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] md:rotate-[4deg]">
          <div className="flex items-center gap-4 bg-background/90 backdrop-blur-md border border-border rounded-2xl px-4 py-3 shadow-lg">
            {/* Icon */}
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10">
              <BadgeCheck   className="text-primary" size={18} />
            </div>
            {/* Text */}
            <div className="text-right">
              <p className="text-sm font-semibold">
                توثيق كامل للهوية
              </p>
              <p className="text-xs text-muted-foreground">
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