import { Card, CardContent } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
  trendType: 'up' | 'down';
  description: string;
  iconColor: string;
  iconBg?: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendType,
  description,
  iconColor,
  iconBg,
}: StatCardProps) => {
  return (
    <Card className="group bg-card border-none transition-all">
      <CardContent className="px-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <p className="text-muted-foreground text-sm leading-none font-medium tracking-tight">
              {title}
            </p>
            <h3 className="group-hover:text-primary text-3xl font-bold tracking-tighter transition-all">
              {value}
            </h3>
          </div>

          <div
            className={`rounded-lg p-2.5 transition-colors ${iconBg} border-border border duration-300 group-hover:scale-110`}
          >
            <Icon className={`size-5 ${iconColor}`} />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-1.5">
          <div
            className={`flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold ring-1 ring-inset ${
              trendType === 'up'
                ? 'bg-emerald-500/10 text-emerald-600 ring-emerald-500/20'
                : 'bg-rose-500/10 text-rose-600 ring-rose-500/20'
            }`}
          >
            {trendType === 'up' ? (
              <TrendingUp className="mr-1 size-3" />
            ) : (
              <TrendingDown className="mr-1 size-3" />
            )}
            {trend}
          </div>
          <p className="text-muted-foreground/80 text-[11px] font-medium tracking-wider uppercase">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
