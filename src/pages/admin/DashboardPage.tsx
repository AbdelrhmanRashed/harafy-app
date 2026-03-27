import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">لوحة التحكم</h1>
          <p className="text-muted-foreground mt-1">
            نظرة عامة على أداء النظام
          </p>
        </div>
        <Button>
          <Plus className="ml-2 h-4 w-4" />
          إضافة عنصر جديد
        </Button>
      </div>
    </div>
  );
};

export default DashboardPage;
