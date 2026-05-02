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
  Phone,
  MapPin,
  Wrench,
} from 'lucide-react';
import { getImageUrl } from '@/lib/utils';
import CraftsmenDetailsSkeleton from '../components/craftsmenDetailsSkeleton';

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
      color:
        'text-red-700 bg-red-50 border-red-200 dark:border-red-900/40 dark:bg-red-900/40',
      icon: <XCircle className="h-4 w-4 text-red-600" />,
    };
  }
  if (isApproved === true) {
    return {
      label: 'مقبول',
      color:
        'text-green-700 bg-green-50 border-green-200 dark:border-green-900/40 dark:bg-green-900/40',
      icon: <CheckCircle className="h-4 w-4 text-green-600" />,
    };
  }
  return {
    label: 'قيد المراجعة',
    color:
      'text-yellow-700 bg-yellow-50 border-yellow-200 dark:border-yellow-900/40 dark:bg-yellow-900/40',
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

  console.log('provider', data);
  const { mutate: validateDoc, isPending } = useValidateDocument();
  const { mutate: verifyProvider, isPending: verifying } = useVerifyProvider();

  if (isLoading) {
    return <CraftsmenDetailsSkeleton />;
  }

  if (isError) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-12" dir="rtl">
        <div className="flex items-start gap-4 rounded-xl border border-red-200 bg-red-50 p-6 text-red-800">
          <AlertCircle className="mt-0.5 h-6 w-6 shrink-0" />
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
            className="hidden h-10 w-10 shrink-0 cursor-pointer rounded-full md:flex"
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
          variant="gradient"
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
          <div className="from-primary/5 flex flex-col items-center gap-6 to-transparent p-6 sm:flex-row">
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
                  <div className="flex items-center gap-1.5 rounded-md border border-yellow-200 bg-yellow-50 px-3 py-1.5 text-sm font-medium text-yellow-700 shadow-sm dark:border-yellow-900/40 dark:bg-yellow-900/40">
                    <Clock className="h-4 w-4" />
                    <span>{pendingCount} قيد المراجعة</span>
                  </div>
                )}
                {hasInvalid && (
                  <div className="flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 shadow-sm dark:border-red-900/40 dark:bg-red-900/40">
                    <XCircle className="h-4 w-4" />
                    <span>يوجد مستندات مرفوضة</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================= Craftsman Details ================= */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Contact Information */}
        <Card className="border-border/60 shadow-md transition-shadow hover:shadow-lg">
          <CardHeader className="border-b pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-bold">
              <User className="text-primary h-5 w-5" />
              المعلومات الشخصية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="group flex items-start gap-4">
              <div className="bg-primary/10 group-hover:bg-primary/20 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-sm transition-colors">
                <Phone className="text-primary h-5 w-5" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-muted-foreground text-sm font-medium">
                  أرقام الهاتف
                </p>
                <div className="mt-2 flex flex-wrap gap-2" dir="ltr">
                  {profile?.phoneNumbers && profile.phoneNumbers.length > 0 ? (
                    profile.phoneNumbers.map((phone: string, index: number) => (
                      <span
                        key={index}
                        className="bg-muted text-foreground border-border/50 rounded-md border px-3 py-1 text-sm font-bold tracking-widest shadow-sm"
                      >
                        {phone}
                      </span>
                    ))
                  ) : (
                    <span className="text-foreground text-base font-semibold">
                      لا يوجد
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="group flex items-start gap-4">
              <div className="bg-primary/10 group-hover:bg-primary/20 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-sm transition-colors">
                <MapPin className="text-primary h-5 w-5" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-muted-foreground text-sm font-medium">
                  العنوان
                </p>
                <p className="text-foreground mt-0.5 text-base leading-snug font-semibold">
                  {profile?.baseLocation?.addressText || 'لا يوجد'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Specialty & Bio */}
        <Card className="border-border/60 shadow-md transition-shadow hover:shadow-lg">
          <CardHeader className="border-b pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-bold">
              <Wrench className="text-primary h-5 w-5" />
              التخصص والنبذة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {/* Services Tags */}
            <div>
              <p className="text-muted-foreground mb-3 text-sm font-medium">
                الخدمات المقدمة
              </p>
              <div className="flex flex-wrap gap-2.5">
                {profile?.services && profile.services.length > 0 ? (
                  profile.services.map((service: any) => (
                    <div
                      key={service.id}
                      className="bg-primary text-primary-foreground flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold shadow-sm transition-transform hover:scale-105"
                    >
                      <CheckCircle className="h-4 w-4 opacity-80" />
                      {service.name}
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">
                    لا توجد خدمات محددة
                  </p>
                )}
              </div>
            </div>

            {/* Bio Box */}
            <div className="bg-muted/40 relative rounded-2xl border p-4">
              <p className="text-muted-foreground text-sm font-medium">
                نبذة شخصية
              </p>
              <p className="text-foreground mt-2 text-sm leading-relaxed font-medium">
                {profile?.bio || 'لا يوجد نبذة شخصية مسجلة لهذا الحرفي.'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

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
                className={`flex flex-col overflow-hidden border-2 p-0 transition-all duration-300 hover:shadow-lg ${
                  doc.isApproved === true && !isRejectedLocally
                    ? 'border-green-200 shadow-green-100/40 dark:border-green-900/40 dark:shadow-green-900/40'
                    : isRejectedLocally
                      ? 'border-red-200 shadow-red-100/40'
                      : 'border-gray-200'
                }`}
              >
                <CardHeader className="bg-muted/30 border-b py-6">
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
                      className={`flex-1 cursor-pointer gap-2 transition-all sm:flex-none ${
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
                      className={`flex-1 cursor-pointer gap-2 transition-all sm:flex-none ${
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
