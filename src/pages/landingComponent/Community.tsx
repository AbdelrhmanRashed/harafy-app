import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, Wrench } from 'lucide-react';

const Community = () => {
  return (
    <div className="px-8 py-20">
      <div className="mx-auto mb-12 max-w-4xl space-y-3 text-center">
        <h2 className="text-2xl font-extrabold">انضم إلى مجتمعنا اليوم</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          سواء كنت تبحث عن خدمة أو ترغب في تقديم مهاراتك، حِرَفِيّ هو المكان
          المناسب لك.
        </p>
      </div>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-12 md:grid-cols-2">
        {/* Client card */}
        <Card className="rounded-xl">
          <CardContent className="flex flex-col items-center justify-center gap-4 p-7">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
              <User className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold">سجّل كعميل</h3>
            <p className="text-muted-foreground text-center text-sm leading-relaxed">
              ابحث عن أفضل الحرفيين قارن بين التقييمات، واحصل على خدماتك بأفضل
              جودة وسعر في السوق.
            </p>
            <Button
              variant="gradient"
              size={'lg'}
              className="rounded-2xl px-12 py-4 font-bold"
            >
              بدأ البحث الآن
            </Button>
          </CardContent>
        </Card>

        {/* Craftsman card */}
        <Card className="rounded-xl">
          <CardContent className="flex flex-col items-center justify-center gap-4 p-7">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
              <Wrench className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold">سجّل كحرفي</h3>
            <p className="text-muted-foreground text-center text-sm leading-relaxed">
              زد من دخلك الشهري، ابنِ سمعتك الرقمية، وتواصل مع آلاف العملاء
              الذين يبحثون عن مهاراتك يومياً.
            </p>
            <Button
              variant="secondary"
              size={'lg'}
              className="text-primary rounded-full px-12 py-4 font-bold"
            >
              انضم كشريك نجاح
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Community;
