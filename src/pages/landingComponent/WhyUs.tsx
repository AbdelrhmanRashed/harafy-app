import { Card, CardContent } from '@/components/ui/card';
import { ShieldBan, ShieldCheck, Zap } from 'lucide-react';

const features = [
  {
    icon: <ShieldBan className="text-primary h-6 w-6" />,
    title: 'الأمان والموثوقية',
    desc: 'وتوثيق رسمي لجميع الحرفيين المشتركين في نضمن لك تعاملاً آمناً من خلال نظام تقييم دقيق  المنصة. ',
  },
  {
    icon: <ShieldCheck className="text-primary h-6 w-6" />,
    title: 'الجودة العالية',
    desc: 'نعمل مع نخبة من أصحاب المهارات الذين أثبتوا كفاءتهم من خلال سنوات من الخبرة والتقييمات الإيجابية.',
  },
  {
    icon: <Zap className="text-primary h-6 w-6" />,
    title: 'سهولة الاستخدام',
    desc: 'واجهة بسيطة وسهلة تتيح لك الوصول إلى الحرفيين والتواصل معهم بكل يسر وسرعة عبر أي جهاز.',
  },
];

const WhyUs = () => (
  <div className="bg-primary/5 px-8 py-20">
    <div className="mx-auto mb-14 max-w-5xl space-y-3 text-center">
      <h2 className="text-2xl font-bold">لماذا يختارنا العملاء؟</h2>
      <p className="text-muted-foreground text-sm leading-relaxed">
        نحن نضع معايير جديدة في تقديم الخدمات المنزلية والمهنية، مع التركيز على
        أهم احتياجاتك.{' '}
      </p>
    </div>
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
      {features.map((f, i) => (
        <Card key={i}>
          <CardContent className="space-y-3 p-6 text-right">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
              {f.icon}
            </div>
            <h3 className="text-md font-bold">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {f.desc}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default WhyUs;
