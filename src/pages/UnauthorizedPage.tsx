import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ShieldAlert, Home } from 'lucide-react';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-50 p-4 dark:bg-zinc-950"
      dir="rtl"
    >
      {/* Background radial gradient accent */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[100px] dark:bg-indigo-600/20" />

      {/* Decorative patterns */}
      <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-indigo-200/40 via-transparent to-transparent dark:from-indigo-900/40" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 bg-[radial-gradient(circle_at_bottom_left,var(--tw-gradient-stops))] from-indigo-200/40 via-transparent to-transparent dark:from-indigo-900/40" />

      <Card className="relative z-10 w-full max-w-md border-zinc-200 bg-white/80 shadow-xl shadow-indigo-900/5 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80 dark:shadow-2xl dark:shadow-indigo-900/20">
        <CardHeader className="pb-2 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 shadow-inner ring-8 ring-indigo-50 dark:bg-indigo-950/50 dark:ring-indigo-900/20">
            <ShieldAlert className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
          </div>
          <CardTitle className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            غير مصرح بالوصول
          </CardTitle>
          <CardDescription className="text-sm text-zinc-500 md:text-base dark:text-zinc-400">
            ليس لديك الصلاحية للوصول إلى هذه الصفحة
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2 pb-8 text-center">
          <p className="mx-auto max-w-[280px] text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            يرجى تسجيل الدخول بحساب يملك صلاحيات مناسبة أو العودة للصفحة
            الرئيسية
          </p>
        </CardContent>
        <CardFooter className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            variant="gradient"
            className="h-11 w-full"
            onClick={() => navigate('/')}
          >
            <Home className="ml-2 h-4 w-4" />
            العودة إلى الرئيسية
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UnauthorizedPage;
