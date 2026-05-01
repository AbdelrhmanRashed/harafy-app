import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Ban, Loader2, LogOut } from 'lucide-react';
import { useLogout } from '@/features/auth/hooks/useLogout';

const SuspendedPage = () => {
  const { mutate: logout, isPending } = useLogout();

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-50 p-4 dark:bg-zinc-950"
      dir="rtl"
    >
      {/* Background radial gradient accent */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-600/10 blur-[100px] dark:bg-rose-600/20" />

      {/* Decorative patterns */}
      <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-rose-200/40 via-transparent to-transparent dark:from-rose-900/40" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 bg-[radial-gradient(circle_at_bottom_left,var(--tw-gradient-stops))] from-rose-200/40 via-transparent to-transparent dark:from-rose-900/40" />

      <Card className="relative z-10 w-full max-w-md border-zinc-200 bg-white/80 shadow-xl shadow-rose-900/5 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80 dark:shadow-2xl dark:shadow-rose-900/20">
        <CardHeader className="pb-2 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-rose-100 shadow-inner ring-8 ring-rose-50 dark:bg-rose-950/50 dark:ring-rose-900/20">
            <Ban className="h-10 w-10 text-rose-600 dark:text-rose-400" />
          </div>
          <CardTitle className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            تم إيقاف حسابك
          </CardTitle>
          <CardDescription className="text-sm text-zinc-500 md:text-base dark:text-zinc-400">
            لقد تم حظر حسابك من استخدام المنصة
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2 pb-8 text-center">
          <p className="mx-auto max-w-[280px] text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            يبدو أنه تم إيقاف حسابك نتيجة لمخالفة شروط الاستخدام. إذا كنت تعتقد
            أن هذا حدث عن طريق الخطأ، يرجى التواصل مع فريق الدعم.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            variant="outline"
            className="h-11 w-full cursor-pointer border-rose-200 text-rose-700 hover:bg-rose-50 hover:text-rose-800 dark:border-rose-800 dark:text-rose-400 dark:hover:bg-rose-950/50"
            onClick={() => logout()}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                جاري تسجيل الخروج...
              </>
            ) : (
              <>
                <LogOut className="ml-2 h-4 w-4" />
                <span>تسجيل الخروج</span>
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SuspendedPage;
