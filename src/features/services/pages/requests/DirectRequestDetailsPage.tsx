import { useParams, useNavigate } from 'react-router-dom';
import { useGetServiceReqById } from '../../hooks/useGetServiceReqById';
import { useSetReqCancelled } from '../../hooks/useSetReqCancelled';
import { useSetReqCompleted } from '../../hooks/useSetReqCompleted';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import 'leaflet/dist/leaflet.css';
import { Badge } from '@/components/ui/badge';
import { ServiceStatus } from '@/constants/service-status';
import StatusTimeLine from '../../components/StatusTimeLine';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import { CheckCircle, AlertCircle } from 'lucide-react';
import RequestDetailsSection from '../../components/RequestDetailsSection';
import DirectRequestProviderSection from '../../components/DirectRequestProviderSection';
import ReviewDialog from '../../components/ReviewDialog';
import { useEffect, useState } from 'react';
import DirectRequestDetailsSkeleton from '../../components/DirectRequestDetailsSkeleton';

const DirectRequestDetailsPage = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);

  // ─── Get Service Request By ID Hook ──────────────────────────────────────────────────
  const {
    data: requestDetails,
    isLoading,
    isError,
  } = useGetServiceReqById(requestId ?? '');

  // ─── Cancel Request Mutation ──────────────────────────────────────────────────
  const { mutate: cancelRequest, isPending: isCanceling } =
    useSetReqCancelled();

  // ─── Complete Request Mutation ──────────────────────────────────────────────────
  const { mutate: completeRequest, isPending: isCompleting } =
    useSetReqCompleted();

  // ─── Handle Cancel Request ──────────────────────────────────────────────────
  const handleCancelRequest = () => {
    if (requestDetails?.requestStatus === ServiceStatus.COMPLETED) {
      toast.error('لا يمكن إلغاء الطلب');
      return;
    }

    cancelRequest(requestId ?? '', {
      onSuccess: () => {
        localStorage.removeItem('activeRequestId');
        localStorage.removeItem('requestType');
        navigate('/app/services');
      },
    });
  };

  // ─── Handle Complete Request ──────────────────────────────────────────────────
  const handleCompleteRequest = () => {
    if (requestDetails?.requestStatus !== ServiceStatus.IN_PROGRESS) {
      toast.error('لا يمكن إكمال الطلب');
      return;
    }

    completeRequest(requestId ?? '', {
      onSuccess: () => {
        localStorage.removeItem('activeRequestId');
        localStorage.removeItem('requestType');
        setIsReviewOpen(true);
      },
    });
  };

  // Status mapping
  const getStatusLabel = (status: any) => {
    switch (status) {
      case ServiceStatus.OPEN:
        return 'قيد الانتظار';
      case ServiceStatus.ASSIGNED:
        return 'تم ارسال الطلب للحرفى';
      case ServiceStatus.IN_PROGRESS:
        return 'قيد التنفيذ';
      case ServiceStatus.COMPLETED:
        return 'مكتمل';
      case ServiceStatus.CANCELLED:
        return 'ملغي';
      default:
        return 'غير معروف';
    }
  };

  // ─── Scroll to Top ──────────────────────────────────────────────────
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [requestId]);

  // Loading & Error States
  if (isLoading) {
    return <DirectRequestDetailsSkeleton />;
  }

  if (isError || !requestDetails) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center p-4 font-[Cairo,sans-serif]">
        <div className="bg-card border-border/50 shadow-destructive/5 flex w-full max-w-md flex-col items-center justify-center space-y-6 rounded-[2.5rem] border p-10 text-center shadow-2xl">
          <div className="bg-destructive/10 ring-destructive/5 flex h-24 w-24 items-center justify-center rounded-full ring-8">
            <AlertCircle className="text-destructive h-12 w-12" />
          </div>
          <div className="space-y-2">
            <h2 className="text-foreground text-2xl font-black">
              عذراً، حدث خطأ!
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed font-medium">
              واجهنا مشكلة غير متوقعة أثناء محاولة جلب تفاصيل هذا الطلب. يرجى
              المحاولة مرة أخرى أو العودة للصفحة السابقة.
            </p>
          </div>
          <Button
            onClick={() => navigate(-1)}
            variant="gradient"
            className="shadow-primary/20 h-12 w-full cursor-pointer rounded-full font-bold shadow-lg transition-all"
          >
            العودة للصفحة السابقة
          </Button>
        </div>
      </div>
    );
  }

  const isCompleted = requestDetails.requestStatus === ServiceStatus.COMPLETED;
  const isCancelled = requestDetails.requestStatus === ServiceStatus.CANCELLED;

  return (
    <>
      <div className="bg-background min-h-screen pb-20">
        <div className="mx-auto max-w-7xl space-y-8 px-4 pt-6">
          {/* ── Header Actions & Title ── */}
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
            {/* Title & Badge */}
            <div className="w-full space-y-1 md:w-auto">
              <h1 className="text-foreground text-3xl font-black">
                تفاصيل الطلب المباشر
              </h1>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="text-primary bg-primary/10 rounded-full px-3 py-1 text-xs font-bold"
                >
                  {getStatusLabel(requestDetails.requestStatus)}
                </Badge>
                <span className="text-muted-foreground text-sm font-bold">
                  رقم الطلب:
                  <span className="text-primary"> #{requestDetails.id}</span>
                </span>
              </div>
            </div>
            {/* Actions */}
            <div className="flex w-full items-center gap-3 md:w-auto">
              {!isCompleted && !isCancelled && (
                <ConfirmDialog
                  title="إلغاء الطلب"
                  description="هل أنت متأكد من إلغاء هذا الطلب؟ هذا الإجراء لا يمكن التراجع عنه."
                  onConfirm={handleCancelRequest}
                  isLoading={isCanceling}
                  variant="destructive"
                  confirmButton="تأكيد الإلغاء"
                  cancelButton="تراجع"
                  size="sm"
                >
                  <Button
                    disabled={isCanceling}
                    variant="destructive"
                    size="sm"
                    className="h-10 flex-1 cursor-pointer rounded-full px-5 text-xs font-bold md:flex-auto"
                  >
                    {isCanceling ? 'جاري الإلغاء...' : 'إلغاء الطلب'}
                  </Button>
                </ConfirmDialog>
              )}

              {requestDetails.requestStatus === ServiceStatus.IN_PROGRESS && (
                <Button
                  onClick={handleCompleteRequest}
                  disabled={isCompleting}
                  size="sm"
                  className="h-10 flex-1 cursor-pointer rounded-full bg-emerald-600 px-5 text-xs font-bold hover:bg-emerald-700 md:flex-auto dark:bg-emerald-900 dark:hover:bg-emerald-800"
                >
                  {isCompleting ? 'جاري الإكمال...' : 'إتمام الطلب'}
                </Button>
              )}

              {(isCompleted || isCancelled) && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 flex-1 cursor-pointer rounded-full px-5 text-xs font-bold md:flex-auto"
                  onClick={() => navigate('/app/services')}
                >
                  العودة للرئيسية
                </Button>
              )}
            </div>
          </div>

          {/* ── Status Timeline ── */}
          <div className="bg-card border-border/50 rounded-3xl border p-6 shadow-sm">
            <StatusTimeLine currentStep={requestDetails.requestStatus} />
          </div>

          {/* ── Banner ── */}
          {!isCancelled && (
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-lg">
              {/* Decorative dots */}
              <div className="absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute bottom-0 left-0 -mb-5 -ml-5 h-24 w-24 rounded-full bg-black/10 blur-xl" />

              <div className="relative flex flex-col items-center gap-6 md:flex-row md:items-start">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1 space-y-2 text-center md:text-right">
                  <h2 className="text-2xl font-black">تم إرسال طلبك للحرفى!</h2>
                  <p className="text-base leading-relaxed font-medium text-white/90">
                    طلبك الآن بين يدي مقدم الخدمة المختار. سيتم إشعارك فوراً بأي
                    تحديث أو رسالة من الحرفى. يمكنك متابعة تقدم الطلب خطوة بخطوة
                    من هذه الصفحة.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── Grid Layout for Details & Provider Response ── */}
          <div className="grid grid-cols-1 gap-6 pt-4 lg:grid-cols-3">
            {/* Right Column (Col 1 in RTL) - Request Summary */}
            <div className="space-y-6 lg:col-span-1">
              <RequestDetailsSection requestDetails={requestDetails} />
            </div>

            {/* Left Column (Col 2, 3 in RTL) - Provider Interaction Space */}
            <DirectRequestProviderSection requestDetails={requestDetails} />
          </div>
        </div>
      </div>
      <ReviewDialog
        requestId={requestDetails.id}
        open={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        providerId={requestDetails.providerId}
      />
    </>
  );
};

export default DirectRequestDetailsPage;
