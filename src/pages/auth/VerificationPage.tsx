import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { registerSchema } from "@/schemas/registerSchema";

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
} from "@/components/ui/select"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel
} from '@/components/ui/field';
import { Progress } from '@/components/ui/progress';

import FileUploadCard from "@/components/register/FileUploadCard";

import {
  MapPin,
  FileText,
  Info,
  Map,
  Briefcase,
  IdCard,
  SquareUser,
} from 'lucide-react';

type VerificationFormData = z.infer<typeof registerSchema>;

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
    <div className="py-10 px-6 mx-auto grid max-w-5xl grid-cols-1 gap-4 lg:grid-cols-3">
      {/* RIGHT */}
      <div className="col-span-2 lg:col-span-1 flex flex-col gap-4 md:flex-row md:items-stretch lg:flex-col">       {/* Registration Status */}
        <Card className="rounded-lg p-6  md:flex-1 lg:flex-none">
          <Field className="w-full max-w-sm">
            <FieldLabel htmlFor="progress-upload" className="flex items-center justify-between">
              <span className="text-md font-bold"> حالة التسجيل</span>
              <span className="text-md font-medium text-primary">50%</span>
            </FieldLabel>
            <Progress dir="rtl" value={50} id="progress-upload" />
          </Field>
          {/* Steps */}
          <div className="mt-1 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-sidebar-primary/10 text-sidebar-primary">
                ✓
              </div>
              <span className="text-gray-500 line-through">المعلومات الشخصية</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-sidebar-primary text-white text-[10px]">
                2
              </div>
              <span className="text-primary font-medium">
                بيانات المهنة
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex h-5 w-5 items-center justify-center rounded-full border text-gray-400 text-[10px]">
                3
              </div>
              <span className="text-gray-400">المراجعة والاعتماد</span>
            </div>
          </div>
        </Card>

        {/* Info Card */}
        <Card className=" rounded-lg border border-blue-100 bg-blue-50 p-5 md:flex-1 lg:flex-none ">
          <div className="space-y-3 text-right">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-600" />
              <p className="text-md font-semibold text-blue-700">
                لماذا نطلب هذه الوثائق؟
              </p>
            </div>
            <p className="text-sm leading-6 text-blue-600">
              لضمان جودة الخدمات وسلامة العملاء، نقوم بالتحقق من هوية ومؤهلات كل حرفي ينضم إلى منصتنا.
            </p>
          </div>
        </Card>
      </div>

      {/* LEFT */}
      <div>
        <Card className="rounded-lg  lg:w-200 shadow-lg ">
          <CardContent className="p-4 space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Header */}
              <div className="space-y-1 ">
                <p className="text-xs text-muted-foreground">الخطوة 2 من 3</p>
                <h1 className="text-xl font-bold text-foreground">
                  إكمال بيانات الحرفي
                </h1>
                <p className="text-sm text-muted-foreground">
                  يرجى رفع المستندات المطلوبة لإثبات المهنة والهوية وتحديد نطاق عملك .
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4" />

              {/* Service Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-md font-bold">
                  <Briefcase size={16} className="text-primary" />
                  تفاصيل الخدمة
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Field
                    className='font-semibold'
                    data-invalid={!!errors.mainJob}
                  >
                    <FieldLabel className=''>اختر الحرفة الأساسية</FieldLabel>
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
                            className={`${errors.mainJob ? "border-red-500 ring-red-500 focus:ring-red-500" : ""}`}
                          >
                            <SelectValue placeholder="-- اختر الحرفة --" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <p className="px-2 py-1 text-xs text-muted-foreground">
                                خدمات إنشائية وصيانة منزلية
                              </p>
                              <SelectItem value="blacksmith">حداد</SelectItem>
                              <SelectItem value="carpenter">نجار</SelectItem>
                              <SelectItem value="plumber">سباك</SelectItem>
                              <SelectItem value="electrician">كهربائي</SelectItem>
                              <SelectItem value="builder">عامل بناء</SelectItem>
                              <SelectItem value="plaster">محارة</SelectItem>
                              <SelectItem value="painter">نقاش</SelectItem>
                              <SelectItem value="aluminum">صنايعي ألوميتال</SelectItem>
                              <SelectItem value="ceramic">تركيب سيراميك</SelectItem>
                              <SelectItem value="marble">تركيب رخام</SelectItem>
                              <SelectItem value="glass">تركيب زجاج</SelectItem>
                              <SelectItem value="gypsum">أعمال جبس</SelectItem>
                              <SelectItem value="finishing">استرجي</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                              <p className="px-2 py-1 text-xs text-muted-foreground">
                                صيانة أجهزة ومرافق
                              </p>

                              <SelectItem value="home-appliances">صيانة أجهزة منزلية</SelectItem>
                              <SelectItem value="heater">صيانة سخانات</SelectItem>
                              <SelectItem value="ac-tech">فني تكييفات</SelectItem>
                              <SelectItem value="dish">صيانة دش</SelectItem>
                              <SelectItem value="elevator">صيانة مصاعد</SelectItem>
                            </SelectGroup>

                            <SelectGroup>
                              <p className="px-2 py-1 text-xs text-muted-foreground">
                                خدمات السيارات
                              </p>

                              <SelectItem value="mechanic">ميكانيكي</SelectItem>
                              <SelectItem value="bodywork">سمكري سيارات</SelectItem>
                              <SelectItem value="car-electrician">كهربائي سيارات</SelectItem>
                              <SelectItem value="car-ac">تكييف السيارات</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                              <p className="px-2 py-1 text-xs text-muted-foreground">
                                خدمات أخرى
                              </p>
                              <SelectItem value="other">أعمال أخرى متنوعة</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.mainJob && <FieldError>{errors.mainJob.message}</FieldError>}
                  </Field>
                  <Field className='font-semibold' >
                    <FieldLabel className=''>اختر حرفه ثانويه (اختيارى)</FieldLabel>
                    <Controller
                      name="subJob"
                      control={control}
                      render={({ field }) => (
                        <Select
                          dir="rtl"
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="-- اختر الحرفة --" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <p className="px-2 py-1 text-xs text-muted-foreground">
                                خدمات إنشائية وصيانة منزلية
                              </p>
                              <SelectItem value="blacksmith">حداد</SelectItem>
                              <SelectItem value="carpenter">نجار</SelectItem>
                              <SelectItem value="plumber">سباك</SelectItem>
                              <SelectItem value="electrician">كهربائي</SelectItem>
                              <SelectItem value="builder">عامل بناء</SelectItem>
                              <SelectItem value="plaster">محارة</SelectItem>
                              <SelectItem value="painter">نقاش</SelectItem>
                              <SelectItem value="aluminum">صنايعي ألوميتال</SelectItem>
                              <SelectItem value="ceramic">تركيب سيراميك</SelectItem>
                              <SelectItem value="marble">تركيب رخام</SelectItem>
                              <SelectItem value="glass">تركيب زجاج</SelectItem>
                              <SelectItem value="gypsum">أعمال جبس</SelectItem>
                              <SelectItem value="finishing">استرجي</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                              <p className="px-2 py-1 text-xs text-muted-foreground">
                                صيانة أجهزة ومرافق
                              </p>

                              <SelectItem value="home-appliances">صيانة أجهزة منزلية</SelectItem>
                              <SelectItem value="heater">صيانة سخانات</SelectItem>
                              <SelectItem value="ac-tech">فني تكييفات</SelectItem>
                              <SelectItem value="dish">صيانة دش</SelectItem>
                              <SelectItem value="elevator">صيانة مصاعد</SelectItem>
                            </SelectGroup>

                            <SelectGroup>
                              <p className="px-2 py-1 text-xs text-muted-foreground">
                                خدمات السيارات
                              </p>

                              <SelectItem value="mechanic">ميكانيكي</SelectItem>
                              <SelectItem value="bodywork">سمكري سيارات</SelectItem>
                              <SelectItem value="car-electrician">كهربائي سيارات</SelectItem>
                              <SelectItem value="car-ac">تكييف السيارات</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                              <p className="px-2 py-1 text-xs text-muted-foreground">
                                خدمات أخرى
                              </p>
                              <SelectItem value="other">أعمال أخرى متنوعة</SelectItem>
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
                <div className="flex items-center gap-2 text-md font-bold">
                  <MapPin size={16} className="text-primary" />
                  الموقع والنطاق الجغرافي
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Field
                    data-invalid={!!errors.location}
                  >
                    <FieldLabel>الموقع الأساسي  (المدينة، الحي) </FieldLabel>
                    <InputGroup className={'rounded-lg px-3 py-5'}>
                      <InputGroupInput
                        {...register("location")}
                        aria-invalid={!!errors.location}
                        dir="rtl"
                        placeholder="مثال: القاهره, حى عين شمس"
                      />
                      <InputGroupAddon align="inline-start">
                        <MapPin className="text-muted-foreground" />
                      </InputGroupAddon>
                    </InputGroup>
                    {errors.location && <FieldError>{errors.location.message}</FieldError>}
                  </Field>

                  <Field aria-invalid={!!errors.location}>
                    <FieldLabel> مناطق الخدمة التي تغطيها</FieldLabel>
                    <InputGroup className={'rounded-lg px-3 py-5'}>
                      <InputGroupInput
                        {...register("serviceAreas")}
                        aria-invalid={!!errors.serviceAreas}
                        dir="rtl"
                        placeholder="اختر من الخريطه"
                      />
                      <InputGroupAddon align="inline-start">
                        <Map className="text-muted-foreground" />
                      </InputGroupAddon>
                    </InputGroup>
                    {errors.serviceAreas && <FieldError>{errors.serviceAreas.message}</FieldError>}
                    <FieldDescription>
                      يمكنك إضافة أكثر من منطقة
                    </FieldDescription>
                  </Field>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4" />

              {/* Documents */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FileUploadCard
                  title="صورة شخصية"
                  description="PNG, JPG ≤5MB"
                  icon={SquareUser}
                  accept="image/png, image/jpeg"
                  onChange={(file) => setValue("personalImage", file)}
                  errorMessage={typeof errors.personalImage?.message === 'string' ? errors.personalImage.message : undefined}
                />
                <FileUploadCard
                  title="صورة البطاقة الشخصية"
                  description="PNG, JPG ,PDF ≤5MB"
                  icon={IdCard}
                  accept="image/png, image/jpeg, application/pdf"
                  onChange={(file) => setValue("nationalId", file)}
                  errorMessage={typeof errors.nationalId?.message === 'string' ? errors.nationalId.message : undefined}
                />
                <FileUploadCard
                  title="صحيفة الحالة الجنائية"
                  description="PNG, JPG ,PDF ≤5MB"
                  icon={FileText}
                  accept="image/png, image/jpeg, application/pdf"
                  onChange={(file) => setValue("criminalRecord", file)}
                  errorMessage={typeof errors.criminalRecord?.message === 'string' ? errors.criminalRecord.message : undefined}
                />
              </div>
              {/* Info Box */}
              <div
                className="bg-primary/10 text-xs text-primary p-4 rounded-xl ">
                سيتم مراجعة طلبك من قبل إدارة منصة حِرَفِيّ والتأكد من صحة البيانات قبل تفعيل حسابك، تستغرق هذه العملية عادة 24 ساعة.
              </div>

              {/* Submit */}
              <div className="flex items-center justify-between pt-4">
                <Button
                  variant="default"
                  type="submit"
                  className="  rounded-xl px-6 h-11">
                  إرسال للمراجعة
                </Button>

                <Button
                  variant="outline"
                  className="rounded-xl px-6 h-11 text-primary">
                  حفظ كمسودة
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