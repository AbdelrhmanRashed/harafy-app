import { Wallet, CreditCard, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import { useGetProviderHisProfile } from '@/features/profile/hooks/useGetProviderHisProfile';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Creadit = () => {
  const { data: profile, isLoading } = useGetProviderHisProfile();

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 lg:px-8" dir="rtl">
      {/* ── Header ── */}
      <div>
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl text-foreground">
          المحفظة
        </h1>
        <p className="mt-2 text-base font-medium text-muted-foreground">
          تابع رصيدك الحالي وحركاتك المالية بكل سهولة.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* ── Main Balance Card ── */}
        <div className="lg:col-span-2">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-tr from-emerald-600 to-teal-400 p-8 text-white shadow-2xl shadow-emerald-500/20">
            {/* Background elements */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-black/20 blur-2xl" />
            <Wallet className="absolute -bottom-4 left-4 h-32 w-32 text-white/10 opacity-50" />
            
            <div className="relative z-10">
              <p className="text-sm font-semibold tracking-wide text-emerald-50">
                الرصيد المتاح
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-5xl font-black tracking-tight sm:text-6xl">
                  {isLoading ? '...' : profile?.credits ?? 0}
                </span>
                <span className="text-xl font-bold text-emerald-100">جنيه</span>
              </div>
              
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button className="flex h-12 items-center gap-2 rounded-2xl bg-white px-6 font-bold text-emerald-600 hover:bg-emerald-50 shadow-lg cursor-pointer transition-all hover:scale-105">
                  <CreditCard className="h-5 w-5" />
                  شحن الرصيد
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Quick Stats ── */}
        <div className="flex flex-col gap-4">
          <Card className="rounded-3xl border-0 shadow-[0_2px_20px_rgb(0,0,0,0.04)] bg-white dark:bg-slate-900">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <ArrowDownToLine className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground">إجمالي الإيداعات</p>
                <p className="text-xl font-black text-foreground">0 جنيه</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="rounded-3xl border-0 shadow-[0_2px_20px_rgb(0,0,0,0.04)] bg-white dark:bg-slate-900">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                <ArrowUpFromLine className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground">المنصرف (عمولات)</p>
                <p className="text-xl font-black text-foreground">0 جنيه</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── Recent Transactions ── */}
      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-black text-foreground">أحدث المعاملات</h2>
        <Card className="rounded-3xl border-0 shadow-[0_2px_20px_rgb(0,0,0,0.04)]">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary/50">
              <Wallet className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <p className="text-lg font-bold text-foreground">لا توجد معاملات بعد</p>
            <p className="mt-1 text-sm text-muted-foreground">
              سجل معاملاتك المالية سيظهر هنا فور بدايتك.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Creadit;