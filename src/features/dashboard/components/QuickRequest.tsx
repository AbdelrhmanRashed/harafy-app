import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Zap } from 'lucide-react';

const QuickRequest = () => {
  return (
    <Card className="bg-primary-gradient shadow-primary-gradient relative flex h-[300px] flex-col items-start justify-between gap-4 overflow-hidden rounded-4xl border-none p-8 md:items-start">
      <Zap
        className="pointer-events-none absolute top-0 left-0 h-68 w-68 -translate-x-16 -translate-y-16 rotate-12 fill-white/10 text-white/10"
        strokeWidth={1}
      />

      <div className="relative z-10 flex w-full flex-col items-start gap-2 md:w-auto">
        <div className="mb-2 flex items-center gap-3">
          <Zap className="fill-primary-foreground text-primary-foreground h-8 w-8" />
          <h3 className="text-primary-foreground text-3xl font-bold">
            طلب فوري
          </h3>
        </div>
        <p className="text-primary-foreground/80 max-w-[350px] text-lg leading-relaxed">
          احصل على محترف الآن بأسرع وقت ممكن للمهام العاجلة والطارئة.
        </p>
      </div>

      <div className="relative z-10">
        <Button
          variant="secondary"
          className="text-primary bg-secondary hover:bg-secondary/90 cursor-pointer rounded-2xl px-8 py-7 text-xl font-bold transition-transform active:scale-95"
        >
          ابدأ الطلب الفوري
        </Button>
      </div>
    </Card>
  );
};

export default QuickRequest;
