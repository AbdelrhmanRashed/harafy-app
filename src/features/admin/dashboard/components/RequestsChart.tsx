import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { useMemo } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

const chartConfig = {
  value: {
    label: 'عدد الطلبات',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

type RequestsChartProps = {
  requestsPerDay: { date: string; count: number }[];
  period: number;
  onPeriodChange: (period: number) => void;
};

const RequestsChart = ({ requestsPerDay, period, onPeriodChange }: RequestsChartProps) => {
  const chartData = useMemo(() => {
    return requestsPerDay.map((item) => {
      const date = new Date(item.date);
      let formattedDate = '';
      if (period === 0) {
        formattedDate = new Intl.DateTimeFormat('ar-EG', { weekday: 'short' }).format(date);
      } else if (period === 1) {
        formattedDate = new Intl.DateTimeFormat('ar-EG', { day: 'numeric', month: 'short' }).format(date);
      } else {
        formattedDate = new Intl.DateTimeFormat('ar-EG', { month: 'short', year: 'numeric' }).format(date);
      }
      
      return {
        dateLabel: formattedDate,
        value: item.count,
      };
    });
  }, [requestsPerDay, period]);

  const totalRequests = requestsPerDay.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-row-reverse items-start justify-between space-y-0">
        <div>
          <CardTitle>طلبات الخدمة عبر الوقت</CardTitle>
          <CardDescription>الإجمالي: {totalRequests.toLocaleString('ar-EG')} طلب</CardDescription>
        </div>

        <Select value={period.toString()} onValueChange={(val) => onPeriodChange(Number(val))}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="اختر الفترة" />
          </SelectTrigger>
          <SelectContent className="p-2">
            <SelectItem value="0">هذا الأسبوع</SelectItem>
            <SelectItem value="1">هذا الشهر</SelectItem>
            <SelectItem value="2">هذا العام</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2">
        <ChartContainer config={chartConfig}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-value)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-value)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="dateLabel"
              tickLine={false}
              axisLine={false}
              padding={{ left: 20, right: 20 }}
            />

            <ChartTooltip content={<ChartTooltipContent />} />

            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--color-value)"
              strokeWidth={2}
              fill="url(#fillValue)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RequestsChart;
