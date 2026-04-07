import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle, Trash2, IdCard, Loader2 } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import FormFieldInput from '@/components/shared/form/FormFieldInput';

import {
  updateClientProfileSchema,
  type UpdateClientProfileFormValues,
} from '../schema/profile.schema';
import { useClientProfile } from '../hooks/useClientProfile';
import { useUpdateClientProfile } from '../hooks/useUpdateClientProfile';
import ClientAvatarUpload from './ClientAvatarUpload';
import ProfileFormSkeleton from './ProfileFormSkeleton';
import { useGovernorate } from '../hooks/useGovernorate';

import PreferenceCard from './PreferenceCard';
import type { Governorate, Region } from '@/types/governorate.types';

// ─── Component ────────────────────────────────────────────────────────────────

const ProfileFormSettings = () => {
  // Handle Data
  const { data: profile, isLoading } = useClientProfile();
  const { mutate: updateProfile, isPending } = useUpdateClientProfile();
  const { governorates: governoratesData, isLoading: governoratesLoading } =
    useGovernorate();

  // Handle Form
  const form = useForm<UpdateClientProfileFormValues>({
    resolver: zodResolver(updateClientProfileSchema),
    defaultValues: {
      FirstName: '',
      LastName: '',
      Gender: 0,
      DateOfBirth: '',
      Picture: undefined,
      PhoneNumbers: [{ value: '' }],
      governorate: 0,
      region: 0,
    },
    mode: 'onTouched',
  });

  // Handle Phone Numbers
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'PhoneNumbers',
  });

  // Handle Selected Governorate
  const selectedGovernorateId = form.watch('governorate');
  const selectedGovernorate = governoratesData?.find(
    (gov: Governorate) => gov.id === selectedGovernorateId,
  );
  const regions: Region[] = selectedGovernorate?.regions || [];

  // Handle Pre-fill
  useEffect(() => {
    if (!profile || !governoratesData) return;

    form.reset({
      FirstName: profile.firstName,
      LastName: profile.lastName,
      Gender: profile.gender,
      DateOfBirth: '',
      Picture: undefined,
      PhoneNumbers:
        profile.phoneNumbers.length > 0
          ? profile.phoneNumbers.map((n) => ({ value: n }))
          : [{ value: '' }],
      governorate: profile.governorateId,
      region: profile.regionId,
    });
  }, [profile, governoratesData]);

  // Handle Submit
  const handleSubmit = (values: UpdateClientProfileFormValues) => {
    const formData = new FormData();
    formData.append('FirstName', values.FirstName);
    formData.append('LastName', values.LastName);
    formData.append('Gender', String(values.Gender));
    formData.append('DateOfBirth', values.DateOfBirth);
    if (values.Picture) {
      formData.append('Picture', values.Picture);
    }
    values.PhoneNumbers.forEach(({ value }) => {
      formData.append('PhoneNumbers', value);
    });

    if (values.governorate !== undefined) {
      formData.append('GovernorateId', String(values.governorate));
    }
    if (values.region !== undefined) {
      formData.append('RegionId', String(values.region));
    }

    updateProfile(formData);
  };

  // ── Loading skeleton ───────────────────────────────────────────────────────

  if (isLoading || governoratesLoading) {
    return <ProfileFormSkeleton />;
  }
  // ── Form ───────────────────────────────────────────────────────────────────

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        noValidate
        className="space-y-8"
      >
        {/* ── Card: Personal Info ── */}
        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="border-primary/10 flex items-center justify-start gap-2 border-b-2 pb-2">
              <IdCard className="text-primary h-5 w-5" />
              <p className="text-primary text-lg font-bold">
                المعلومات الشخصية
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar upload */}
            <ClientAvatarUpload
              control={form.control}
              currentPictureUrl={profile?.pictureUrl}
            />

            {/* Name row */}
            <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
              <FormFieldInput
                control={form.control}
                name="FirstName"
                label="الاسم الأول"
                placeholder="الاسم الاول"
                dir="rtl"
              />
              <FormFieldInput
                control={form.control}
                name="LastName"
                label="اسم العائلة"
                placeholder="اسم العائله"
                dir="rtl"
              />
            </div>

            {/* Gender + Date of Birth */}
            <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
              {/* Gender Select */}
              <FormField
                control={form.control}
                name="Gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الجنس</FormLabel>
                    <Select
                      onValueChange={(v) => field.onChange(Number(v) as 0 | 1)}
                      value={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full py-5">
                          <SelectValue placeholder="اختر الجنس" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">ذكر</SelectItem>
                        <SelectItem value="1">أنثى</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date of Birth */}
              <FormField
                control={form.control}
                name="DateOfBirth"
                render={({ field }) => {
                  const today = new Date();
                  const maxDate = today.toISOString().split('T')[0];

                  // لو عايز 18 سنة
                  const minDateObj = new Date();
                  minDateObj.setFullYear(today.getFullYear() - 100); // optional
                  const minDate = minDateObj.toISOString().split('T')[0];

                  return (
                    <FormItem>
                      <FormLabel>تاريخ الميلاد</FormLabel>

                      <FormControl>
                        <Input
                          type="date"
                          dir="ltr"
                          className="py-5"
                          // 🔥 مهم
                          value={field.value || ''}
                          onChange={field.onChange}
                          // 🛑 يمنع المستقبل
                          max={maxDate}
                          // 🟡 optional (أقصى عمر)
                          min={minDate}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            {/* Governorate + Region */}
            <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
              {/* Governorate Select */}
              <FormField
                control={form.control}
                name="governorate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المحافظة</FormLabel>
                    <Select
                      key={field.value}
                      onValueChange={(v) => field.onChange(Number(v))}
                      value={field.value ? field.value.toString() : undefined}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full py-5">
                          <SelectValue placeholder="اختر المحافظة" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {governoratesData?.map((gov: Governorate) => (
                          <SelectItem key={gov.id} value={gov.id.toString()}>
                            {gov.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Region Select */}
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المدينة</FormLabel>
                    <Select
                      key={field.value}
                      onValueChange={(v) => field.onChange(Number(v))}
                      value={field.value ? field.value.toString() : undefined}
                      disabled={!selectedGovernorateId}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full py-5">
                          <SelectValue placeholder="اختر المدينة" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem
                            key={region.id}
                            value={region.id.toString()}
                          >
                            {region.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Phone Numbers — dynamic list */}
            <div className="space-y-3">
              <FormLabel>أرقام الهاتف</FormLabel>
              {fields.map((fieldItem, index) => (
                <FormField
                  key={fieldItem.id}
                  control={form.control}
                  name={`PhoneNumbers.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Input
                            placeholder="01xxxxxxxxx"
                            dir="ltr"
                            className="py-5"
                            {...field}
                          />
                        </FormControl>
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                            onClick={() => remove(index)}
                            aria-label="حذف رقم الهاتف"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary hover:bg-primary/10 gap-2"
                onClick={() => append({ value: '' })}
              >
                <PlusCircle className="h-4 w-4" />
                إضافة رقم هاتف
              </Button>
            </div>
          </CardContent>
        </Card>

        <PreferenceCard />

        {/* ── Actions ── */}
        <div className="flex items-center justify-between pt-1">
          <Button
            type="button"
            variant="ghost"
            className="text-muted-foreground h-11 min-w-36 cursor-pointer"
            onClick={() => form.reset()}
          >
            إلغاء التعديلات
          </Button>
          <Button
            type="submit"
            variant="gradient"
            className="shadow-primary-gradient h-11 min-w-36"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                جاري الحفظ...
              </>
            ) : (
              'حفظ التغييرات'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileFormSettings;
