import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import FileUploadCard from '../components/FileUploadCard';

import {
  FileText,
  Info,
  IdCard,
  SquareUser,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  type LucideIcon,
} from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn, getImageUrl } from '@/lib/utils';

import { documentationSchema } from '../schemas/documentation.schema';
import { useUploadDocuments } from '../hooks/useUploadDocuments';
import { useGetProviderDocs } from '../hooks/useGetProviderDocs';
import { useUpdateProviderDocs } from '../hooks/useUpdateProviderDocs';
import { toast } from 'sonner';

// ─── Types ────────────────────────────────────────────────────────────────────

type DocumentationFormData = z.infer<typeof documentationSchema>;

interface ProviderDoc {
  id: number;
  documentUrl: string;
  documentType: number; // 1 = personalImage | 2 = nationalId | 3 = criminalRecord
  isApproved: boolean | null;
  providerId: number;
}

// Single source of truth for all doc-slot metadata
const DOC_META: Record<
  number,
  {
    field: keyof DocumentationFormData;
    title: string;
    icon: LucideIcon;
    description: string;
    accept: Record<string, string[]>;
  }
> = {
  1: {
    field: 'personalImage',
    title: 'صورة شخصية',
    icon: SquareUser,
    description: 'PNG, JPG ≤5MB',
    accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] },
  },
  2: {
    field: 'nationalId',
    title: 'صورة البطاقة الشخصية',
    icon: IdCard,
    description: 'PNG, JPG, PDF ≤5MB',
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
    },
  },
  3: {
    field: 'criminalRecord',
    title: 'صحيفة الحالة الجنائية',
    icon: FileText,
    description: 'PNG, JPG, PDF ≤5MB',
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
    },
  },
};

// ─── Per-doc slot (used in update mode) ──────────────────────────────────────

interface DocSlotProps {
  doc: ProviderDoc;
  title: string;
  icon: LucideIcon;
  accept: Record<string, string[]>;
  description: string;
  onFileChange: (file: File | undefined) => void;
  errorMessage?: string;
}

const DocSlot = ({
  doc,
  title,
  icon: Icon,
  accept,
  description,
  onFileChange,
  errorMessage,
}: DocSlotProps) => {
  const [hasNewFile, setHasNewFile] = useState(false);

  const isPdf = doc.documentUrl?.toLowerCase().endsWith('.pdf');
  const existingImgUrl = getImageUrl(doc.documentUrl);

  return (
    <div className="space-y-2">
      {/* Status badge */}
      <div
        className={cn(
          'flex w-fit items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium',
          doc.isApproved === true
            ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
            : doc.isApproved === null
              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400'
              : 'bg-destructive/10 text-destructive',
        )}
      >
        {doc.isApproved === true ? (
          <>
            <CheckCircle2 size={13} />
            مقبول — التحديث اختياري
          </>
        ) : doc.isApproved === null ? (
          <>
            <Clock size={13} />
            قيد المراجعة
          </>
        ) : (
          <>
            <XCircle size={13} />
            مرفوض — يجب إعادة الرفع
          </>
        )}
      </div>

      {/* Existing doc preview — hidden once user picks a new file */}
      {!hasNewFile && existingImgUrl && (
        <div
          className={cn(
            'flex flex-col items-center gap-2 rounded-xl border-2 border-dashed p-4',
            doc.isApproved === true
              ? 'border-green-300 bg-green-50/50 dark:bg-green-950/20'
              : doc.isApproved === null
                ? 'border-yellow-300 bg-yellow-50/50 dark:bg-yellow-950/20'
                : 'border-destructive/40 bg-destructive/5',
          )}
        >
          <p className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
            المستند الحالي
          </p>
          {isPdf ? (
            <div className="bg-primary/10 flex h-20 w-20 items-center justify-center rounded-2xl">
              <FileText className="text-primary h-10 w-10" />
            </div>
          ) : (
            <div className="border-border h-28 w-28 overflow-hidden rounded-lg border shadow-md">
              <img
                src={existingImgUrl}
                alt={title}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      )}

      {/* Upload card for replacement */}
      <FileUploadCard
        title={hasNewFile ? title : `تغيير ${title}`}
        description={description}
        icon={Icon}
        accept={accept}
        onChange={(file) => {
          setHasNewFile(!!file);
          onFileChange(file);
        }}
        errorMessage={!doc.isApproved ? errorMessage : undefined}
      />
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const VerificationPage = () => {
  const { data: existingDocs, isLoading: isLoadingDocs } = useGetProviderDocs();

  const { mutateAsync: uploadDocs, isPending: isUploadingDocs } =
    useUploadDocuments();
  const { mutateAsync: updateDoc, isPending: isUpdatingDocs } =
    useUpdateProviderDocs();

  // Track newly selected files in update-mode (keyed by documentType)
  const [newFiles, setNewFiles] = useState<Record<number, File | undefined>>(
    {},
  );
  // Track validation errors for refused docs
  const [docErrors, setDocErrors] = useState<Record<number, string>>({});

  const isFirstUpload =
    !isLoadingDocs && Array.isArray(existingDocs) && existingDocs.length === 0;
  const hasExistingDocs =
    !isLoadingDocs && Array.isArray(existingDocs) && existingDocs.length > 0;

  const docs = hasExistingDocs ? (existingDocs as ProviderDoc[]) : [];

  const isSubmitting = isUploadingDocs || isUpdatingDocs;

  const methods = useForm<DocumentationFormData>({
    resolver: zodResolver(documentationSchema as any),
    defaultValues: {} as any,
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  // ── Submit handler ──────────────────────────────────────────────────────────

  const onSubmit = async (data: DocumentationFormData) => {
    try {
      if (isFirstUpload) {
        // First time → all 3 docs are required
        if (!data.personalImage || !data.nationalId || !data.criminalRecord) {
          toast.error('يرجى رفع جميع المستندات المطلوبة');
          return;
        }

        const docsToUpload = [
          { file: data.personalImage as File, type: 1 },
          { file: data.nationalId as File, type: 2 },
          { file: data.criminalRecord as File, type: 3 },
        ];
        await uploadDocs(docsToUpload);
      } else {
        // Has existing docs → validate refused ones have a new file
        const errors: Record<number, string> = {};
        docs.forEach((doc) => {
          if (doc.isApproved === false && !newFiles[doc.documentType]) {
            errors[doc.documentType] = 'يجب رفع مستند جديد';
          }
        });

        if (Object.keys(errors).length > 0) {
          setDocErrors(errors);
          toast.error('يرجى رفع المستندات المرفوضة قبل الإرسال');
          return;
        }

        setDocErrors({});

        const docsToUpdate = docs
          .filter((doc) => !!newFiles[doc.documentType])
          .map((doc) => ({ docId: doc.id, file: newFiles[doc.documentType]! }));

        if (docsToUpdate.length > 0) {
          await updateDoc(docsToUpdate);
        }
      }

      toast.success('تم إرسال المستندات بنجاح');
    } catch (err) {
      console.error(err);
      toast.error('حدث خطأ أثناء رفع المستندات');
    }
  };

  return (
    <div>
      <Card className="rounded-lg shadow-lg">
        <CardContent className="space-y-4 p-4">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Header */}
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs">الخطوة 3 من 4</p>
                <h1 className="text-foreground text-xl font-bold">
                  رفع المستندات
                </h1>
                <p className="text-muted-foreground text-sm">
                  يرجى رفع المستندات المطلوبة لإثبات الهوية والمهنة.
                </p>
              </div>

              <Separator />

              {/* Documents */}
              <div className="space-y-3">
                <div className="text-md flex items-center gap-2 font-bold">
                  <FileText size={16} className="text-primary" />
                  المستندات المطلوبة
                </div>

                {isLoadingDocs ? (
                  <div className="text-muted-foreground flex items-center justify-center gap-2 py-8 text-sm">
                    <Loader2 className="animate-spin" size={18} />
                    جاري تحميل المستندات...
                  </div>
                ) : (
                  <>
                    {/* Global status banner for existing docs */}
                    {hasExistingDocs &&
                      docs.some((d) => d.isApproved === false) && (
                        <Alert className="border-destructive/30 bg-destructive/5 rounded-xl border p-4">
                          <AlertDescription className="text-destructive flex items-center gap-2 text-sm">
                            <XCircle size={16} />
                            بعض مستنداتك مرفوضة. يرجى إعادة رفعها ثم اضغط إرسال.
                          </AlertDescription>
                        </Alert>
                      )}
                    {hasExistingDocs &&
                      docs.some((d) => d.isApproved === null) &&
                      !docs.some((d) => d.isApproved === false) && (
                        <Alert className="rounded-xl border border-yellow-300/50 bg-yellow-50 p-4 dark:bg-yellow-900/10">
                          <AlertDescription className="flex items-center gap-2 text-sm text-yellow-700 dark:text-yellow-500">
                            <Clock size={16} />
                            بعض مستنداتك لا تزال قيد المراجعة.
                          </AlertDescription>
                        </Alert>
                      )}
                    {hasExistingDocs &&
                      docs.every((d) => d.isApproved === true) && (
                        <Alert className="rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30">
                          <AlertDescription className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
                            <CheckCircle2 size={16} />
                            جميع مستنداتك مقبولة. يمكنك تحديثها إذا أردت.
                          </AlertDescription>
                        </Alert>
                      )}

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {/* ── Update mode: show status per doc slot ── */}
                      {hasExistingDocs &&
                        docs.map((doc) => {
                          const meta = DOC_META[doc.documentType];
                          if (!meta) return null;

                          return (
                            <DocSlot
                              key={doc.id}
                              doc={doc}
                              title={meta.title}
                              icon={meta.icon}
                              accept={meta.accept}
                              description={meta.description}
                              onFileChange={(file) =>
                                setNewFiles((prev) => ({
                                  ...prev,
                                  [doc.documentType]: file,
                                }))
                              }
                              errorMessage={docErrors[doc.documentType]}
                            />
                          );
                        })}

                      {/* ── First-time upload: driven by DOC_META ── */}
                      {isFirstUpload &&
                        Object.entries(DOC_META).map(([type, meta]) => {
                          const field = meta.field;
                          const err = errors[field];
                          return (
                            <FileUploadCard
                              key={type}
                              title={meta.title}
                              description={meta.description}
                              icon={meta.icon}
                              accept={meta.accept}
                              onChange={(file) =>
                                setValue(field, file, {
                                  shouldValidate: true,
                                  shouldDirty: true,
                                })
                              }
                              errorMessage={
                                typeof err?.message === 'string'
                                  ? err.message
                                  : undefined
                              }
                            />
                          );
                        })}
                    </div>
                  </>
                )}
              </div>

              {/* Info Box */}
              <Alert className="bg-primary/10 dark:bg-primary/20 rounded-xl border-none p-4 text-sm">
                <AlertDescription className="flex items-center gap-1 text-sm">
                  <Info
                    className="text-primary dark:text-foreground"
                    size={18}
                  />
                  <p className="text-primary dark:text-foreground">
                    سيتم مراجعة طلبك من قبل إدارة منصة حِرَفِيّ والتأكد من صحة
                    البيانات قبل تفعيل حسابك، تستغرق هذه العملية عادة 24 ساعة.
                  </p>
                </AlertDescription>
              </Alert>

              {/* Single submit button — always visible */}
              <div className="flex items-center justify-end gap-4 pt-4">
                <Button
                  variant="gradient"
                  type="submit"
                  disabled={isSubmitting || isLoadingDocs}
                  className="h-11 cursor-pointer rounded-lg px-6"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      جاري الإرسال...
                    </>
                  ) : (
                    'إرسال للمراجعة'
                  )}
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationPage;
