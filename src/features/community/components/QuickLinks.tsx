import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ClipboardList, Zap, UserSearch } from 'lucide-react';

const QuickLinks = () => {
  return (
    <Card className="w-full rounded-2xl bg-white shadow-sm">
      <CardContent className="space-y-4 p-5">
        {/* Header */}
        <div className="text-md flex items-center gap-2 font-bold">
          <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-full">
            <Star color="white" className="h-4 w-4 fill-white text-white" />
          </div>
          <span>إجراءات سريعة</span>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Button
            variant="gradient"
            className="flex w-full justify-start rounded-full px-5 py-3"
          >
            <ClipboardList size={18} />
            <span className="font-medium">طلباتي</span>
          </Button>

          <Button
            variant="secondary"
            className="flex w-full justify-start rounded-full px-5 py-3"
          >
            <Zap size={18} className="text-primary" />
            <span className="font-medium">طلب خدمة فورية</span>
          </Button>

          <Button
            variant="secondary"
            className="flex w-full justify-start rounded-full px-5 py-3"
          >
            <UserSearch size={18} className="text-primary" />
            <span className="font-medium">طلب خدمة مباشر</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickLinks;
