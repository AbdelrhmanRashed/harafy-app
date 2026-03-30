import { Card } from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

const RegistrationStatusCard = () => {
  return (
    <Card className="rounded-lg p-6 md:flex-1 lg:flex-none">
      <Field className="w-full max-w-sm">
        <FieldLabel
          htmlFor="progress-upload"
          className="flex items-center justify-between"
        >
          <span className="text-md font-bold"> حالة التسجيل</span>
          <span className="text-md text-primary font-medium">50%</span>
        </FieldLabel>
        <Progress value={50} id="progress-upload" className="rtl:rotate-180" />
      </Field>
      {/* Steps */}
      <div className="mt-1 space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <Badge
            variant="default"
            className="relative size-5 rounded-full bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
          >
            <Check size={16} className="absolute" />
          </Badge>
          <span className="text-muted-foreground font-medium line-through">
            المعلومات الشخصية
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant="default"
            className="bg-primary text-primary-foreground size-5 rounded-full"
          >
            2
          </Badge>
          <span className="text-primary font-medium">بيانات المهنة</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="size-5 rounded-full">
            3
          </Badge>
          <span className="text-muted-foreground font-medium">
            المراجعة والاعتماد
          </span>
        </div>
      </div>
    </Card>
  );
};

export default RegistrationStatusCard;
