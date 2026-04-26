import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Info } from 'lucide-react';

type UserDistributionCardProps = {
  clients: number;
  providers: number;
};

export default function UserDistributionCard({
  clients,
  providers,
}: UserDistributionCardProps) {
  const admins = 1; // 1 Admin as requested
  const total = clients + providers + admins;
  const clientsPercentage = total > 0 ? Math.round((clients / total) * 100) : 0;
  const providersPercentage =
    total > 0 ? Math.round((providers / total) * 100) : 0;
  const adminsPercentage = total > 0 ? Math.round((admins / total) * 100) : 0;

  const data = [
    {
      label: 'العملاء',
      value: clientsPercentage,
      count: clients,
      color: 'bg-blue-600',
    },
    {
      label: 'الحرفيين',
      value: providersPercentage,
      count: providers,
      color: 'bg-indigo-400',
    },
    {
      label: 'المسؤولين',
      value: adminsPercentage,
      count: admins,
      color: 'bg-indigo-300',
    },
  ];

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>توزيع المستخدمين</CardTitle>
      </CardHeader>

      <CardContent className="flex h-full flex-col justify-between space-y-6">
        <div className="flex flex-col space-y-10">
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              {/* Header */}
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${item.color}`} />
                  <span className="font-medium">{item.label}</span>
                </span>
                <span className="text-muted-foreground flex items-center gap-2">
                  <span>{item.count}</span>
                  <span className="text-foreground font-bold">
                    ({item.value}%)
                  </span>
                </span>
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
          <Info className="text-primary mt-0.5 h-4 w-4 shrink-0" />
          <p>
            إجمالي المستخدمين المسجلين في المنصة:{' '}
            {total.toLocaleString('ar-EG')} مستخدم
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
