import React, { useState } from "react";
import { 
  MessageSquareText, ShieldCheck, Zap, Star, 
  CheckCircle2, Target, ChevronLeft, Search, Clock,
  StarHalf
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type RequestStatus = "sent" | "confirmed" | "in_progress" | "completed";

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
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");

  const activeRequest: ServiceRequest = {
    id: "HRF-8821",
    title: "صيانة تكييف مركزي",
    providerName: "م. أحمد السعدي",
    providerImage: "https://avatar.vercel.sh/ahmed",
    profession: "أخصائي صيانة تكييف مركزي",
    status: "in_progress",
    date: "12 ديسمبر",
    price: 0,
    icon: Zap
  };

  const historyRequests: ServiceRequest[] = [
    {
        id: "101", title: "تنظيف عميق للمنزل", status: "completed",
        date: "14 أكتوبر", price: 450, icon: ShieldCheck,
        isRated: false,
        providerName: "",
        providerImage: "",
        profession: ""
    },
    {
        id: "102", title: "إصلاح تسربات المياه", status: "completed",
        date: "02 أكتوبر", price: 220, icon: Zap,
        isRated: true, rating: 5,
        providerName: "",
        providerImage: "",
        profession: ""
    },
    {
        id: "103", title: "تركيب إضاءة ذكية", status: "completed",
        date: "25 سبتمبر", price: 180, icon: Target,
        isRated: false,
        providerName: "",
        providerImage: "",
        profession: ""
    },
  ];

  return (
    <main className="max-w-2xl mx-auto px-8 py-12 space-y-10 font-[Cairo,sans-serif]">
      
      {/* Title Section */}
      <div className="text-right space-y-2">
        <h1 className="text-3xl font-black text-slate-900">طلباتي</h1>
        <p className="text-sm text-slate-400 font-bold">تابع حالة خدماتك الحالية واستعرض سجل تعاملاتك السابقة</p>
      </div>

      {/* Tabs Switcher */}
      <div className="bg-slate-100/80 p-1.5 rounded-2xl flex items-center shadow-inner max-w-sm ml-auto">
        <button 
          onClick={() => setActiveTab("history")}
          className={cn(
            "flex-1 py-3 text-xs font-bold transition-all rounded-xl",
            activeTab === "history" ? "bg-white text-primary shadow-sm" : "text-slate-400"
          )}
        >
          سجل الطلبات
        </button>
        <button 
          onClick={() => setActiveTab("active")}
          className={cn(
            "flex-1 py-3 text-xs font-bold transition-all rounded-xl",
            activeTab === "active" ? "bg-white text-primary shadow-sm" : "text-slate-400"
          )}
        >
          الطلبات النشطة
        </button>
      </div>

      {/* Active Request Card */}
      {activeTab === "active" && (
        <Card className="rounded-[3rem] border-none shadow-2xl shadow-slate-200/50 overflow-hidden bg-white">
          <CardContent className="p-8 space-y-8">
            <div className="flex items-center justify-between">
              <Badge className="bg-primary/5 text-primary border-none px-4 py-1.5 text-xs font-black">
                 جاري التنفيذ
              </Badge>
              <span className="text-xs font-bold text-slate-300">#{activeRequest.id}</span>
            </div>

            <div className="flex items-center gap-4 flex-row-reverse">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden shrink-0 shadow-sm border border-slate-50">
                <img src={activeRequest.providerImage} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="text-right flex-1">
                <h3 className="text-lg font-black text-slate-900">{activeRequest.providerName}</h3>
                <p className="text-sm text-slate-400 font-bold">{activeRequest.profession}</p>
              </div>
            </div>

            <div className="relative pt-4 pb-2">
              <div className="flex justify-between w-full relative z-10">
                {["إرسال الطلب", "تأكيد الموعد", "جاري العمل", "تم التسليم"].map((label, i) => {
                  const currentStep = getStatusStep(activeRequest.status);
                  const isDone = i + 1 < currentStep;
                  const isActive = i + 1 === currentStep;

                  return (
                    <div key={label} className="flex flex-col items-center gap-3 flex-1">
                      <div className={cn(
                        "w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all",
                        isDone ? "bg-primary border-primary shadow-lg shadow-primary/20" : isActive ? "bg-white border-primary text-primary" : "bg-slate-50 border-slate-100 text-slate-300"
                      )}>
                        {isDone ? <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={3} /> : <Clock className="w-4 h-4" />}
                      </div>
                      <span className={cn("text-[11px] font-black text-center px-1", isActive || isDone ? "text-slate-900" : "text-slate-300")}>{label}</span>
                    </div>
                  );
                })}
              </div>
              <div className="absolute top-[18px] left-0 w-full h-[3px] bg-slate-100 -z-0" />
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1 h-14 rounded-2xl text-sm font-bold border-slate-100 text-slate-600 hover:bg-slate-50">
                 مراسلة الفني
              </Button>
              <Button variant="gradient" className="flex-[2] h-14 rounded-2xl text-base font-bold shadow-primary-gradient">
                عرض تفاصيل الطلب
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completed Section with Rating Button */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <button className="text-sm font-bold text-primary hover:underline">عرض الكل</button>
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">الطلبات المكتملة</h4>
        </div>

        <div className="grid gap-4">
          {historyRequests.map((req) => (
            <div key={req.id} className="bg-white p-5 rounded-[2rem] flex items-center justify-between border border-slate-100/80 shadow-sm hover:shadow-md transition-all">
               {/* button to rate the request */}
               <div className="shrink-0 min-w-[120px] flex justify-start">
                  {req.isRated ? (
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn("w-4 h-4", i < (req.rating || 0) ? "fill-amber-400 text-amber-400" : "text-slate-200")} />
                      ))}
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="text-[11px] font-black h-10 px-5 rounded-full border-primary/20 text-primary hover:bg-primary/5 hover:border-primary transition-colors"
                    >
                      تقييم الخدمة
                    </Button>
                  )}
               </div>

               {/* service details */}
               <div className="text-right flex-1 pr-6">
                  <p className="text-base font-bold text-slate-800">{req.title}</p>
                  <p className="text-xs text-slate-400 font-bold mt-1">
                    <span className="text-primary/80 font-black">{req.price} ر.س</span>
                    <span className="mx-2 text-slate-200">|</span>
                    {req.date}
                  </p>
               </div>

               {/* icon */}
               <div className={cn(
                 "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-slate-50 shadow-inner bg-slate-50/50"
               )}>
                  <req.icon className="w-6 h-6 text-primary/70" strokeWidth={2.5} />
               </div>

            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-primary/5 border border-primary/10 p-10 rounded-[3rem] flex flex-col items-center gap-4 text-center">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md border border-primary/5">
          <Search className="w-7 h-7 text-primary" />
        </div>
        <p className="text-sm font-bold text-slate-500 max-w-[250px] leading-relaxed">هل تحتاج إلى خدمة أخرى اليوم؟ استكشف الخدمات المتاحة الآن</p>
        <button className="text-base font-black text-primary flex items-center gap-1.5 hover:gap-3 transition-all">
          استكشف الخدمات
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

    </main>
  );
};

export default MyRequestsView;