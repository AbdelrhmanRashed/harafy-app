import { LocateFixed } from 'lucide-react';
import DirectRequestCard from '@/features/dashboard/components/provider/DirectRequestCard';
import { useAssignedRequests } from '../../hooks/useAssignedRequests';

const DirectPage = () => {
  const { data: requests, isLoading } = useAssignedRequests(false);
  return (
    <div
      className="bg-background min-h-screen font-[Cairo,sans-serif]"
      dir="rtl"
    >
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-6">
        {/* Header */}
        <div className="text-right">
          <h1 className="text-foreground text-2xl font-black">
            طلبات الخدمة المباشرة
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            لديك {requests?.length ?? 0} طلبات جديدة بانتظار مراجعتك
          </p>
        </div>
        {/* List */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
          </div>
        ) : !requests?.length ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20">
            <LocateFixed className="text-muted-foreground/30 h-12 w-12" />
            <p className="text-muted-foreground text-sm">
              لا توجد طلبات متاحة حالياً
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((item) => (
              <DirectRequestCard key={item.id} data={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectPage;
