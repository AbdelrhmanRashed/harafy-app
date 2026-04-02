import FormFieldInput from '@/components/shared/form/FormFieldInput';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IdCard, Mail, Phone, User } from 'lucide-react';
import ProfileAvatar from './ProfileAvatar';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Control } from 'react-hook-form';
import type { ProfileFormValues } from '../schema/profile.schema';

const GOVERNORATES = [
  'القاهرة',
  'الجيزة',
  'الإسكندرية',
  'الدقهلية',
  'البحيرة',
  'الفيوم',
  'الغربية',
  'الإسماعيلية',
  'المنوفية',
  'المنيا',
  'القليوبية',
  'الشرقية',
  'سوهاج',
  'أسيوط',
  'الأقصر',
  'أسوان',
  'بني سويف',
  'كفر الشيخ',
  'دمياط',
  'بورسعيد',
  'السويس',
  'شمال سيناء',
  'جنوب سيناء',
  'مطروح',
  'البحر الأحمر',
  'الوادي الجديد',
];

const ProfileForm = ({ control }: { control: Control<ProfileFormValues> }) => {
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="border-primary/10 flex items-center justify-start gap-2 border-b-2 pb-2">
          <IdCard className="text-primary h-5 w-5" />
          <p className="text-primary text-lg font-bold">المعلومات الشخصية</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ProfileAvatar />
        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
          <FormFieldInput
            control={control}
            name="name"
            label="الاسم الكامل"
            placeholder="تامر الجيار"
            icon={User}
          />
          <FormFieldInput
            control={control}
            name="email"
            label="البريد الإلكتروني"
            placeholder="example@domain.com"
            icon={Mail}
            type="email"
          />
        </div>
        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
          <FormFieldInput
            control={control}
            name="phone"
            label="رقم الهاتف"
            placeholder="01xxxxxxxxx"
            icon={Phone}
            type="tel"
          />
          <FormField
            control={control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الموقع</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full py-5">
                      <SelectValue placeholder="اختر المحافظة" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {GOVERNORATES.map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
