
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


//import registerSchema for React form
import { registerSchema, type RegisterFormValues } from "./registerSchema.ts"
// Shadcn UI components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// Lucide icons
import {
  User,
  Mail,
  Phone,
  Eye,
  EyeOff,
  Wrench,
  IdCard,
  LockKeyhole,
  RotateCcwKey,
} from "lucide-react";

import HeroPanel from "./heroPanel.tsx";
import Footer from "./footer.tsx";
import AccountTypeCard from "./accountTypeCard.tsx";
import InputWithIcon from "./inputWithIcon.tsx"

// ─── Main Page Component ──────────────────────────────────────────────────────
const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      accountType: "client",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    mode: "onTouched",
  });

  const accountType = form.watch("accountType");

  function onSubmit(values: RegisterFormValues) {
    console.log("Form submitted:", values);
    // TODO: connect to your API
  }

  return (
    <>

      <div
        dir="rtl"
        className="min-h-screen bg-background flex items-center justify-center p-4 lg:p-8"
      >
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">


          {/* ── Form Panel ── */}
          <div className="w-full space-y-5">
            {/* Header */}
            <div className="text-right">
              <h1 className="text-[1.875rem] font-bold text-foreground leading-9">
                إنشاء حساب جديد
              </h1>
              <p className="text-muted-foreground font-normal mt-1">
                انضم إلينا وابدأ رحلتك مع <span className="text-foreground">حِرَفِيّ</span> اليوم.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                noValidate
                className="space-y-4"
              >
                {/* ── Account Type ── */}
                <div className="space-y-3">
                  <p className="text-sm font-normal text-foreground">
                    اختر نوع الحساب
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <AccountTypeCard
                      type="client"
                      label="عميل"
                      sublabel="أبحث عن خدمات"
                      icon={<User className="h-6 w-6" />}
                      selected={accountType === "client"}
                      onSelect={() => form.setValue("accountType", "client")}
                    />
                    <AccountTypeCard
                      type="professional"
                      label="حرفي"
                      sublabel="أنا فني وأريد تقديم خدماتي للعملاء"
                      icon={<Wrench className="h-6 w-6" />}
                      selected={accountType === "professional"}
                      onSelect={() =>
                        form.setValue("accountType", "professional")
                      }
                    />

                  </div>
                </div>

                {/* ── First & Last Name ── */}

                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم الأول</FormLabel>
                      <FormControl>
                        <InputWithIcon
                          icon={<IdCard className="h-4 w-4" />}
                          placeholder="أدخل اسمك الأول"
                          autoComplete="given-name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>أسم العائلة</FormLabel>
                      <FormControl>
                        <InputWithIcon
                          icon={<IdCard className="h-4 w-4" />}
                          placeholder="أدخل اسم العائلة"
                          autoComplete="family-name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                {/* ── Email ── */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <InputWithIcon
                          icon={<Mail className="h-4 w-4" />}
                          placeholder="example@domain.com"
                          type="email"
                          autoComplete="email"
                          dir="ltr"
                          className="text-right"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ── Phone ── */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم الهاتف</FormLabel>
                      <FormControl>
                        <InputWithIcon
                          icon={<Phone className="h-4 w-4" />}
                          placeholder="01xxxxxxxxx"
                          type="tel"
                          autoComplete="tel"
                          dir="ltr"
                          className="text-right"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ── Password ── */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>كلمة المرور</FormLabel>
                      <FormControl>
                        <InputWithIcon
                          icon={<LockKeyhole className="h-4 w-4" />}
                          placeholder="••••••••"
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          suffix={
                            <button
                              type="button"
                              onClick={() => setShowPassword((p) => !p)}
                              className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                              aria-label={
                                showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
                              }
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ── Confirm Password ── */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>تأكيد كلمة المرور</FormLabel>
                      <FormControl>
                        <InputWithIcon
                          icon={<RotateCcwKey className="h-4 w-4" />}
                          placeholder="••••••••"
                          type={showConfirm ? "text" : "password"}
                          autoComplete="new-password"
                          suffix={
                            <button
                              type="button"
                              onClick={() => setShowConfirm((p) => !p)}
                              className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                              aria-label={
                                showConfirm ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
                              }
                            >
                              {showConfirm ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ── Terms ── */}
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-row items-start gap-2">
                        <FormControl>
                          <Checkbox
                            id="terms"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <label
                          htmlFor="terms"
                          className="text-sm text-foreground leading-snug cursor-pointer select-none"
                        >
                          أوافق على{" "}
                          <a
                            href="#"
                            className="text-primary hover:underline font-medium"
                          >
                            الشروط والأحكام
                          </a>{" "}
                          و{" "}
                          <a
                            href="#"
                            className="text-primary hover:underline font-medium"
                          >
                            سياسة الخصوصية
                          </a>
                        </label>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ── Submit ── */}
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 text-base rounded-2xl transition-all duration-200 active:scale-[0.98]"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "جاري التسجيل..." : "متابعة"}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  لديك حساب بالفعل؟{" "}
                  <a
                    href="/login"
                    className="text-primary hover:underline font-semibold"
                  >
                    تسجيل الدخول
                  </a>
                </p>
              </form>
            </Form>
          </div>
          {/* ── Hero Panel (Left on screen, right in DOM for RTL) ── */}
          <HeroPanel />
        </div>
      </div>
      {/* footer */}
      <Footer/>
    </>
  );
}

export default RegisterPage;
