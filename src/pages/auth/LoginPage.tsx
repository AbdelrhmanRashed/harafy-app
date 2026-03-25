import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { Button } from "@/components/ui/button";

import {
  Mail,
  LogIn,
  Eye,
  EyeOff
} from "lucide-react";


// ✅ schema
const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

type LoginForm = z.infer<typeof loginSchema>;


const Login = () => {
  const [show, setShow] = useState(false);

  // ✅ form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  // ✅ submit
  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6]">

      <Card className="w-105 rounded-2xl shadow-xl border-0 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-primary" />

        <CardContent className="p-8 space-y-6">

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Title */}
            <div className="text-center space-y-1">
              <h1 className="text-xl font-bold text-gray-800">
                تسجيل الدخول
              </h1>
              <p className="text-sm text-gray-500">
                مرحباً بعودتك! يرجى إدخال بياناتك للمتابعة
              </p>
            </div>

            {/* Email */}
            <Field>
              <FieldLabel>البريد الإلكتروني</FieldLabel>

              <InputGroup
                className={`px-2 h-11 bg-gray-100 rounded-xl border transition
                  ${errors.email ? "border-red-500" : "border-gray-200"}
                  focus-within:border-0`}
              >
                <InputGroupInput
                  placeholder="name@example.com"
                  {...register("email")}
                />
                <InputGroupAddon align="inline-end">
                  <Mail className="text-muted-foreground" />
                </InputGroupAddon>
              </InputGroup>

              {errors.email && (
                <FieldError>{errors.email.message}</FieldError>
              )}
            </Field>

            {/* Password */}
            <Field>
              <div className="flex justify-between text-sm text-gray-600">
                <FieldLabel>كلمة المرور</FieldLabel>
                <span className="text-gray-400 cursor-pointer">
                  نسيت كلمة المرور؟
                </span>
              </div>

              <InputGroup
                className={`px-2 h-11 bg-gray-100 rounded-xl border transition
                  ${errors.password ? "border-red-500" : "border-gray-200"}
                  focus-within:border-0`}
              >
                <InputGroupInput
                  type={show ? "text" : "password"}
                  placeholder="أدخل كلمة المرور"
                  {...register("password")}
                />

                <InputGroupAddon align="inline-end">
                  {/* ✅ FIX: prevent submit */}
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                  >
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
              type="submit"
              className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 flex items-center justify-center gap-2"
            >
              تسجيل الدخول
              <LogIn className="w-4 h-4" />
            </Button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 text-gray-400 text-sm">
            <div className="flex-1 h-px bg-gray-200" />
            أو
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full h-11 rounded-xl bg-white flex items-center justify-center gap-2"
          >
            <span className="text-sm text-gray-600">
              المتابعة باستخدام Google
            </span>
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-4 h-4"
            />
          </Button>

          <p className="text-sm text-center text-gray-500">
            ليس لديك حساب؟{" "}
            <span className="text-orange-500 cursor-pointer">
              إنشاء حساب جديد
            </span>
          </p>

        </CardContent>
      </Card>

      <div className="absolute bottom-24 text-xs text-gray-400 flex gap-4">
        <span>سياسة الخصوصية</span>
        <span>الشروط والأحكام</span>
        <span>اتصل بنا</span>
      </div>

    </div>
  );
};

export default Login;