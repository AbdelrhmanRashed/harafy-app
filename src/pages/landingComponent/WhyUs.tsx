import { Card, CardContent } from "@/components/ui/card";
import { ShieldBan, ShieldCheck, Zap } from "lucide-react";

const features = [
  {
    icon: <ShieldBan className="w-6 h-6 text-primary" />,
    title: "الأمان والموثوقية",
    desc: "وتوثيق رسمي لجميع المحترفين المشتركين في نضمن لك تعاملاً آمناً من خلال نظام تقييم دقيق  المنصة. "
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    title: "الجودة العالية",
    desc: "نعمل مع نخبة من أصحاب المهارات الذين أثبتوا كفاءتهم من خلال سنوات من الخبرة والتقييمات الإيجابية.",
  },
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: "سهولة الاستخدام",
    desc: "واجهة بسيطة وسهلة تتيح لك الوصول إلى الحرفيين والتواصل معهم بكل يسر وسرعة عبر أي جهاز.",
  },

];

const WhyUs = () => (
  <div className="py-20 px-8 bg-primary/5">
    <div className="max-w-5xl mx-auto text-center space-y-3 mb-14">
      <h2 className="text-2xl font-bold ">لماذا يختارنا العملاء؟</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        نحن نضع معايير جديدة في تقديم الخدمات المنزلية والمهنية، مع التركيز على أهم احتياجاتك.      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {features.map((f, i) => (
        <Card key={i}>
          <CardContent className="p-6 text-right space-y-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              {f.icon}
            </div>
            <h3 className="font-bold text-md">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default WhyUs