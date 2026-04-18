import { CalendarCheck2, Sparkles } from 'lucide-react';

export const RequestsTableHero = () => {
  return (
    <div className="group border-border/50 bg-card relative mb-10 overflow-hidden rounded-3xl border p-1">
      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-start justify-between gap-8 overflow-hidden rounded-[calc(var(--radius-3xl)-4px)] bg-linear-to-br p-8 md:flex-row md:items-center md:p-12">
        <div className="space-y-5">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-5">
              <div className="bg-primary-gradient shadow-primary-gradient flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:rotate-6">
                <CalendarCheck2 className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-foreground text-3xl font-black tracking-tight drop-shadow-sm md:text-4xl">
                إدارة الطلبات
              </h1>
            </div>

            <p className="text-muted-foreground max-w-xl text-lg leading-relaxed font-medium">
              قم بمتابعة حالة طلباتك، الاطلاع على{' '}
              <span className="text-primary decoration-primary/30 font-bold underline decoration-2 underline-offset-4">
                طلباتك
              </span>
              ، ومراجعة لوحة التحكم في مكان واحد ذكي ومنظم.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
