// pages/ProviderDetailsPage.tsx

import { useParams } from 'react-router-dom';
import { useProviderDetails } from '../hooks/useProviderDetails';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useValidateDocument } from '../hooks/useValidateDocument';
import { useVerifyProvider } from '../hooks/useVerifyProvider';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const DOCUMENT_TYPES: Record<number, string> = {
  0: 'الصورة الشخصية',
  1: 'البطاقة الشخصية',
  2: 'الفيش الجنائي',
};

const BASE_URL = 'https://iti-final-project.runasp.net/';

const ProviderDetailsPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useProviderDetails(id!);

  const { mutate: validateDoc, isPending } = useValidateDocument();

  const { mutate: verifyProvider, isPending: verifying } = useVerifyProvider();

  if (isLoading) return <p>Loading...</p>;

  if (isError) {
    return <p className="text-red-500">حصل خطأ: {error?.message}</p>;
  }

  const { profile, documents }: { profile: any; documents: any } = data;

  const docs = documents || [];

  const hasInvalid = docs.some((doc) => doc.isApproved === false);
  const allValid =
    docs.length > 0 && docs.every((doc) => doc.isApproved === true);

  // ================= validate handler =================
  const handleValidate = (docId: number, isValid: boolean) => {
    validateDoc(
      { id: docId, isValid },
      {
        onSuccess: () => {
          toast.success('تم تحديث المستند');
          queryClient.invalidateQueries({
            queryKey: ['provider-details', id],
          });
        },
        onError: () => {
          toast.error('حصل خطأ');
        },
      },
    );
  };

  // ================= verify =================
  const handleVerify = () => {
    if (hasInvalid) {
      toast.error('لا يمكن التحقق بسبب وجود مستند مرفوض');
      return;
    }

    verifyProvider(
      { id: id!, isVerified: true },
      {
        onSuccess: () => {
          toast.success('تم توثيق الحرفي');
        },
        onError: () => {
          toast.error('حصل خطأ أثناء التوثيق');
        },
      },
    );
  };

  return (
    <div className="container mx-auto space-y-6 py-8">
      {/* ================= Profile ================= */}
      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <img
            src={BASE_URL + profile.pictureUrl}
            className="h-16 w-16 rounded-full object-cover"
          />

          <div>
            <h2 className="text-xl font-bold">{profile.name}</h2>
            <p className="text-muted-foreground">{profile.nickname}</p>
          </div>
        </CardContent>
      </Card>

      {/* ================= Documents ================= */}
      <div className="grid gap-4 md:grid-cols-2">
        {docs.map((doc) => (
          <Card key={doc.id}>
            <CardHeader>
              <CardTitle className="text-base">
                {DOCUMENT_TYPES[doc.documentType]}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* image */}
              <img
                src={BASE_URL + doc.documentUrl}
                className="h-40 w-full rounded-md border object-cover"
              />

              {/* status */}
              <p
                className={`text-sm font-medium ${
                  doc.isApproved ? 'text-green-600' : 'text-yellow-600'
                }`}
              >
                {doc.isApproved ? 'مقبول' : 'قيد المراجعة'}
              </p>

              {/* actions */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  disabled={doc.isApproved || isPending}
                  onClick={() => handleValidate(doc.id, true)}
                >
                  قبول
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  disabled={isPending}
                  onClick={() => handleValidate(doc.id, false)}
                >
                  رفض
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ================= Verify ================= */}
      <Button
        className="w-full"
        disabled={!allValid || hasInvalid || verifying}
        onClick={handleVerify}
      >
        توثيق الحرفي
      </Button>
    </div>
  );
};

export default ProviderDetailsPage;
