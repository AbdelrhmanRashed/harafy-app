import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ClipboardList, Zap, UserSearch, ArrowLeft } from 'lucide-react';

const QuickLinks = () => {
  return (
    <Card className="bg-card w-full overflow-hidden rounded-3xl border-none shadow-sm transition-all hover:shadow-md">
      <CardContent className="space-y-5 p-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 flex h-9 w-9 items-center justify-center rounded-2xl shadow-sm">
            <Star className="fill-primary text-primary h-5 w-5" />
          </div>
          <h3 className="text-foreground text-sm font-bold">إجراءات سريعة</h3>
        </div>

        {/* Buttons List */}
        <div className="grid gap-3">
          {/* Main Action Button */}
          <Button className="group bg-primary-gradient shadow-primary-gradient relative flex h-14 w-full justify-start gap-3 rounded-2xl px-5 transition-transform hover:scale-[1.02] active:scale-95">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
              <ClipboardList size={20} className="text-white" />
            </div>
            <span className="text-sm font-bold text-white">طلباتي</span>
            <ArrowLeft
              size={16}
              className="absolute left-5 text-white opacity-0 transition-all group-hover:left-4 group-hover:opacity-100"
            />
          </Button>

          {/* Secondary Action 1 */}
          <Button
            variant="secondary"
            className="group hover:bg-secondary/80 flex h-14 w-full justify-start gap-3 rounded-2xl px-5 transition-all"
          >
            <div className="bg-primary/10 text-primary group-hover:bg-primary flex h-8 w-8 items-center justify-center rounded-lg transition-colors group-hover:text-white">
              <Zap size={18} />
            </div>
            <span className="text-sm font-semibold">طلب خدمة فورية</span>
          </Button>

          {/* Secondary Action 2 */}
          <Button
            variant="secondary"
            className="group hover:bg-secondary/80 flex h-14 w-full justify-start gap-3 rounded-2xl px-5 transition-all"
          >
            <div className="bg-primary/10 text-primary group-hover:bg-primary flex h-8 w-8 items-center justify-center rounded-lg transition-colors group-hover:text-white">
              <UserSearch size={18} />
            </div>
            <span className="text-sm font-semibold">طلب خدمة مباشر</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickLinks;
