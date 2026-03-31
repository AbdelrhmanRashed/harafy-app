import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Phone, Languages, IdCard } from "lucide-react";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FormFieldInput from "@/components/shared/form/FormFieldInput";
import { buildProfileSchema, type ProfileFormValues } from "@/features/profile/schema/profile.schema";
import ProfileAvatar from "./ProfileAvatar";
import ProviderForm from "./ProviderForm";
import { useUserStore } from "@/store/useUserStore";

// ─── Constants ────────────────────────────────────────────────────────────────

const LANGUAGES = [
  { value: "ar", label: "العربية (Arabic)" },
  { value: "en", label: "الإنجليزية (English)" },
];

const GOVERNORATES = [
  "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "البحيرة",
  "الفيوم", "الغربية", "الإسماعيلية", "المنوفية", "المنيا",
  "القليوبية", "الشرقية", "سوهاج", "أسيوط", "الأقصر",
  "أسوان", "بني سويف", "كفر الشيخ", "دمياط", "بورسعيد",
  "السويس", "شمال سيناء", "جنوب سيناء", "مطروح",
  "البحر الأحمر", "الوادي الجديد",
];

// ─── Props ────────────────────────────────────────────────────────────────────

interface ProfileFormProps {
  onSubmit: (values: ProfileFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ProfileForm({ onSubmit, onCancel }: ProfileFormProps) {
  const { name, email, phone, location, language, role,  setUser } = useUserStore();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(buildProfileSchema(role)),
    defaultValues: {
      name, email, phone, location, language,
      profession: "", serviceArea: "", bio: "",
    },
    mode: "onTouched",
  });

 

  function handleSubmit(values: ProfileFormValues) {
    setUser(values);
    onSubmit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} noValidate className="space-y-4">

        {/* ── Card 1: المعلومات الشخصية ── */}
        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center justify-start gap-2 border-b-2 border-primary/10 pb-2">
              <IdCard className="h-5 w-5 text-primary" />
              <p className="text-lg font-bold text-primary">المعلومات الشخصية</p>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ProfileAvatar
            />
            <div className="grid grid-cols-2 gap-4">
              <FormFieldInput control={form.control} name="name" label="الاسم الكامل" placeholder="تامر الجيار" icon={User} />
              <FormFieldInput control={form.control} name="email" label="البريد الإلكتروني" placeholder="example@domain.com" icon={Mail} type="email" dir="ltr" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormFieldInput control={form.control} name="phone" label="رقم الهاتف" placeholder="01xxxxxxxxx" icon={Phone} type="tel" dir="ltr" />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الموقع</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="اختر المحافظة" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {GOVERNORATES.map((g) => (
                          <SelectItem key={g} value={g}>{g}</SelectItem>
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

        {/* ── Card 2: بيانات المهنة — Provider only ── */}
        {role === "provider" && (
          <ProviderForm control={form.control} />
        )}

        {/* ── Card 3: التفضيلات ── */}
        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center justify-start gap-2 border-b-2 border-primary/10 pb-2">
              <Languages className="h-5 w-5 text-primary" />
              <p className="text-lg font-bold text-primary">التفضيلات</p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="max-w-xs">
                  <FormLabel className="text-sm font-semibold text-muted-foreground">اللغة المفضلة</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {LANGUAGES.map((l) => (
                        <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* ── Actions ── */}
        <div className="flex items-center justify-between pt-1">
          <Button type="submit" variant="gradient" className="shadow-primary-gradient min-w-[140px]" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "جاري الحفظ…" : "حفظ التغييرات"}
          </Button>
          <Button type="button" variant="ghost" className="text-muted-foreground" onClick={onCancel}>
            إلغاء التعديلات
          </Button>
        </div>

      </form>
    </Form>
  );
}