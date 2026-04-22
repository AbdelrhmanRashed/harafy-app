import { Card, CardContent } from '@/components/ui/card';
import { ShieldBan, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <ShieldBan className="text-primary h-8 w-8" />,
    title: 'الأمان والموثوقية',
    desc: 'نضمن لك تعاملاً آمناً من خلال نظام تقييم دقيق وتوثيق رسمي لجميع الحرفيين المشتركين في المنصة.',
  },
  {
    icon: <ShieldCheck className="text-primary h-8 w-8" />,
    title: 'الجودة العالية',
    desc: 'نعمل مع نخبة من أصحاب المهارات الذين أثبتوا كفاءتهم من خلال سنوات من الخبرة والتقييمات الإيجابية.',
  },
  {
    icon: <Zap className="text-primary h-8 w-8" />,
    title: 'سهولة الاستخدام',
    desc: 'واجهة بسيطة وسهلة تتيح لك الوصول إلى الحرفيين والتواصل معهم بكل يسر وسرعة عبر أي جهاز.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const WhyUs = () => (
  <div className="relative py-24 overflow-hidden">
    <div className="absolute inset-0 bg-primary/5 -skew-y-2 transform origin-top-left -z-10" />
    
    <div className="px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-16 max-w-2xl space-y-4 text-center"
      >
        <h2 className="text-3xl font-extrabold md:text-4xl">لماذا يختارنا العملاء؟</h2>
        <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
          نحن نضع معايير جديدة في تقديم الخدمات المنزلية والمهنية، مع التركيز على
          أهم احتياجاتك.
        </p>
      </motion.div>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3"
      >
        {features.map((f, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card className="h-full border-2 border-transparent bg-card/50 backdrop-blur-sm transition-all hover:border-primary/20 hover:bg-card hover:shadow-xl hover:-translate-y-1 duration-300">
              <CardContent className="space-y-4 p-8 text-right">
                <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-2xl mb-6 shadow-sm">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold">{f.title}</h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed">
                  {f.desc}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </div>
);

export default WhyUs;
