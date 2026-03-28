import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ClipboardList,
  Lock,
  RefreshCw,
  Clock,
  CircleCheck,
  Headset,
  ShieldCheck,
  Check,
} from 'lucide-react';
import FeatureCard from '@/components/register/FeatureCard';
import type { Step } from './StepItem';
import StepItem from './StepItem';

// ─── Data ─────────────────────────────────────────────────────────────────────

const steps: Step[] = [
  {
    id: 1,
    label: 'تم الاستلام',
    subLabel: 'مكتمل',
    status: 'completed',
    icon: Check,
  },
  {
    id: 2,
    label: 'جاري التدقيق',
    subLabel: 'قيد التنفيذ',
    status: 'active',
    icon: RefreshCw,
    animate: true,
  },
  {
    id: 3,
    label: 'تفعيل الحساب',
    subLabel: 'في الانتظار',
    status: 'pending',
    icon: Lock,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const ReviewPage = () => {
  return (
    <div className="mx-2 w-full max-w-lg space-y-4">
      {/* ── Main review card ── */}
      <Card className="rounded-2xl text-center drop-shadow-lg drop-shadow-black/5">
        <CardHeader className="items-center pb-0">
          {/* Icon */}
          <div className="relative mx-auto mb-2">
            <div className="bg-card dark:bg-secondary flex h-20 w-20 items-center justify-center rounded-2xl shadow-sm">
              <ClipboardList className="text-primary h-12 w-12" />
            </div>
            {/* Green check badge */}
            <span className="absolute -top-1 -right-1 flex items-center justify-center">
              <CircleCheck className="size-6 fill-green-500 text-white" />
            </span>
          </div>

          <CardTitle className="text-foreground mt-4 text-3xl font-bold">
            طلبك قيد المراجعة
          </CardTitle>

          <CardDescription className="text-muted-foreground mx-auto mt-2 max-w-96 leading-relaxed">
            فريقنا يقوم حالياً بمراجعة بياناتك ووثائقك للتأكد من مطابقتها
            للمعايير. سيتم إشعارك عبر البريد الإلكتروني فور الانتهاء.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 p-0 pt-2">
          {/* ── Status tracker ── */}

          <div className="border-muted w-full space-y-4 border-y p-8">
            {/* Header row */}
            <div className="flex items-center justify-between">
              <span className="text-foreground text-lg font-bold">
                حالة الطلب
              </span>
              <span className="text-primary border-primary/10 flex items-center gap-1.5 rounded-full border bg-amber-100 px-3 py-1 text-xs font-bold">
                <span className="bg-primary/60 h-1.5 w-1.5 animate-pulse rounded-full" />
                جاري التدقيق
              </span>
            </div>

            {/* Steps */}
            <div className="relative flex items-start justify-between px-6">
              {/* connecting line */}
              {steps.map((step) => (
                <StepItem key={step.id} step={step} />
              ))}
            </div>
          </div>
        </CardContent>
        {/* ── Support row ── */}
        <CardFooter className="m-auto">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="text-foreground/70 border-border hover:border-primary hover:text-primary cursor-pointer gap-2 text-sm font-bold transition-colors"
            >
              <Headset className="h-4 w-4" />
              تواصل مع الدعم
            </Button>
            <p className="text-muted-foreground text-sm font-medium">
              هل تحتاج مساعدة في تعديل البيانات؟
            </p>
          </div>
        </CardFooter>
      </Card>

      {/* ── Bottom info cards ── */}

      <div className="grid gap-4 md:grid-cols-2">
        <FeatureCard
          icon={<Clock className="h-5 w-5 text-blue-700" />}
          title="وقت المراجعة المتوقع"
          desc="تستغرق عملية المراجعة عادة ما بين 24 إلى 48 ساعة عمل."
        />
        <FeatureCard
          icon={<ShieldCheck className="h-5 w-5 text-green-700" />}
          title="أمان البيانات"
          desc="جميع مستنداتك مشفرة ومحفوظة بأعلى معايير الأمان."
        />
      </div>
    </div>
  );
};

export default ReviewPage;
