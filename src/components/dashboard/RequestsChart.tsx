import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

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

const data = [
  { week: 'الأسبوع 1', value: 200 },
  { week: 'الأسبوع 2', value: 800 },
  { week: 'الأسبوع 3', value: 300 },
  { week: 'الأسبوع 4', value: 600 },
];

const chartConfig = {
  value: {
    label: 'عدد الطلبات',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

const RequestsChart = () => {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-row-reverse items-start justify-between space-y-0">
        <div>
          <CardTitle>طلبات الخدمة عبر الوقت</CardTitle>
          <CardDescription>الإجمالي: ٢٬٤٥٠ طلب</CardDescription>
        </div>

        <Select defaultValue="30">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="آخر 30 يوم" />
          </SelectTrigger>
          <SelectContent className="p-2">
            <SelectItem value="7">آخر 7 أيام</SelectItem>
            <SelectItem value="30">آخر 30 يوم</SelectItem>
            <SelectItem value="90">آخر 90 يوم</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2">
        <ChartContainer config={chartConfig}>
          <AreaChart data={data}>
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
              dataKey="week"
              tickLine={false}
              axisLine={false}
              padding={{ left: 20, right: 20 }}
            />

            <ChartTooltip content={<ChartTooltipContent />} />

            <Area
              type="natural"
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
