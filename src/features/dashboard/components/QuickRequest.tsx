import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Zap, ArrowRight, Loader2, Activity, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useActiveRequest } from '@/hooks/useActiveRequest';
import { cn } from '@/lib/utils';

const QuickRequest = () => {
  const navigate = useNavigate();
  const { request, isLoading } = useActiveRequest();

  const hasActiveRequest = request && request.requestStatus !== 3;

  return (
    <Card
      className={cn(
        'relative flex h-[300px] flex-col items-start justify-between gap-4 overflow-hidden rounded-2xl border-none p-8 transition-all duration-500',
        hasActiveRequest
          ? 'ring-primary/50 animate-in fade-in zoom-in-95 bg-card border-primary/20 border-2 shadow-xl dark:bg-slate-950'
          : 'bg-primary text-primary-foreground shadow-lg',
      )}
    >
      {/* Background Decorative Icon */}
      <Zap
        className={cn(
          'pointer-events-none absolute top-0 left-0 h-72 w-72 -translate-x-16 -translate-y-16 rotate-12 transition-all duration-700',
          hasActiveRequest
            ? 'fill-primary/5 text-primary/5 opacity-50'
            : 'fill-white/10 text-white/10',
        )}
        strokeWidth={1}
      />

      <div className="relative z-10 flex w-full flex-col items-start gap-2">
        <div className="mb-2 flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            {hasActiveRequest ? (
              <div className="relative">
                <Activity className="text-primary h-8 w-8 animate-pulse" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center">
                  <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                  <span className="bg-primary relative inline-flex h-2 w-2 rounded-full"></span>
                </span>
              </div>
            ) : (
              <div className="rounded-full bg-white/20 p-2">
                <Zap className="h-6 w-6 fill-white text-white" />
              </div>
            )}
            <h3
              className={cn(
                'text-2xl font-bold transition-colors md:text-3xl',
                hasActiveRequest ? 'text-foreground' : 'text-white',
              )}
            >
              {hasActiveRequest ? 'طلبك نشط الآن' : 'طلب فوري'}
            </h3>
          </div>

          {hasActiveRequest && (
            <span className="bg-primary/10 text-primary border-primary/20 hidden animate-pulse rounded-full border px-3 py-1 text-xs font-medium md:block">
              جاري التنفيذ...
            </span>
          )}
        </div>

        <p
          className={cn(
            'max-w-[350px] text-lg leading-relaxed transition-colors',
            hasActiveRequest ? 'text-muted-foreground' : 'text-white/80',
          )}
        >
          {hasActiveRequest
            ? 'نحن نتابع طلبك مع الحرفي، يمكنك رؤية التفاصيل لحظة بلحظة.'
            : 'احصل على حرفي الآن بأسرع وقت ممكن للمهام العاجلة والطارئة.'}
        </p>
      </div>

      <div className="relative z-10 w-full md:w-auto">
        {isLoading ? (
          <Button
            disabled
            className="w-full rounded-2xl px-8 py-7 text-xl font-bold md:w-auto"
          >
            <Loader2 className="ml-2 h-5 w-5 animate-spin" />
            جاري التحميل...
          </Button>
        ) : hasActiveRequest ? (
          <Button
            variant="default"
            size="lg"
            className="group w-full cursor-pointer rounded-2xl px-10 py-8 text-xl font-bold shadow-lg transition-all hover:scale-[1.02] active:scale-95 md:w-auto"
            onClick={() =>
              navigate(`/app/services/instant?requestId=${request.id}`)
            }
          >
            <span>متابعة الطلب</span>
            <ArrowLeft className="mr-2 h-6 w-6 transition-transform group-hover:-translate-x-2" />
          </Button>
        ) : (
          <Button
            variant="secondary"
            className="text-primary w-full cursor-pointer rounded-2xl bg-white px-8 py-7 text-xl font-bold shadow-md transition-all hover:scale-[1.02] hover:bg-white/90 md:w-auto"
            onClick={() => navigate('/app/services/instant')}
          >
            ابدأ الطلب الفوري
          </Button>
        )}
      </div>

      {/* Subtle border glow for active state - works in both modes */}
      {hasActiveRequest && (
        <div className="border-primary/20 pointer-events-none absolute inset-0 animate-pulse rounded-2xl border-2 shadow-[inset_0_0_20px_rgba(var(--primary),0.05)]" />
      )}
    </Card>
  );
};

export default QuickRequest;
