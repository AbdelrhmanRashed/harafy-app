import { Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const RequestsEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-card border-border/50 flex flex-col items-center justify-center rounded-[2.5rem] border border-dashed p-16 text-center shadow-sm">
      <div className="bg-primary/5 ring-primary/5 mb-6 flex h-24 w-24 items-center justify-center rounded-full shadow-inner ring-8">
        <Archive className="text-primary h-10 w-10" />
      </div>
      <h3 className="text-foreground mb-3 text-3xl font-black">
        سجل الطلبات فارغ تماماً
      </h3>
      <p className="text-muted-foreground/80 max-w-md text-base leading-relaxed font-semibold">
        يبدو أنك لم تقم بإنشاء أو الاستعانة بأي حرفي حتى اللحظة. تصفح دليل
        الخدمات وابدأ بإرسال طلبك الأول بكل سهولة!
      </p>
      <Button
        variant="gradient"
        className="shadow-primary/20 mt-8 h-14 cursor-pointer rounded-full px-8 text-base font-bold shadow-lg"
        onClick={() => navigate('/app/services')}
      >
        تصفح الخدمات ومقدمي الخدمة
      </Button>
    </div>
  );
};
