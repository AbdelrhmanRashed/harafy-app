import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Progress } from '@/components/ui/progress';
import { Info } from 'lucide-react';

const data = [
  {
    label: 'العملاء',
    value: 50,
    color: 'bg-primary',
  },
  {
    label: 'الحرفيين',
    value: 40,
    color: 'bg-secondary',
  },
  {
    label: 'مسؤولين',
    value: 10,
    color: 'bg-secondary',
  },
];

export default function UserDistributionCard() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>توزيع المستخدمين</CardTitle>
      </CardHeader>

      <CardContent className="flex h-full flex-col justify-between space-y-6">
        <div className="flex flex-col gap-8">
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              {/* Header */}
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${item.color}`} />
                  {item.label}
                </span>
                <span className="text-muted-foreground">{item.value}%</span>
              </div>

              {/* Progress */}
              <Progress
                value={item.value}
                className="bg-muted h-2"
                color={item.color}
              />
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="text-muted-foreground flex items-start gap-2 border-t pt-4 text-sm">
          <Info className="mt-0.5 h-4 w-4" />
          <p>زاد عدد المستخدمين بنسبة 8٪ هذا الشهر</p>
        </div>
      </CardContent>
    </Card>
  );
}
