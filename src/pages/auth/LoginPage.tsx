import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, CardContent } from '@/components/ui/card';

import { Field, FieldLabel, FieldError } from '@/components/ui/field';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

import { Button } from '@/components/ui/button';

import { Mail, LogIn, Eye, EyeOff } from 'lucide-react';

import { loginSchema } from '@/schemas/loginSchema';

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  //State for password visibility
  const [show, setShow] = useState(false);

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
    console.log(data);
  };

  return (
    <div className="mx-6 flex h-screen items-center justify-center">
      <Card className="w-105">
        <div className="bg-primary absolute bottom-0 left-0 h-1 w-full" />

        <CardContent className="space-y-6 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div className="space-y-1 text-center">
              <h1 className="text-xl font-bold text-gray-800">تسجيل الدخول</h1>
              <p className="text-sm text-gray-500">
                مرحباً بعودتك! يرجى إدخال بياناتك للمتابعة
              </p>
            </div>

            {/* Email */}
            <Field>
              <FieldLabel>البريد الإلكتروني</FieldLabel>

              <InputGroup
                className={`h-11 rounded-xl border bg-gray-100 px-2 transition ${errors.email ? 'border-red-500' : 'border-gray-200'} focus-within:border-0`}
              >
                <InputGroupInput
                  placeholder="name@example.com"
                  {...register('email')}
                />
                <InputGroupAddon align="inline-end">
                  <Mail className="text-muted-foreground" />
                </InputGroupAddon>
              </InputGroup>

              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>

            {/* Password */}
            <Field>
              <div className="flex justify-between text-sm text-gray-600">
                <FieldLabel>كلمة المرور</FieldLabel>
                <span className="cursor-pointer text-gray-400">
                  نسيت كلمة المرور؟
                </span>
              </div>

              <InputGroup
                className={`h-11 rounded-xl border bg-gray-100 px-2 transition ${errors.password ? 'border-red-500' : 'border-gray-200'} focus-within:border-0`}
              >
                <InputGroupInput
                  type={show ? 'text' : 'password'}
                  placeholder="أدخل كلمة المرور"
                  {...register('password')}
                />

                <InputGroupAddon align="inline-end">
                  {/* ✅ FIX: prevent submit */}
                  <button type="button" onClick={() => setShow(!show)}>
                    {show ? (
                      <EyeOff className="text-muted-foreground" />
                    ) : (
                      <Eye className="text-muted-foreground" />
                    )}
                  </button>
                </InputGroupAddon>
              </InputGroup>

              {errors.password && (
                <FieldError>{errors.password.message}</FieldError>
              )}
            </Field>

            <Button
              variant="default"
              type="button"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl"
            >
              تسجيل الدخول
              <LogIn className="h-4 w-4" />
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <div className="h-px flex-1 bg-gray-200" />
            أو
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white"
          >
            <span className="text-sm text-gray-600">
              المتابعة باستخدام Google
            </span>
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="h-4 w-4"
            />
          </Button>

          <p className="text-center text-sm text-gray-500">
            ليس لديك حساب؟{' '}
            <span className="cursor-pointer text-orange-500">
              إنشاء حساب جديد
            </span>
          </p>
        </CardContent>
      </Card>

      <div className="absolute bottom-24 flex gap-4 text-xs text-gray-400">
        <span>سياسة الخصوصية</span>
        <span>الشروط والأحكام</span>
        <span>اتصل بنا</span>
      </div>
    </div>
  );
};

export default Login;
