import { CheckCircle2 } from "lucide-react";

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
    <section className="py-20 bg-primary/5">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 grid md:grid-cols-2 gap-14 items-center">
        <div className="rounded-3xl overflow-hidden">
          <img
            src="/images/landing2.png"
            alt="plumber working"
            className="rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
          />
        </div>

        {/* Content */}
        <div className="space-y-8 text-right">
          <h2 className="text-3xl font-bold">
            نهتم بأدق التفاصيل
          </h2>

          <div className="space-y-6">
            {detailsPoints.map((item, i) => (
              <div key={i} className="flex items-start gap-4 flex-row">
                <div className="mt-1">
                  <CheckCircle2 className="w-6 h-6 fill-primary text-background" />
                </div>
                <div>
                  <h4 className="font-bold text-base">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Details;