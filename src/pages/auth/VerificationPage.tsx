import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

import { registerSchema } from '@/schemas/registerSchema';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Progress } from '@/components/ui/progress';

import FileUploadCard from '@/components/register/FileUploadCard';

import {
  MapPin,
  FileText,
  Info,
  Map,
  Briefcase,
  IdCard,
  SquareUser,
  Check,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

type VerificationFormData = z.infer<typeof registerSchema>;

const RegistrationStatusCard = () => {
  return (
    <Card className="rounded-lg p-6 md:flex-1 lg:flex-none">
      <Field className="w-full max-w-sm">
        <FieldLabel
          htmlFor="progress-upload"
          className="flex items-center justify-between"
        >
          <span className="text-md font-bold"> حالة التسجيل</span>
          <span className="text-md text-primary font-medium">50%</span>
        </FieldLabel>
        <Progress value={50} id="progress-upload" className="rtl:rotate-180" />
      </Field>
      {/* Steps */}
      <div className="mt-1 space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <Badge
            variant="default"
            className="relative size-5 rounded-full bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
          >
            <Check size={16} className="absolute" />
          </Badge>
          <span className="text-muted-foreground font-medium line-through">
            المعلومات الشخصية
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant="default"
            className="bg-primary text-primary-foreground size-5 rounded-full"
          >
            2
          </Badge>
          <span className="text-primary font-medium">بيانات المهنة</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="size-5 rounded-full">
            3
          </Badge>
          <span className="text-muted-foreground font-medium">
            المراجعة والاعتماد
          </span>
        </div>
      </div>
    </Card>
  );
};

const InfoCard = () => {
  return (
    <Card className="rounded-lg bg-blue-50 p-5 text-blue-700 md:flex-1 lg:flex-none dark:bg-blue-950/30 dark:text-blue-400">
      <div className="space-y-3 text-right">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5" />
          <p className="text-md font-semibold">لماذا نطلب هذه الوثائق؟</p>
        </div>
        <p className="text-sm leading-6">
          لضمان جودة الخدمات وسلامة العملاء، نقوم بالتحقق من هوية ومؤهلات كل
          حرفي ينضم إلى منصتنا.
        </p>
      </div>
    </Card>
  );
};

const VerificationPage = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<VerificationFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: VerificationFormData) => {
    console.log(data);
  };

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-6 py-10 lg:grid-cols-3">
      {/* RIGHT */}
      <div className="col-span-2 flex flex-col gap-4 md:flex-row md:items-stretch lg:col-span-1 lg:flex-col">
        {/* Registration Status */}
        <RegistrationStatusCard />
        {/* Info Card */}
        <InfoCard />
      </div>

      {/* LEFT */}
      <div>
        <Card className="rounded-lg shadow-lg lg:w-200">
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
                  عملك .
                </p>
              </div>

              {/* Divider */}
              <Separator />

              {/* Service Details */}
              <div className="space-y-3">
                <div className="text-md flex items-center gap-2 font-bold">
                  <Briefcase size={16} className="text-primary" />
                  تفاصيل الخدمة
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Field
                    className="font-semibold"
                    data-invalid={!!errors.mainJob}
                  >
                    <FieldLabel className="">اختر الحرفة الأساسية</FieldLabel>
                    <Controller
                      name="mainJob"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select
                          dir="rtl"
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            aria-invalid={!!errors.mainJob}
                            className="py-5"
                          >
                            <SelectValue placeholder="-- اختر الحرفة --" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <p className="text-muted-foreground px-2 py-1 text-xs">
                                خدمات إنشائية وصيانة منزلية
                              </p>
                              <SelectItem value="blacksmith">حداد</SelectItem>
                              <SelectItem value="carpenter">نجار</SelectItem>
                              <SelectItem value="plumber">سباك</SelectItem>
                              <SelectItem value="electrician">
                                كهربائي
                              </SelectItem>
                              <SelectItem value="builder">عامل بناء</SelectItem>
                              <SelectItem value="plaster">محارة</SelectItem>
                              <SelectItem value="painter">نقاش</SelectItem>
                              <SelectItem value="aluminum">
                                صنايعي ألوميتال
                              </SelectItem>
                              <SelectItem value="ceramic">
                                تركيب سيراميك
                              </SelectItem>
                              <SelectItem value="marble">تركيب رخام</SelectItem>
                              <SelectItem value="glass">تركيب زجاج</SelectItem>
                              <SelectItem value="gypsum">أعمال جبس</SelectItem>
                              <SelectItem value="finishing">استرجي</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                              <p className="text-muted-foreground px-2 py-1 text-xs">
                                صيانة أجهزة ومرافق
                              </p>

                              <SelectItem value="home-appliances">
                                صيانة أجهزة منزلية
                              </SelectItem>
                              <SelectItem value="heater">
                                صيانة سخانات
                              </SelectItem>
                              <SelectItem value="ac-tech">
                                فني تكييفات
                              </SelectItem>
                              <SelectItem value="dish">صيانة دش</SelectItem>
                              <SelectItem value="elevator">
                                صيانة مصاعد
                              </SelectItem>
                            </SelectGroup>

                            <SelectGroup>
                              <p className="text-muted-foreground px-2 py-1 text-xs">
                                خدمات السيارات
                              </p>

                              <SelectItem value="mechanic">ميكانيكي</SelectItem>
                              <SelectItem value="bodywork">
                                سمكري سيارات
                              </SelectItem>
                              <SelectItem value="car-electrician">
                                كهربائي سيارات
                              </SelectItem>
                              <SelectItem value="car-ac">
                                تكييف السيارات
                              </SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                              <p className="text-muted-foreground px-2 py-1 text-xs">
                                خدمات أخرى
                              </p>
                              <SelectItem value="other">
                                أعمال أخرى متنوعة
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.mainJob && (
                      <FieldError>{errors.mainJob.message}</FieldError>
                    )}
                  </Field>
                  <Field className="font-semibold">
                    <FieldLabel className="">
                      اختر حرفه ثانويه (اختيارى)
                    </FieldLabel>
                    <Controller
                      name="subJob"
                      control={control}
                      render={({ field }) => (
                        <Select
                          dir="rtl"
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            aria-invalid={!!errors.subJob}
                            className="py-5"
                          >
                            <SelectValue placeholder="-- اختر الحرفة --" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <p className="text-muted-foreground px-2 py-1 text-xs">
                                خدمات إنشائية وصيانة منزلية
                              </p>
                              <SelectItem value="blacksmith">حداد</SelectItem>
                              <SelectItem value="carpenter">نجار</SelectItem>
                              <SelectItem value="plumber">سباك</SelectItem>
                              <SelectItem value="electrician">
                                كهربائي
                              </SelectItem>
                              <SelectItem value="builder">عامل بناء</SelectItem>
                              <SelectItem value="plaster">محارة</SelectItem>
                              <SelectItem value="painter">نقاش</SelectItem>
                              <SelectItem value="aluminum">
                                صنايعي ألوميتال
                              </SelectItem>
                              <SelectItem value="ceramic">
                                تركيب سيراميك
                              </SelectItem>
                              <SelectItem value="marble">تركيب رخام</SelectItem>
                              <SelectItem value="glass">تركيب زجاج</SelectItem>
                              <SelectItem value="gypsum">أعمال جبس</SelectItem>
                              <SelectItem value="finishing">استرجي</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                              <p className="text-muted-foreground px-2 py-1 text-xs">
                                صيانة أجهزة ومرافق
                              </p>

                              <SelectItem value="home-appliances">
                                صيانة أجهزة منزلية
                              </SelectItem>
                              <SelectItem value="heater">
                                صيانة سخانات
                              </SelectItem>
                              <SelectItem value="ac-tech">
                                فني تكييفات
                              </SelectItem>
                              <SelectItem value="dish">صيانة دش</SelectItem>
                              <SelectItem value="elevator">
                                صيانة مصاعد
                              </SelectItem>
                            </SelectGroup>

                            <SelectGroup>
                              <p className="text-muted-foreground px-2 py-1 text-xs">
                                خدمات السيارات
                              </p>

                              <SelectItem value="mechanic">ميكانيكي</SelectItem>
                              <SelectItem value="bodywork">
                                سمكري سيارات
                              </SelectItem>
                              <SelectItem value="car-electrician">
                                كهربائي سيارات
                              </SelectItem>
                              <SelectItem value="car-ac">
                                تكييف السيارات
                              </SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                              <p className="text-muted-foreground px-2 py-1 text-xs">
                                خدمات أخرى
                              </p>
                              <SelectItem value="other">
                                أعمال أخرى متنوعة
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </Field>
                </div>
              </div>
              {/* Location */}
              <div className="space-y-3">
                <div className="text-md flex items-center gap-2 font-bold">
                  <MapPin size={16} className="text-primary" />
                  الموقع والنطاق الجغرافي
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Field data-invalid={!!errors.location}>
                    <FieldLabel>الموقع الأساسي (المدينة، الحي) </FieldLabel>
                    <InputGroup className={'rounded-lg px-3 py-5'}>
                      <InputGroupInput
                        {...register('location')}
                        aria-invalid={!!errors.location}
                        placeholder="مثال: القاهره, حى عين شمس"
                      />
                      <InputGroupAddon align="inline-start">
                        <MapPin className="text-muted-foreground" />
                      </InputGroupAddon>
                    </InputGroup>
                    {errors.location && (
                      <FieldError>{errors.location.message}</FieldError>
                    )}
                  </Field>

                  <Field data-invalid={!!errors.location}>
                    <FieldLabel> مناطق الخدمة التي تغطيها</FieldLabel>
                    <InputGroup className={'rounded-lg px-3 py-5'}>
                      <InputGroupInput
                        {...register('serviceAreas')}
                        aria-invalid={!!errors.serviceAreas}
                        placeholder="اختر من الخريطه"
                      />
                      <InputGroupAddon align="inline-start">
                        <Map className="text-muted-foreground" />
                      </InputGroupAddon>
                    </InputGroup>
                    {errors.serviceAreas && (
                      <FieldError>{errors.serviceAreas.message}</FieldError>
                    )}
                    <FieldDescription>
                      يمكنك تغيير نطاق الخدمة لاحقاً
                    </FieldDescription>
                  </Field>
                </div>
              </div>

              {/* Divider */}
              <Separator />

              {/* Documents */}
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
                  description="PNG, JPG ,PDF ≤5MB"
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
                  description="PNG, JPG, PDF ≤ 5MB"
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
                  variant="default"
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
    </div>
  );
};

export default VerificationPage;
