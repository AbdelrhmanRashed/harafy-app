import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';

const InfoCard = () => {
  return (
    <Card className="rounded-lg bg-blue-50 p-5 text-blue-700 md:flex-1 lg:flex-none dark:bg-blue-950/30 dark:text-blue-400">
      <div className="space-y-3 text-right">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5" />
          <p className="text-md font-semibold">لماذا نطلب هذه الوثائق؟</p>
        </div>
        <p className="text-sm leading-6">
          لضمان جودة الخدمات وسلامة العملاء، نقوم بالتحقق من هوية ومؤهلات كل
          حرفي ينضم إلى منصتنا.
        </p>
      </div>
    </Card>
  );
};

export default InfoCard;
