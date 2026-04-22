import { CheckCircle2 } from "lucide-react";
import { motion } from 'framer-motion';

const detailsPoints = [
  {
    title: "دعم فني 24/7",
    desc: "فريقنا متواجد دائمًا لمساعدتك في أي استفسار أو مشكلة قد تواجهك.",
  },
  {
    title: "أسعار تنافسية",
    desc: "نقدم أفضل قيمة مقابل السعر مع شفافية كاملة في عرض التكاليف.",
  },
  {
    title: "ضمان الخدمة",
    desc: "رضاك هو أولويتنا، ونقدم ضمانًا على جودة الخدمات المقدمة عبر المنصة.",
  },
];

const Details = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 -z-10" />

      <div className="mx-auto max-w-7xl px-8 grid md:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] rotate-3 -z-10 scale-105 transition-transform duration-500 hover:rotate-6" />
          <div className="rounded-[2.5rem] overflow-hidden border border-foreground/5 shadow-2xl relative">
            <img
              src="/images/landing2.png"
              alt="plumber working"
              className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent mix-blend-overlay" />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-10 text-right"
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold leading-[1.2]">
              نهتم بأدق التفاصيل
              <br/>
              <span className="text-primary bg-primary/10 px-2 rounded-lg mt-2 inline-block">لراحتك</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              نحن نؤمن بأن الجودة تكمن في التفاصيل، ولذلك حرصنا على تصميم تجربة تضعك في المقام الأول.
            </p>
          </div>

          <div className="space-y-8">
            {detailsPoints.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.3 }}
                className="flex items-start gap-5 p-4 rounded-2xl transition-colors hover:bg-card/60 -mr-4"
              >
                <div className="bg-primary/10 p-3 rounded-2xl shrink-0 mt-1 shadow-sm">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-xl text-foreground">
                    {item.title}
                  </h4>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Details;