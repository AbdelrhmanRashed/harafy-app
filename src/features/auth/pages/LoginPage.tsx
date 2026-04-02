import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';

import { Mail, LogIn, Eye, EyeOff, LockKeyhole, Loader2 } from 'lucide-react';
import { loginSchema } from '../schema/login.schema';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  //State for password visibility
  const [show, setShow] = useState(false);
  const { mutate: login, isPending } = useLogin();

  //Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  //Submit Handler
  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <div className="mx-6 flex flex-col items-center justify-center">
      <Card className="relative shadow-lg sm:w-105">
        <div className="bg-primary-gradient absolute bottom-0 left-0 h-1 w-full" />

        <CardContent className="space-y-6 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div className="space-y-1 text-center">
              <h1 className="text-foreground text-xl font-bold">
                تسجيل الدخول
              </h1>
              <p className="text-muted-foreground text-sm">
                مرحباً بعودتك! يرجى إدخال بياناتك للمتابعة
              </p>
            </div>

            {/* Email */}
            <Field data-invalid={!!errors.email}>
              <FieldLabel>البريد الإلكتروني</FieldLabel>

              <InputGroup className={'rounded-lg px-3 py-5'}>
                <InputGroupInput
                  placeholder="أدخل بريدك الإلكتروني"
                  {...register('email')}
                  aria-invalid={!!errors.email}
                />
                <InputGroupAddon align="inline-start">
                  <Mail className="text-muted-foreground" />
                </InputGroupAddon>
              </InputGroup>

              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>

            {/* Password */}
            <Field data-invalid={!!errors.password}>
              <FieldLabel className="flex justify-between">
                كلمة المرور
                <span className="text-muted-foreground cursor-pointer">
                  نسيت كلمة المرور؟
                </span>
              </FieldLabel>

              <InputGroup className={'rounded-lg px-3 py-5'}>
                <InputGroupInput
                  aria-invalid={!!errors.password}
                  type={show ? 'text' : 'password'}
                  placeholder="أدخل كلمة المرور"
                  {...register('password')}
                />
                <InputGroupAddon align="inline-start">
                  <LockKeyhole className="text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupButton
                  size={'icon-sm'}
                  className="cursor-pointer"
                  onClick={() => setShow(!show)}
                >
                  {show ? (
                    <EyeOff className="text-muted-foreground" />
                  ) : (
                    <Eye className="text-muted-foreground" />
                  )}
                </InputGroupButton>
              </InputGroup>

              {errors.password && (
                <FieldError>{errors.password.message}</FieldError>
              )}
            </Field>

            <Button
              variant="gradient"
              type="submit"
              className="shadow-primary-gradient flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="text-primary-foreground animate-spin" />
                  جاري تسجيل الدخول
                </>
              ) : (
                <>
                  تسجيل الدخول
                  <LogIn size={16} />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="text-muted-foreground flex items-center gap-3 text-sm">
            <div className="bg-muted-foreground/20 h-px flex-1" />
            أو
            <div className="bg-muted-foreground/20 h-px flex-1" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg"
          >
            <span className="text-foreground text-sm">
              المتابعة باستخدام Google
            </span>
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="h-4 w-4"
            />
          </Button>

          <p className="text-muted-foreground text-center text-sm">
            ليس لديك حساب؟{' '}
            <Link
              to="/auth/register"
              className="text-primary ms-1 font-semibold hover:underline"
            >
              إنشاء حساب جديد
            </Link>
          </p>
        </CardContent>
      </Card>

      <div className="text-muted-foreground my-10 flex gap-4 text-xs">
        <span>سياسة الخصوصية</span>
        <span>الشروط والأحكام</span>
        <span>اتصل بنا</span>
      </div>
    </div>
  );
};

export default LoginPage;
