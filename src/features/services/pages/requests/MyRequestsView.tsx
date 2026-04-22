import { useState } from 'react';
import {
  ShieldCheck,
  Zap,
  Star,
  CheckCircle2,
  Target,
  ChevronLeft,
  Search,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type RequestStatus = 'sent' | 'confirmed' | 'in_progress' | 'completed';

interface ServiceRequest {
  id: string;
  title: string;
  providerName: string;
  providerImage: string;
  profession: string;
  status: RequestStatus;
  date: string;
  price: number;
  icon: any;
  isRated?: boolean;
  rating?: number;
}

const getStatusStep = (status: RequestStatus): number => {
  const steps: Record<RequestStatus, number> = {
    sent: 1,
    confirmed: 2,
    in_progress: 3,
    completed: 4,
  };
  return steps[status];
};

const MyRequestsView = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  const activeRequest: ServiceRequest = {
    id: 'HRF-8821',
    title: 'صيانة تكييف مركزي',
    providerName: 'م. أحمد السعدي',
    providerImage: 'https://avatar.vercel.sh/ahmed',
    profession: 'أخصائي صيانة تكييف مركزي',
    status: 'in_progress',
    date: '12 ديسمبر',
    price: 0,
    icon: Zap,
  };

  const historyRequests: ServiceRequest[] = [
    {
      id: '101',
      title: 'تنظيف عميق للمنزل',
      status: 'completed',
      date: '14 أكتوبر',
      price: 450,
      icon: ShieldCheck,
      isRated: false,
      providerName: '',
      providerImage: '',
      profession: '',
    },
    {
      id: '102',
      title: 'إصلاح تسربات المياه',
      status: 'completed',
      date: '02 أكتوبر',
      price: 220,
      icon: Zap,
      isRated: true,
      rating: 5,
      providerName: '',
      providerImage: '',
      profession: '',
    },
    {
      id: '103',
      title: 'تركيب إضاءة ذكية',
      status: 'completed',
      date: '25 سبتمبر',
      price: 180,
      icon: Target,
      isRated: false,
      providerName: '',
      providerImage: '',
      profession: '',
    },
  ];

  return (
    <main className="mx-auto max-w-2xl space-y-10 px-8 py-12 font-[Cairo,sans-serif]">
      {/* Title Section */}
      <div className="space-y-2 text-right">
        <h1 className="text-3xl font-black text-slate-900">طلباتي</h1>
        <p className="text-sm font-bold text-slate-400">
          تابع حالة خدماتك الحالية واستعرض سجل تعاملاتك السابقة
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="ml-auto flex max-w-sm items-center rounded-2xl bg-slate-100/80 p-1.5 shadow-inner">
        <button
          onClick={() => setActiveTab('history')}
          className={cn(
            'flex-1 rounded-xl py-3 text-xs font-bold transition-all',
            activeTab === 'history'
              ? 'text-primary bg-white shadow-sm'
              : 'text-slate-400',
          )}
        >
          سجل الطلبات
        </button>
        <button
          onClick={() => setActiveTab('active')}
          className={cn(
            'flex-1 rounded-xl py-3 text-xs font-bold transition-all',
            activeTab === 'active'
              ? 'text-primary bg-white shadow-sm'
              : 'text-slate-400',
          )}
        >
          الطلبات النشطة
        </button>
      </div>

      {/* Active Request Card */}
      {activeTab === 'active' && (
        <Card className="overflow-hidden rounded-[3rem] border-none bg-white shadow-2xl shadow-slate-200/50">
          <CardContent className="space-y-8 p-8">
            <div className="flex items-center justify-between">
              <Badge className="bg-primary/5 text-primary border-none px-4 py-1.5 text-xs font-black">
                جاري التنفيذ
              </Badge>
              <span className="text-xs font-bold text-slate-300">
                #{activeRequest.id}
              </span>
            </div>

            <div className="flex flex-row-reverse items-center gap-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-slate-50 bg-slate-100 shadow-sm">
                <img
                  src={activeRequest.providerImage}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 text-right">
                <h3 className="text-lg font-black text-slate-900">
                  {activeRequest.providerName}
                </h3>
                <p className="text-sm font-bold text-slate-400">
                  {activeRequest.profession}
                </p>
              </div>
            </div>

            <div className="relative pt-4 pb-2">
              <div className="relative z-10 flex w-full justify-between">
                {[
                  'إرسال الطلب',
                  'تأكيد الموعد',
                  'جاري العمل',
                  'تم التسليم',
                ].map((label, i) => {
                  const currentStep = getStatusStep(activeRequest.status);
                  const isDone = i + 1 < currentStep;
                  const isActive = i + 1 === currentStep;

                  return (
                    <div
                      key={label}
                      className="flex flex-1 flex-col items-center gap-3"
                    >
                      <div
                        className={cn(
                          'flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all',
                          isDone
                            ? 'bg-primary border-primary shadow-primary/20 shadow-lg'
                            : isActive
                              ? 'border-primary text-primary bg-white'
                              : 'border-slate-100 bg-slate-50 text-slate-300',
                        )}
                      >
                        {isDone ? (
                          <CheckCircle2
                            className="h-5 w-5 text-white"
                            strokeWidth={3}
                          />
                        ) : (
                          <Clock className="h-4 w-4" />
                        )}
                      </div>
                      <span
                        className={cn(
                          'px-1 text-center text-[11px] font-black',
                          isActive || isDone
                            ? 'text-slate-900'
                            : 'text-slate-300',
                        )}
                      >
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="absolute top-[18px] left-0 -z-0 h-[3px] w-full bg-slate-100" />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="h-14 flex-1 rounded-2xl border-slate-100 text-sm font-bold text-slate-600 hover:bg-slate-50"
              >
                مراسلة الفني
              </Button>
              <Button
                variant="gradient"
                className="shadow-primary-gradient h-14 flex-[2] rounded-2xl text-base font-bold"
              >
                عرض تفاصيل الطلب
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completed Section with Rating Button */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <button className="text-primary text-sm font-bold hover:underline">
            عرض الكل
          </button>
          <h4 className="text-xs font-black tracking-widest text-slate-400 uppercase">
            الطلبات المكتملة
          </h4>
        </div>

        <div className="grid gap-4">
          {historyRequests.map((req) => (
            <div
              key={req.id}
              className="flex items-center justify-between rounded-[2rem] border border-slate-100/80 bg-white p-5 shadow-sm transition-all hover:shadow-md"
            >
              {/* button to rate the request */}
              <div className="flex min-w-[120px] shrink-0 justify-start">
                {req.isRated ? (
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'h-4 w-4',
                          i < (req.rating || 0)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-200',
                        )}
                      />
                    ))}
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="border-primary/20 text-primary hover:bg-primary/5 hover:border-primary h-10 rounded-full px-5 text-[11px] font-black transition-colors"
                  >
                    تقييم الخدمة
                  </Button>
                )}
              </div>

              {/* service details */}
              <div className="flex-1 pr-6 text-right">
                <p className="text-base font-bold text-slate-800">
                  {req.title}
                </p>
                <p className="mt-1 text-xs font-bold text-slate-400">
                  <span className="text-primary/80 font-black">
                    {req.price} ر.س
                  </span>
                  <span className="mx-2 text-slate-200">|</span>
                  {req.date}
                </p>
              </div>

              {/* icon */}
              <div
                className={cn(
                  'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-50 bg-slate-50/50 shadow-inner',
                )}
              >
                <req.icon
                  className="text-primary/70 h-6 w-6"
                  strokeWidth={2.5}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-primary/5 border-primary/10 flex flex-col items-center gap-4 rounded-[3rem] border p-10 text-center">
        <div className="border-primary/5 flex h-14 w-14 items-center justify-center rounded-2xl border bg-white shadow-md">
          <Search className="text-primary h-7 w-7" />
        </div>
        <p className="max-w-[250px] text-sm leading-relaxed font-bold text-slate-500">
          هل تحتاج إلى خدمة أخرى اليوم؟ استكشف الخدمات المتاحة الآن
        </p>
        <button className="text-primary flex items-center gap-1.5 text-base font-black transition-all hover:gap-3">
          استكشف الخدمات
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>
    </main>
  );
};

export default MyRequestsView;
