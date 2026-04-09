import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User } from 'lucide-react';

const DirectRequest = () => {
  return (
    <Card className="bg-card flex h-[300px] rounded-xl border-none p-8 shadow-sm">
      <div className="bg-primary/10 flex size-12 items-center justify-center rounded-full">
        <User className="text-primary h-6 w-6" />
      </div>
      <div className="space-y-3">
        <h3 className="text-foreground text-2xl font-bold">طلب مباشر</h3>
        <p className="text-muted-foreground">
          اختر الحرفي المفضل لديك بناءً على التقييمات والأعمال السابقة.
        </p>
      </div>

      <Button
        variant="secondary"
        className="text-primary bg-primary/5 hover:bg-primary/10 mt-auto w-full cursor-pointer rounded-2xl border-none py-6 text-lg font-bold transition-colors"
      >
        تصفح الحرفيين
      </Button>
    </Card>
  );
};

export default DirectRequest;
