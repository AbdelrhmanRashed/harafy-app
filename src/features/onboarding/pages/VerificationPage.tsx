import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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

import {
  MapPin,
  FileText,
  Info,
  Briefcase,
  IdCard,
  SquareUser,
  User,
  AlignLeft,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import ServicesDropdown from '../components/ServicesDropdown';

import { verificationSchema } from '../schemas/verification.schema';

type VerificationFormData = z.infer<typeof verificationSchema>;

const VerificationPage = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
  });

  const onSubmit = (data: VerificationFormData) => {
    console.log(data);
  };

  return (
    <div>
      <Card className="rounded-lg shadow-lg">
        <CardContent className="space-y-4 p-4">
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

            {/* Divider */}
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
                    className="text-muted-foreground absolute start-3 top-3 z-10"
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

            {/* Divider */}
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

            {/* Divider */}
            <Separator />

            {/* Location */}
            <div className="space-y-3">
              <div className="text-md flex items-center gap-2 font-bold">
                <MapPin size={16} className="text-primary" />
                الموقع والنطاق الجغرافي
              </div>

              {/* Base Location */}
              <div className="space-y-3">
                <Field data-invalid={!!errors.BaseLocation?.AddressText}>
                  <FieldLabel>العنوان التفصيلي</FieldLabel>
                  <InputGroup className="rounded-lg px-3 py-5">
                    <InputGroupInput
                      {...register('BaseLocation.AddressText')}
                      aria-invalid={!!errors.BaseLocation?.AddressText}
                      placeholder="مثال: شارع الجيش، بجوار مسجد النور"
                    />
                    <InputGroupAddon align="inline-start">
                      <MapPin className="text-muted-foreground" />
                    </InputGroupAddon>
                  </InputGroup>
                  {errors.BaseLocation?.AddressText && (
                    <FieldError>
                      {errors.BaseLocation.AddressText.message}
                    </FieldError>
                  )}
                </Field>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Field data-invalid={!!errors.BaseLocation?.Latitude}>
                    <FieldLabel>خط العرض (Latitude)</FieldLabel>
                    <Input
                      type="number"
                      step="any"
                      {...register('BaseLocation.Latitude')}
                      placeholder="30.0444"
                      className="rounded-lg"
                    />
                    {errors.BaseLocation?.Latitude && (
                      <FieldError>
                        {errors.BaseLocation.Latitude.message}
                      </FieldError>
                    )}
                  </Field>

                  <Field data-invalid={!!errors.BaseLocation?.Longitude}>
                    <FieldLabel>خط الطول (Longitude)</FieldLabel>
                    <Input
                      type="number"
                      step="any"
                      {...register('BaseLocation.Longitude')}
                      placeholder="31.2357"
                      className="rounded-lg"
                    />
                    {errors.BaseLocation?.Longitude && (
                      <FieldError>
                        {errors.BaseLocation.Longitude.message}
                      </FieldError>
                    )}
                  </Field>
                </div>

                <FieldDescription>
                  يمكنك تحديد موقعك على الخريطة لملء الإحداثيات تلقائياً
                </FieldDescription>
              </div>
            </div>

            {/* Divider */}
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
                <Info className="text-primary dark:text-foreground" size={18} />
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
                className="h-11 cursor-pointer rounded-lg px-6"
              >
                إرسال للمراجعة
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationPage;
