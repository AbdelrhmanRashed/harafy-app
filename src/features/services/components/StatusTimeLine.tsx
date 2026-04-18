import { CheckCircle2, Send, Settings, UserCog, X } from 'lucide-react';
import { ServiceStatus } from '@/constants/service-status';

const StatusTimeLine = ({ currentStep }: { currentStep: number }) => {
  const isCancelled = currentStep === ServiceStatus.CANCELLED;
  const isCompletedState = currentStep === ServiceStatus.COMPLETED;
  const isEndState = isCancelled || isCompletedState;

  const STEPS = [
    { id: ServiceStatus.OPEN, label: 'تم الإرسال', icon: Send },
    {
      id: ServiceStatus.ASSIGNED,
      label: 'انتظار رد الحرفى',
      icon: UserCog,
    },
    { id: ServiceStatus.IN_PROGRESS, label: 'قيد التنفيذ', icon: Settings },
    isCancelled
      ? { id: ServiceStatus.CANCELLED, label: 'تم الإلغاء', icon: X }
      : {
          id: ServiceStatus.COMPLETED,
          label: 'تم الإنجاز',
          icon: CheckCircle2,
        },
  ];

  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);
  const safeStepIndex = currentStepIndex !== -1 ? currentStepIndex : 0;

  return (
    <div className="w-full px-2">
      <div className="relative flex items-start justify-between">
        {/* Connecting line */}
        <div className="bg-border absolute top-5 right-5 left-5 h-px" />
        <div
          className={`absolute top-5 right-5 h-0.5 transition-all duration-700 ${
            isCancelled
              ? 'bg-destructive'
              : isCompletedState
                ? 'bg-green-500'
                : 'bg-primary'
          }`}
          style={{
            width: `${(safeStepIndex / (STEPS.length - 1)) * 100}%`,
          }}
        />

        {STEPS.map((step, index) => {
          const isCompleted = index < safeStepIndex;
          const isActive = index === safeStepIndex;
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center gap-2"
            >
              {/* Circle */}
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                  isCompleted
                    ? isCompletedState
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'bg-primary border-primary text-card'
                    : isActive
                      ? isCancelled
                        ? 'border-destructive text-destructive bg-card shadow-destructive/20 shadow-md'
                        : isCompletedState
                          ? 'bg-card border-green-500 text-green-500 shadow-md shadow-green-500/20'
                          : 'border-primary text-primary bg-card shadow-primary/20 shadow-md'
                      : 'bg-muted border-border text-muted-foreground'
                }`}
              >
                {isActive && !isEndState && (
                  <span className="bg-primary/20 absolute h-10 w-10 animate-ping rounded-full" />
                )}
                <Icon className="relative z-10 h-4 w-4" />
              </div>

              {/* Label */}
              <span
                className={`text-center text-[11px] leading-tight font-bold ${
                  isActive
                    ? isCancelled
                      ? 'text-destructive'
                      : isCompletedState
                        ? 'text-green-600'
                        : 'text-primary'
                    : isCompleted
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusTimeLine;
