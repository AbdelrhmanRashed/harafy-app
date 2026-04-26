import { useState } from 'react';
import QuickActionsCard from '../components/QuickActionsCard';
import RequestsChart from '../components/RequestsChart';
import StatCard from '../components/StatCard';
import type { StatCardProps } from '../components/StatCard';
import UserDistributionCard from '../components/UserDistributionCard';
import { Users, ClipboardList, Zap, UserCog, Loader2 } from 'lucide-react';
import { useDashboardStats } from '../hooks/useDashboardStats';
import DashboardSkeleton from '../components/DashboardSkeleton';

const DashboardPage = () => {
  const [period, setPeriod] = useState<number>(1); // Default to month
  const { data, isLoading } = useDashboardStats(period);

  if (isLoading || !data) {
    return <DashboardSkeleton />;
  }

  const stats: StatCardProps[] = [
    {
      title: 'إجمالي العملاء',
      value: data.clientsNotProviders.toLocaleString('ar-EG'),
      icon: Users,
      trend: '',
      trendType: 'up',
      description: 'عملاء مسجلين',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50/15',
    },
    {
      title: 'إجمالي الفنيين',
      value: data.providers.toLocaleString('ar-EG'),
      icon: UserCog,
      trend: '',
      trendType: 'up',
      description: 'فنيين مسجلين',
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-50/15',
    },
    {
      title: 'طلبات قيد الانتظار',
      value: data.openRequests.toLocaleString('ar-EG'),
      icon: ClipboardList,
      trend: '',
      trendType: 'down',
      description: 'طلبات مفتوحة',
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50/15',
    },
    {
      title: 'الطلبات النشطة',
      value: data.inProgressRequests.toLocaleString('ar-EG'),
      icon: Zap,
      trend: '',
      trendType: 'up',
      description: 'طلبات قيد التنفيذ',
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
      <div className="grid grid-cols-1 gap-4 p-4 xl:grid-cols-2">
        <RequestsChart
          requestsPerDay={data.requestsPerDay}
          period={period}
          onPeriodChange={setPeriod}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <UserDistributionCard
            clients={data.clientsNotProviders}
            providers={data.providers}
          />
          <QuickActionsCard />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
