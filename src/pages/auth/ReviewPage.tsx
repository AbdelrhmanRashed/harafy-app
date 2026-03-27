import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ClipboardList,
  Lock,
  RefreshCw,
  Clock,
  CircleCheck,
  Headset,
  ShieldCheck,
  Check,
} from "lucide-react";
import FeatureCard from "@/components/register/FeatureCard";
import type { Step } from "./StepItem";
import StepItem from "./StepItem";



// ─── Data ─────────────────────────────────────────────────────────────────────

const steps: Step[] = [
  {
    id: 1,
    label: "تم الاستلام",
    sublabel: "مكتمل",
    status: "completed",
    icon: <Check  className="h-5 w-5 " />,
  },
  {
    id: 2,
    label: "جاري التدقيق",
    sublabel: "قيد التنفيذ",
    status: "active",
    icon: <RefreshCw className="h-5 w-5" />,
  },
  {
    id: 3,
    label: "تفعيل الحساب",
    sublabel: "في الانتظار",
    status: "pending",
    icon: <Lock className="h-5 w-5" />,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const ReviewPage = () => {
  return (
    <div
      dir="rtl"
      className="min-h-screen  bg-secondary  flex items-center justify-center p-4"
    >
      <div className="w-full max-w-lg  space-y-4">
        {/* ── Main review card ── */}
        <Card className="text-center bg-muted/10 rounded-2xl  drop-shadow-lg drop-shadow-black/5">
          <CardHeader className="items-center pb-0">
            {/* Icon */}
            <div className="relative mx-auto mb-2">
              <div className="w-20 h-18 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                <ClipboardList className="h-12 w-12 text-primary" />
              </div>
              {/* Green check badge */}
              <span className="absolute -top-1 -right-1 flex items-center justify-center">
                <CircleCheck className="h-6 w-6 text-white fill-green-500" />
              </span>
            </div>

            <CardTitle className="text-3xl font-bold text-foreground mt-4">
              طلبك قيد المراجعة
            </CardTitle>

            <CardDescription className="text-muted-foreground max-w-96 mx-auto mt-2 leading-relaxed">
              فريقنا يقوم حالياً بمراجعة بياناتك ووثائقك للتأكد من مطابقتها
              للمعايير. سيتم إشعارك عبر البريد الإلكتروني فور الانتهاء.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 p-0 pt-2 ">
            {/* ── Status tracker ── */}
            <div className="border bg-muted/30 p-8 space-y-4 w-full">
              {/* Header row */}
              <div className="flex items-center justify-between">
                 <span className="text-lg font-bold text-foreground">
                  حالة الطلب
                </span>
                <span className="flex items-center gap-1.5 bg-amber-100 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" />
                  جاري التدقيق
                </span>
              </div>

              {/* Steps */}
             <div className="flex items-start justify-between relative px-6">
                {/* connecting line */}
                {steps.map((step) => (
                  <StepItem key={step.id} step={step} /> 
                ))}
              </div> 
            </div>

            {/* ── Support row ── */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                className="text-sm font-bold text-foreground/70 gap-2 border-border hover:border-primary hover:text-primary transition-colors"
              >
                <Headset  className="h-4 w-4" />
                تواصل مع الدعم
              </Button>
              <p className="text-sm font-medium text-muted-foreground">
                هل تحتاج مساعدة في تعديل البيانات؟
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ── Bottom info cards ── */}

        <div className="grid grid-cols-2 gap-4">
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
    </div>
  );
}


export default ReviewPage;

