import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

//import registerSchema for React form
import {
  registerSchema,
  type RegisterFormValues,
} from '../../schemas/registerSchema.ts';
// Shadcn UI components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

// Lucide icons
import {
  User,
  Mail,
  Phone,
  Wrench,
  IdCard,
  LockKeyhole,
  RotateCcwKey,
  Loader2,
} from 'lucide-react';

//import components
import HeroPanel from '@/components/register/HeroPanel.tsx';
import AccountTypeCard from '@/components/register/AccountTypeCard.tsx';
import FormFieldInput from '@/components/shared/form/FormFieldInput.tsx';
import { Link } from 'react-router-dom';

// ─── Main Page Component ──────────────────────────────────────────────────────
const RegisterPage = () => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      accountType: 'client',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
    mode: 'onTouched',
  });

  const accountType = form.watch('accountType');

  function onSubmit(values: RegisterFormValues) {
    console.log('Form submitted:', values);
    // TODO: connect to your API
  }

  return (
    <>
      <main className="flex min-h-screen items-center justify-center p-4 lg:p-8">
        <div className="grid w-full max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
          {/* ── Form Panel ── */}
          <div className="w-full space-y-5">
            {/* Header */}
            <div className="text-right">
              <h1 className="text-foreground text-[1.875rem] leading-9 font-bold">
                إنشاء حساب جديد
              </h1>
              <p className="text-muted-foreground mt-1 font-normal">
                انضم إلينا وابدأ رحلتك مع{' '}
                <span className="text-foreground">حِرَفِيّ</span> اليوم.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                noValidate
                className="space-y-4.5"
              >
                {/* ── Account Type ── */}
                <div className="space-y-3">
                  <p className="text-foreground text-sm font-normal">
                    اختر نوع الحساب
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <AccountTypeCard
                      type="client"
                      label="عميل"
                      subLabel="أبحث عن خدمات"
                      icon={<User className="h-6 w-6" />}
                      selected={accountType === 'client'}
                      onSelect={() => form.setValue('accountType', 'client')}
                    />
                    <AccountTypeCard
                      type="professional"
                      label="حرفي"
                      subLabel="أنا فني وأريد تقديم خدماتي للعملاء"
                      icon={<Wrench className="h-6 w-6" />}
                      selected={accountType === 'professional'}
                      onSelect={() =>
                        form.setValue('accountType', 'professional')
                      }
                    />
                  </div>
                </div>

                {/* ── First & Last Name ── */}

                <FormFieldInput
                  control={form.control}
                  name="firstName"
                  label="الاسم الأول"
                  placeholder="أدخل اسمك الأول"
                  icon={User}
                />
                <FormFieldInput
                  control={form.control}
                  name="lastName"
                  label="أسم العائلة"
                  placeholder="أدخل اسم العائلة"
                  icon={IdCard}
                />

                {/* ── Email ── */}
                <FormFieldInput
                  control={form.control}
                  name="email"
                  label="البريد الإلكتروني"
                  placeholder="example@domain.com"
                  icon={Mail}
                  type="email"
                />

                {/* ── Phone ── */}
                <FormFieldInput
                  control={form.control}
                  name="phone"
                  label="رقم الهاتف"
                  placeholder="01xxxxxxxxx"
                  icon={Phone}
                  type="tel"
                />

                {/* ── Password ── */}
                <FormFieldInput
                  control={form.control}
                  name="password"
                  label="كلمة المرور"
                  placeholder="••••••••"
                  icon={LockKeyhole}
                  type="password"
                />

                {/* ── Confirm Password ── */}
                <FormFieldInput
                  control={form.control}
                  name="confirmPassword"
                  label="تأكيد كلمة المرور"
                  placeholder="••••••••"
                  icon={RotateCcwKey}
                  type="password"
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
                          className="text-foreground cursor-pointer text-sm leading-snug select-none"
                        >
                          أوافق على{' '}
                          <a
                            href="#"
                            className="text-primary font-medium hover:underline"
                          >
                            الشروط والأحكام
                          </a>{' '}
                          و{' '}
                          <a
                            href="#"
                            className="text-primary font-medium hover:underline"
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
                  variant="default"
                  className="h-11 w-full cursor-pointer rounded-lg font-bold"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="ml-2">جاري التسجيل...</span>
                    </>
                  ) : (
                    'متابعة'
                  )}
                </Button>

                <p className="text-muted-foreground text-center text-sm">
                  لديك حساب بالفعل؟{' '}
                  <Link
                    to="/auth/login"
                    className="text-primary font-semibold hover:underline"
                  >
                    تسجيل الدخول
                  </Link>
                </p>
              </form>
            </Form>
          </div>
          {/* ── Hero Panel (Left on screen, right in DOM for RTL) ── */}
          <HeroPanel />
        </div>
      </main>
    </>
  );
};

export default RegisterPage;
