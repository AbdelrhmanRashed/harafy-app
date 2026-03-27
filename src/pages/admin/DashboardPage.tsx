import QuickActionsCard from '@/components/dashboard/QuickActionsCard';
import RequestsChart from '@/components/dashboard/RequestsChart';
import StatCard from '@/components/dashboard/StatCard';
import type { StatCardProps } from '@/components/dashboard/StatCard';
import UserDistributionCard from '@/components/dashboard/UserDistributionCard';
import { Users, ClipboardList, Zap, UserCog } from 'lucide-react';

const DashboardPage = () => {
  const stats: StatCardProps[] = [
    {
      title: 'إجمالي المستخدمين',
      value: '١٢,٤٥٠',
      icon: Users,
      trend: '١٢٪',
      trendType: 'up',
      description: 'منذ الشهر الماضي',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50/15',
    },
    {
      title: 'إجمالي الفنيين',
      value: '٣,٢٨٠',
      icon: UserCog,
      trend: '٥٪',
      trendType: 'up',
      description: 'منذ الشهر الماضي',
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-50/15',
    },
    {
      title: 'طلبات قيد الانتظار',
      value: '٤٥',
      icon: ClipboardList,
      trend: '٢٪',
      trendType: 'down',
      description: 'منذ الأسبوع الماضي',
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50/15',
    },
    {
      title: 'الطلبات النشطة',
      value: '٨٩٢',
      icon: Zap,
      trend: '٨٪',
      trendType: 'up',
      description: 'منذ الشهر الماضي',
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50/15',
    },
  ];
  return (
    <div className="bg-background flex flex-col gap-4">
      <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard {...stat} key={index} />
        ))}
      </div>
      <div className="grid gap-4 p-4 md:grid-cols-2">
        <RequestsChart />
        <div className="grid gap-4 md:grid-cols-2">
          <UserDistributionCard />
          <QuickActionsCard />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
