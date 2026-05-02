import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

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

import { LocationSection } from '../components/LocationSection';

import {
  Briefcase,
  User,
  AlignLeft,
  MapPin,
  Loader2,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import ServicesDropdown from '../components/ServicesDropdown';

import { providerProfileSchema } from '../schemas/providerProfile.schema';
import { useUpdateProviderProfile } from '../hooks/useUpdateProviderProfile';
import { useClientProfile } from '@/features/profile/hooks/useClientProfile';
import { toast } from 'sonner';


// ─── Types ────────────────────────────────────────────────────────────────────

type ProviderProfileFormData = z.infer<typeof providerProfileSchema>;

// ─── Main Page ────────────────────────────────────────────────────────────────

const ProviderProfilePage = () => {
  const navigate = useNavigate();
  const { data: profile } = useClientProfile();
  const { mutateAsync: updateProfile, isPending } = useUpdateProviderProfile();

  const governorateId = profile?.governorateId;
  const regionId = profile?.regionId;

  const methods = useForm<ProviderProfileFormData>({
    resolver: zodResolver(providerProfileSchema as any),
    defaultValues: {
      Bio: '',
      Nickname: '',
      BaseLocation: { Latitude: 0, Longitude: 0, AddressText: '' },
      ServiceIds: [],
    } as any,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  // ── Submit handler ──────────────────────────────────────────────────────────

  const onSubmit = async (data: ProviderProfileFormData) => {
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

    try {
      await updateProfile(profileData);
      toast.success('تم حفظ بيانات المهنة بنجاح');
      navigate('/onboarding/verification');
    } catch (err) {
      console.error(err);
      toast.error('حدث خطأ أثناء حفظ البيانات');
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
                <p className="text-muted-foreground text-xs">الخطوة 2 من 4</p>
                <h1 className="text-foreground text-xl font-bold">
                  بيانات المهنة
                </h1>
                <p className="text-muted-foreground text-sm">
                  أضف معلومات مهنتك وحدد الخدمات التي تقدمها ونطاق عملك الجغرافي.
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
                    يمكنك اختيار خدمتين كحد أقصى
                  </FieldDescription>
                </Field>
              </div>

              <Separator />

              {/* Location */}
              <div className="space-y-3">
                <div className="text-md flex items-center gap-2 font-bold">
                  <MapPin size={16} className="text-primary" />
                  الموقع والنطاق الجغرافي
                </div>
                <LocationSection />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 pt-4">
                <Button
                  variant="gradient"
                  type="submit"
                  disabled={isPending}
                  className="h-11 cursor-pointer rounded-lg px-6"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      جاري الحفظ...
                    </>
                  ) : (
                    'التالي: رفع المستندات'
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

export default ProviderProfilePage;
