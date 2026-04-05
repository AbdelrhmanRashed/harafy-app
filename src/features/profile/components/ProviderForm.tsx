import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';
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
import FormFieldInput from '@/components/shared/form/FormFieldInput';
import { Map } from 'lucide-react';
import type { Control } from 'react-hook-form';
import type { ProfileFormValues } from '@/features/profile/schema/profile.schema';
interface ProviderFormProps {
  control: Control<ProfileFormValues>;
}
export default function ProviderForm({ control }: ProviderFormProps) {
  const PROFESSIONS = [
    'سباكة',
    'كهرباء',
    'نجارة',
    'دهانات',
    'تكييف',
    'بلاط وسيراميك',
    'حدادة',
    'أعمال ألومنيوم',
  ];
  return (
    <>
      <Card className="border-none">
        <CardHeader className="pb-0">
          <CardTitle className="border-primary/10 flex items-center justify-start gap-2 border-b-2 pb-2">
            <Briefcase className="text-primary h-5 w-5" />
            <p className="text-primary text-lg font-bold">بيانات المهنة</p>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المهنة الأساسية</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="اختر المهنة" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PROFESSIONS.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormFieldInput
              control={control}
              name="serviceArea"
              label="منطقة الخدمة"
              placeholder="مدينة نصر، المعادي"
              icon={Map}
            />
          </div>

          <FormField
            control={control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  نبذة عنك{' '}
                  <span className="text-muted-foreground font-normal">
                    (اختياري)
                  </span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="اكتب نبذة مختصرة عن خبرتك وخدماتك…"
                    className="min-h-[90px] resize-none text-right"
                    maxLength={300}
                    {...field}
                  />
                </FormControl>
                <p className="text-muted-foreground text-left text-xs">
                  {field.value?.length ?? 0} / 300
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </>
  );
}
