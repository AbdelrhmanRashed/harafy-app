import { useMemo } from 'react';
import { DataTable } from '../components/data-table';
import { columns } from '../components/columns';
import { useGetUnderReviewProvider } from '../hooks/useGetUnderReviewProviders';
import { CraftsmenSkeleton } from '../components/CraftsmenSkeleton';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCcw, AlertCircle, Users, Clock } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const CraftsmenPage = () => {
  const {
    data: providers,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useGetUnderReviewProvider();

  const stats = useMemo(
    () => ({
      total: providers?.length || 0,
      underReview: providers?.length || 0,
    }),
    [providers],
  );

  // ================= Stats Card Component =================
  const StatsCard = ({ title, value, icon, highlight = false }: any) => (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm font-medium">{title}</p>
            <h2
              className={`mt-1 text-3xl font-bold ${highlight ? 'text-primary' : ''}`}
            >
              {value}
            </h2>
          </div>
          <div className="bg-accent/20 rounded-full p-3">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );

  // ================= Empty State Component =================
  const EmptyState = ({ onRetry }: { onRetry: () => void }) => (
    <Card className="flex flex-col items-center justify-center border-2 border-dashed p-12 text-center">
      <div className="mb-4 rounded-full p-4">
        <Users className="h-10 w-10" />
      </div>
      <CardTitle className="mb-2">لا توجد طلبات</CardTitle>
      <CardDescription className="mx-auto max-w-[250px]">
        يبدو أن قائمة الانتظار فارغة حالياً. سيظهر الحرفيون الجدد هنا.
      </CardDescription>
      <Button variant="secondary" className="mt-6" onClick={onRetry}>
        تحديث القائمة
      </Button>
    </Card>
  );

  // ================= Loading State =================
  if (isLoading) return <CraftsmenSkeleton />;

  // ================= Error State =================
  if (isError) {
    return (
      <div className="container mx-auto p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>خطأ في تحميل البيانات</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            تعذر جلب بيانات الحرفيين حالياً. يرجى المحاولة مرة أخرى.
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              إعادة المحاولة
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      {/* ================= Header ================= */}
      <header className="flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1 text-right">
          <h1 className="text-3xl font-extrabold tracking-tight">
            مراجعة الحرفيين
          </h1>
          <p className="text-muted-foreground text-lg">
            إدارة وتدقيق طلبات الانضمام للمنصة
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isRefetching}
          className="w-fit gap-2 self-end shadow-sm md:self-auto"
        >
          <RefreshCcw
            className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`}
          />
          تحديث البيانات
        </Button>
      </header>

      {/* ================= Stats Cards ================= */}
      <section className="grid gap-6 md:grid-cols-3">
        <StatsCard
          title="إجمالي الطلبات"
          value={stats.total}
          icon={<Users className="text-blue-500" size={20} />}
        />
        <StatsCard
          title="قيد المراجعة"
          value={stats.underReview}
          icon={<Clock className="text-amber-500" size={20} />}
          highlight
        />
      </section>

      {/* ================= Main Content ================= */}
      {!providers?.length ? (
        <EmptyState onRetry={refetch} />
      ) : (
        <Card className="border-none shadow-lg ring-1">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">قائمة الحرفيين</CardTitle>
                <CardDescription>
                  عرض جميع الطلبات التي تنتظر موافقة الإدارة
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <DataTable columns={columns} data={providers} searchKey="name" />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CraftsmenPage;
