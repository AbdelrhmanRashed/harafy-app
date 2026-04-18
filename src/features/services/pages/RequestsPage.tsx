import { useGetAllRequestClient } from '../hooks/useGetAllRequestClient';
import { useServices } from '@/features/onboarding/hooks/useServices';
import { Button } from '@/components/ui/button';
import { AlertOctagon, RefreshCcw } from 'lucide-react';
import { RequestsTableHero } from '../components/RequestsTableHero';
import { RequestsEmptyState } from '../components/RequestsEmptyState';
import { RequestsDataTable } from '../components/RequestsDataTable';
import { RequestsGridSkeleton } from '../components/RequestsGridSkeleton';

const RequestsPage = () => {
  const {
    data: requests,
    isLoading,
    isError,
    refetch,
  } = useGetAllRequestClient();
  const { data: services } = useServices();

  return (
    <div className="bg-background/50 min-h-screen pb-20">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:pt-8">
        <RequestsTableHero />

        {/* Content Area */}
        {isLoading ? (
          <RequestsGridSkeleton />
        ) : isError || !requests ? (
          <div className="bg-destructive/5 border-destructive/20 mx-auto mt-10 flex w-full max-w-sm flex-col items-center justify-center rounded-xl border p-8 text-center">
            <div className="bg-destructive/10 mb-4 flex h-12 w-12 items-center justify-center rounded-md">
              <AlertOctagon className="text-destructive h-6 w-6" />
            </div>
            <h3 className="text-destructive mb-2 text-xl font-black">
              تعذر تحميل الطلبات
            </h3>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed font-semibold">
              حدث خطأ غير متوقع أثناء جلب بياناتك. يرجى التحقق من اتصالك
              والمحاولة مرة أخرى.
            </p>
            <Button
              variant="outline"
              className="border-destructive/30 hover:bg-destructive text-destructive h-11 w-full cursor-pointer rounded-md font-bold transition-colors hover:text-white"
              onClick={() => refetch()}
            >
              إعادة التحميل
              <RefreshCcw className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ) : requests.length === 0 ? (
          <RequestsEmptyState />
        ) : (
          <RequestsDataTable requests={requests} services={services || []} />
        )}
      </div>
    </div>
  );
};

export default RequestsPage;
