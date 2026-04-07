import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form'; // ← add FormProvider

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';

import FileUploadCard from '../components/FileUploadCard';
import { LocationSection } from '../components/Locationsection';

import {
  FileText,
  Info,
  Briefcase,
  IdCard,
  SquareUser,
  User,
  AlignLeft,
  MapPin,
  Loader2,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import ServicesDropdown from '../components/ServicesDropdown';

import { verificationSchema } from '../schemas/verification.schema';

import { useUpdateProviderProfile } from '../hooks/useUpdateProviderProfile';
import { useUploadDocuments } from '../hooks/useUploadDocuments';
import { useClientProfile } from '@/features/profile/hooks/useClientProfile';

type VerificationFormData = z.infer<typeof verificationSchema>;

const VerificationPage = () => {
  const { data: profile } = useClientProfile();

  const { mutateAsync: updateProfile, isPending: isUpdatingProfile } =
    useUpdateProviderProfile();
  const { mutateAsync: uploadDocs, isPending: isUploadingDocs } =
    useUploadDocuments();
  const governorateId = profile?.governorateId;
  const regionId = profile?.regionId;

  const isSubmitting = isUpdatingProfile || isUploadingDocs;
  const methods = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema as any),
    defaultValues: {
      Bio: '',
      Nickname: '',
      BaseLocation: {
        Latitude: 0,
        Longitude: 0,
        AddressText: '',
      },
      GovernorateId: 0,
      RegionId: 0,
      ServiceIds: [],
    } as any,
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: VerificationFormData) => {
    const profileData = {
      Bio: data.Bio || '',
      Nickname: data.Nickname || '',
      GovernorateId: governorateId,
      RegionId: regionId,

      BaseLocation: {
        Latitude: data.BaseLocation.Latitude,
        Longitude: data.BaseLocation.Longitude,
        AddressText: data.BaseLocation.AddressText,
      },

      ServiceIds: data.ServiceIds,
    };
    console.log(data);
    try {
      // 1) profile

      await updateProfile(profileData);

      // 2) docs
      const docs = [
        { file: data.personalImage, type: 1 },
        { file: data.nationalId, type: 2 },
        { file: data.criminalRecord, type: 3 },
      ];

      await uploadDocs(docs);

      console.log('DONE');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Card className="rounded-lg shadow-lg">
        <CardContent className="space-y-4 p-4">
          {/* ── wrap the whole form with FormProvider so LocationSection
               can call useFormContext() internally ── */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Header */}
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs">الخطوة 2 من 3</p>
                <h1 className="text-foreground text-xl font-bold">
                  إكمال بيانات الحرفي
                </h1>
                <p className="text-muted-foreground text-sm">
                  يرجى رفع المستندات المطلوبة لإثبات المهنة والهوية وتحديد نطاق
                  عملك.
                </p>
              </div>

              <Separator />

              {/* Profile Info */}
              <div className="space-y-3">
                <div className="text-md flex items-center gap-2 font-bold">
                  <User size={16} className="text-primary" />
                  المعلومات الشخصية
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Field data-invalid={!!errors.Nickname}>
                    <FieldLabel>الاسم المستعار (اختياري)</FieldLabel>
                    <InputGroup className="rounded-lg px-3 py-5">
                      <InputGroupInput
                        {...register('Nickname')}
                        placeholder="مثال: أبو محمد النجار"
                      />
                      <InputGroupAddon align="inline-start">
                        <User className="text-muted-foreground" />
                      </InputGroupAddon>
                    </InputGroup>
                    {errors.Nickname && (
                      <FieldError>{errors.Nickname.message}</FieldError>
                    )}
                  </Field>
                </div>

                <Field data-invalid={!!errors.Bio}>
                  <FieldLabel>نبذة تعريفية (اختياري)</FieldLabel>
                  <div className="relative">
                    <AlignLeft
                      size={16}
                      className="text-muted-foreground absolute inset-s-3 top-3 z-10"
                    />
                    <Textarea
                      {...register('Bio')}
                      placeholder="اكتب نبذة مختصرة عن خبرتك وأعمالك..."
                      className="min-h-[80px] resize-none rounded-lg ps-9"
                    />
                  </div>
                  {errors.Bio && <FieldError>{errors.Bio.message}</FieldError>}
                </Field>
              </div>

              <Separator />

              {/* Service Details */}
              <div className="space-y-3">
                <div className="text-md flex items-center gap-2 font-bold">
                  <Briefcase size={16} className="text-primary" />
                  تفاصيل الخدمة
                </div>
                <Field
                  className="font-semibold"
                  data-invalid={!!errors.ServiceIds}
                >
                  <FieldLabel>اختر الخدمات التي تقدمها</FieldLabel>
                  <ServicesDropdown
                    control={control}
                    errors={errors}
                    name="ServiceIds"
                    multiple
                  />
                  {errors.ServiceIds && (
                    <FieldError>
                      {Array.isArray(errors.ServiceIds)
                        ? errors.ServiceIds[0]?.message
                        : (errors.ServiceIds as { message?: string })?.message}
                    </FieldError>
                  )}
                  <FieldDescription>
                    يمكنك اختيار أكثر من خدمة واحدة
                  </FieldDescription>
                </Field>
              </div>

              <Separator />

              {/* ── Location (now uses the smart LocationSection) ── */}
              <div className="space-y-3">
                <div className="text-md flex items-center gap-2 font-bold">
                  <MapPin size={16} className="text-primary" />
                  الموقع والنطاق الجغرافي
                </div>
                <LocationSection />
              </div>

              <Separator />

              {/* Documents */}
              <div className="space-y-3">
                <div className="text-md flex items-center gap-2 font-bold">
                  <FileText size={16} className="text-primary" />
                  المستندات المطلوبة
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <FileUploadCard
                    title="صورة شخصية"
                    description="PNG, JPG ≤5MB"
                    icon={SquareUser}
                    accept={{
                      'image/png': ['.png'],
                      'image/jpeg': ['.jpg', '.jpeg'],
                    }}
                    onChange={(file) =>
                      setValue('personalImage', file, {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                    }
                    errorMessage={
                      typeof errors.personalImage?.message === 'string'
                        ? errors.personalImage.message
                        : undefined
                    }
                  />
                  <FileUploadCard
                    title="صورة البطاقة الشخصية"
                    description="PNG, JPG, PDF ≤5MB"
                    icon={IdCard}
                    accept={{
                      'image/png': ['.png'],
                      'image/jpeg': ['.jpg', '.jpeg'],
                      'application/pdf': ['.pdf'],
                    }}
                    onChange={(file) =>
                      setValue('nationalId', file, {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                    }
                    errorMessage={
                      typeof errors.nationalId?.message === 'string'
                        ? errors.nationalId.message
                        : undefined
                    }
                  />
                  <FileUploadCard
                    title="صحيفة الحالة الجنائية"
                    description="PNG, JPG, PDF ≤5MB"
                    icon={FileText}
                    accept={{
                      'image/png': ['.png'],
                      'image/jpeg': ['.jpg', '.jpeg'],
                      'application/pdf': ['.pdf'],
                    }}
                    onChange={(file) =>
                      setValue('criminalRecord', file, {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                    }
                    errorMessage={errors.criminalRecord?.message as string}
                  />
                </div>
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

              {/* Submit */}
              <div className="flex items-center justify-end gap-4 pt-4">
                <Button
                  variant="outline"
                  className="h-11 cursor-pointer rounded-lg px-6"
                >
                  حفظ كمسودة
                </Button>
                <Button
                  variant="gradient"
                  type="submit"
                  disabled={isSubmitting}
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
