// pages/ProviderDetailsPage.tsx

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProviderDetails } from '../hooks/useProviderDetails';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useValidateDocument } from '../hooks/useValidateDocument';
import { useVerifyProvider } from '../hooks/useVerifyProvider';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  CheckCircle,
  XCircle,
  Clock,
  ShieldCheck,
  FileText,
  User,
  ChevronRight,
  AlertCircle,
  Loader2,
  ZoomIn,
  ExternalLink,
} from 'lucide-react';
import { getImageUrl } from '@/lib/utils';

const DOCUMENT_TYPES: Record<number, string> = {
  1: 'الصورة الشخصية',
  2: 'البطاقة الشخصية',
  3: 'الفيش الجنائي',
};

const getStatusConfig = (
  isApproved: boolean | null | undefined,
  isRejectedLocally: boolean,
) => {
  if (isRejectedLocally) {
    return {
      label: 'مرفوض',
      color: 'text-red-700 bg-red-50 border-red-200',
      icon: <XCircle className="h-4 w-4 text-red-600" />,
    };
  }
  if (isApproved === true) {
    return {
      label: 'مقبول',
      color: 'text-green-700 bg-green-50 border-green-200',
      icon: <CheckCircle className="h-4 w-4 text-green-600" />,
    };
  }
  return {
    label: 'قيد المراجعة',
    color: 'text-yellow-700 bg-yellow-50 border-yellow-200',
    icon: <Clock className="h-4 w-4 text-yellow-600" />,
  };
};

const ProviderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [processingAction, setProcessingAction] = useState<{
    id: number;
    action: 'accept' | 'reject';
  } | null>(null);

  const [rejectedDocIds, setRejectedDocIds] = useState<Set<number>>(new Set());

  const { data, isLoading, isError, error } = useProviderDetails(id!);

  const { mutate: validateDoc, isPending } = useValidateDocument();
  const { mutate: verifyProvider, isPending: verifying } = useVerifyProvider();

  if (isLoading) {
    return (
      <div className="container mx-auto space-y-8 px-4 py-8" dir="rtl">
        {/* ================= Header Skeleton ================= */}
        <div className="bg-card flex flex-col items-start justify-between gap-4 rounded-xl border p-6 shadow-sm md:flex-row md:items-center">
          <div className="flex w-full items-center gap-4 md:w-auto">
            <Skeleton className="hidden h-10 w-10 shrink-0 rounded-full md:block" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
          <Skeleton className="h-12 w-full rounded-lg md:w-[180px]" />
        </div>

        {/* ================= Profile Overview Skeleton ================= */}
        <Card className="border-t-primary overflow-hidden border-t-4 shadow-md">
          <CardContent className="p-0">
            <div className="flex flex-col items-center gap-6 p-6 sm:flex-row">
              <Skeleton className="h-24 w-24 shrink-0 rounded-full" />

              <div className="flex w-full flex-1 flex-col items-center space-y-3 sm:items-start">
                <Skeleton className="h-8 w-40" />
                <Skeleton className="h-5 w-32" />

                <div className="mt-2 flex flex-wrap justify-center gap-3 sm:justify-start">
                  <Skeleton className="h-8 w-28 rounded-md" />
                  <Skeleton className="h-8 w-36 rounded-md" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ================= Documents Grid Skeleton ================= */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-7 w-40" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="flex flex-col overflow-hidden border-2 border-gray-100/50"
              >
                <CardHeader className="bg-muted/30 border-b pb-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col p-0">
                  <Skeleton className="h-[260px] w-full rounded-none" />

                  <div className="bg-background mt-auto flex items-center justify-end gap-3 border-t p-4">
                    <Skeleton className="h-10 flex-1 rounded-md sm:w-[100px] sm:flex-none" />
                    <Skeleton className="h-10 flex-1 rounded-md sm:w-[100px] sm:flex-none" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-12" dir="rtl">
        <div className="flex items-start gap-4 rounded-xl border border-red-200 bg-red-50 p-6 text-red-800">
          <AlertCircle className="mt-0.5 h-6 w-6 flex-shrink-0" />
          <div>
            <h3 className="mb-1 text-lg font-bold">
              حدث خطأ أثناء تحميل البيانات
            </h3>
            <p className="text-red-600/90">{error?.message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { profile, documents }: { profile: any; documents: any } = data;
  const docs: any[] = documents || [];

  const hasInvalid = rejectedDocIds.size > 0;
  const allValid =
    docs.length > 0 &&
    docs.every(
      (doc: any) => doc.isApproved === true && !rejectedDocIds.has(doc.id),
    );
  const pendingCount = docs.filter(
    (doc: any) => doc.isApproved !== true && !rejectedDocIds.has(doc.id),
  ).length;

  // ================= validate handler =================
  const handleValidate = (docId: number, isValid: boolean) => {
    setProcessingAction({ id: docId, action: isValid ? 'accept' : 'reject' });
    validateDoc(
      { id: docId, isValid },
      {
        onSuccess: () => {
          if (isValid) {
            toast.success('تم قبول المستند بنجاح');
            setRejectedDocIds((prev) => {
              const newSet = new Set(prev);
              newSet.delete(docId);
              return newSet;
            });
          } else {
            toast.success('تم رفض المستند');
            setRejectedDocIds((prev) => {
              const newSet = new Set(prev);
              newSet.add(docId);
              return newSet;
            });
          }
          queryClient.invalidateQueries({
            queryKey: ['provider-details', id],
          });
          queryClient.invalidateQueries({
            queryKey: ['under-review-providers'],
          });
        },
        onError: () => {
          toast.error('حدث خطأ أثناء تحديث حالة المستند');
        },
        onSettled: () => {
          setProcessingAction(null);
        },
      },
    );
  };

  // ================= verify =================
  const handleVerify = () => {
    if (hasInvalid) {
      toast.error('لا يمكن توثيق الحساب لوجود مستندات مرفوضة');
      return;
    }
    if (!allValid) {
      toast.error('يجب مراجعة وقبول جميع المستندات أولاً');
      return;
    }

    verifyProvider(
      { id: id!, isVerified: true },
      {
        onSuccess: () => {
          toast.success('تم توثيق الحساب بنجاح!');
          navigate('/admin/craftsmen'); // Return to list after successful verification
        },
        onError: () => {
          toast.error('حدث خطأ أثناء توثيق الحساب');
        },
      },
    );
  };

  return (
    <div className="container mx-auto space-y-8 px-4 py-8" dir="rtl">
      {/* ================= Header ================= */}
      <div className="bg-card flex flex-col items-start justify-between gap-4 rounded-xl border p-6 shadow-sm md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
            className="hidden h-10 w-10 shrink-0 rounded-full md:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-foreground text-2xl font-bold tracking-tight">
              مراجعة بيانات الحرفي
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              قم بمراجعة المستندات وتأكيد توثيق الحساب
            </p>
          </div>
        </div>

        <Button
          size="lg"
          className="w-full gap-2 text-base font-semibold shadow-md transition-all md:w-auto"
          disabled={!allValid || verifying}
          onClick={handleVerify}
        >
          {verifying ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <ShieldCheck className="h-5 w-5" />
          )}
          {verifying ? 'جاري التوثيق...' : 'تأكيد وتوثيق الحساب'}
        </Button>
      </div>

      {/* ================= Profile Overview ================= */}
      <Card className="border-t-primary overflow-hidden border-t-4 shadow-md">
        <CardContent className="p-0">
          <div className="from-primary/5 flex flex-col items-center gap-6 bg-gradient-to-r to-transparent p-6 sm:flex-row">
            <div className="relative shrink-0">
              <Avatar className="border-background h-24 w-24 border-4 shadow-md">
                <AvatarImage
                  src={getImageUrl(profile?.pictureUrl)}
                  alt={profile?.name}
                />
                <AvatarFallback className="bg-muted text-muted-foreground text-2xl font-bold">
                  {profile?.name
                    ?.split(' ')
                    ?.map((n: string) => n.charAt(0))
                    ?.join('') || <User className="h-10 w-10" />}
                </AvatarFallback>
              </Avatar>
              {allValid && (
                <div className="absolute -right-1 -bottom-1 rounded-full border-2 border-white bg-green-500 p-1 text-white shadow-sm">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              )}
            </div>

            <div className="flex-1 text-center sm:text-right">
              <h2 className="text-foreground text-2xl font-bold">
                {profile?.name}
              </h2>
              <p className="text-muted-foreground mb-2 text-lg">
                {profile?.nickname}
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                <div className="bg-background flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium">
                  <FileText className="text-muted-foreground h-4 w-4" />
                  <span>{docs.length} مستندات</span>
                </div>
                {pendingCount > 0 && (
                  <div className="flex items-center gap-1.5 rounded-md border border-yellow-200 bg-yellow-50 px-3 py-1.5 text-sm font-medium text-yellow-700 shadow-sm">
                    <Clock className="h-4 w-4" />
                    <span>{pendingCount} قيد المراجعة</span>
                  </div>
                )}
                {hasInvalid && (
                  <div className="flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 shadow-sm">
                    <XCircle className="h-4 w-4" />
                    <span>يوجد مستندات مرفوضة</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================= Documents Grid ================= */}
      <div className="space-y-4">
        <h3 className="text-foreground flex items-center gap-2 px-1 text-xl font-bold">
          <FileText className="text-primary h-5 w-5" />
          المستندات المرفقة
        </h3>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {docs.map((doc) => {
            const isRejectedLocally = rejectedDocIds.has(doc.id);
            const status = getStatusConfig(doc.isApproved, isRejectedLocally);
            const isAccepting =
              processingAction?.id === doc.id &&
              processingAction?.action === 'accept';
            const isRejecting =
              processingAction?.id === doc.id &&
              processingAction?.action === 'reject';

            return (
              <Card
                key={doc.id}
                className={`flex flex-col overflow-hidden border-2 transition-all duration-300 hover:shadow-lg ${
                  doc.isApproved === true && !isRejectedLocally
                    ? 'border-green-200 shadow-green-100/40'
                    : isRejectedLocally
                      ? 'border-red-200 shadow-red-100/40'
                      : 'border-gray-200'
                }`}
              >
                <CardHeader className="bg-muted/30 border-b pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-base font-semibold">
                      <FileText className="text-muted-foreground h-4 w-4" />
                      {DOCUMENT_TYPES[doc.documentType] || 'مستند'}
                    </CardTitle>
                    <div
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold shadow-sm ${status.color}`}
                    >
                      {status.icon}
                      {status.label}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col p-0">
                  {/* Image Container */}
                  <div className="group bg-muted/10 relative flex min-h-[240px] flex-1 justify-center border-b">
                    <img
                      src={getImageUrl(doc.documentUrl)}
                      className="h-[260px] w-full object-contain"
                      alt={DOCUMENT_TYPES[doc.documentType] || 'مستند'}
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="translate-y-4 transform font-medium shadow-lg transition-transform delay-75 duration-300 group-hover:translate-y-0"
                          >
                            <ZoomIn className="ml-2 h-4 w-4" />
                            تكبير
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="flex h-[90vh] max-w-4xl flex-col justify-center border-white/10 bg-black/95 p-1 shadow-2xl">
                          <DialogTitle className="sr-only">
                            صورة المستند
                          </DialogTitle>
                          <img
                            src={getImageUrl(doc.documentUrl)}
                            className="h-full w-full object-contain"
                            alt={DOCUMENT_TYPES[doc.documentType] || 'مستند'}
                          />
                        </DialogContent>
                      </Dialog>

                      <a
                        href={getImageUrl(doc.documentUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="translate-y-4 transform transition-transform delay-150 duration-300 group-hover:translate-y-0"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/20 bg-white/10 text-white shadow-lg hover:bg-white/20"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="bg-background mt-auto flex flex-wrap items-center justify-end gap-3 p-4">
                    <Button
                      type="button"
                      size="default"
                      className={`flex-1 gap-2 transition-all sm:flex-none ${
                        doc.isApproved === true && !isRejectedLocally
                          ? 'bg-green-600 text-white shadow-md ring-2 ring-green-600/50 ring-offset-2 hover:bg-green-700'
                          : 'hover:border-green-200 hover:bg-green-50 hover:text-green-700'
                      }`}
                      variant={
                        doc.isApproved === true && !isRejectedLocally
                          ? 'default'
                          : 'outline'
                      }
                      disabled={isPending || isRejectedLocally}
                      onClick={() =>
                        doc.isApproved !== true && handleValidate(doc.id, true)
                      }
                    >
                      {isAccepting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle className="h-4 w-4" />
                      )}
                      {doc.isApproved === true && !isRejectedLocally
                        ? 'تم القبول'
                        : 'قبول'}
                    </Button>

                    <Button
                      type="button"
                      size="default"
                      className={`flex-1 gap-2 transition-all sm:flex-none ${
                        isRejectedLocally
                          ? 'bg-red-600 text-white shadow-md ring-2 ring-red-600/50 ring-offset-2 hover:bg-red-700'
                          : 'hover:border-red-200 hover:bg-red-50 hover:text-red-700'
                      }`}
                      variant={isRejectedLocally ? 'default' : 'outline'}
                      disabled={isPending || isRejectedLocally}
                      onClick={() =>
                        !isRejectedLocally && handleValidate(doc.id, false)
                      }
                    >
                      {isRejecting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <XCircle className="h-4 w-4" />
                      )}
                      {isRejectedLocally ? 'تم الرفض' : 'رفض'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {docs.length === 0 && (
          <div className="bg-muted/30 flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-16 text-center">
            <div className="bg-muted mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <FileText className="text-muted-foreground h-8 w-8 opacity-50" />
            </div>
            <h3 className="text-foreground mb-2 text-xl font-bold">
              لا توجد مستندات
            </h3>
            <p className="text-muted-foreground max-w-sm">
              لم يقم هذا الحرفي برفع أي مستندات بعد. لا يمكنك توثيق الحساب حتى
              يتم رفع المستندات المطلوبة.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderDetailsPage;
