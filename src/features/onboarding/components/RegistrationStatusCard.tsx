import { useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const STEPS = [
  { id: 1, label: 'المعلومات الشخصية', path: '/onboarding/user-profile' },
  {
    id: 2,
    label: 'بيانات المهنة و التراخيص',
    path: '/onboarding/verification',
  },
  { id: 3, label: 'المراجعة والاعتماد', path: '/onboarding/review' },
];

const RegistrationStatusCard = () => {
  const location = useLocation();

  const currentStepIndex = STEPS.findIndex((step) =>
    location.pathname.includes(step.path),
  );

  const activeStep = currentStepIndex !== -1 ? currentStepIndex + 1 : 1;

  const progressValue = Math.round((activeStep / STEPS.length) * 100);

  return (
    <Card className="border-border/60 rounded-xl p-6 shadow-sm">
      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-foreground text-sm font-bold">
            حالة التسجيل
          </span>
          <span className="text-primary text-sm font-bold">
            {progressValue}%
          </span>
        </div>
        <Progress
          value={progressValue}
          className="bg-secondary h-2 w-full rtl:rotate-180"
        />
      </div>

      {/* Steps List */}
      <div className="space-y-4">
        {STEPS.map((step) => {
          const isCompleted = activeStep > step.id;
          const isActive = activeStep === step.id;

          return (
            <div key={step.id} className="flex items-center gap-3">
              <div className="flex items-center justify-center transition-all duration-300">
                {isCompleted ? (
                  <div className="flex size-6 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    <Check size={14} strokeWidth={3} />
                  </div>
                ) : (
                  <Badge
                    variant={isActive ? 'default' : 'outline'}
                    className={cn(
                      'flex size-6 shrink-0 items-center justify-center rounded-full p-0 font-bold transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'text-muted-foreground border-muted-foreground/30',
                    )}
                  >
                    {step.id}
                  </Badge>
                )}
              </div>

              <span
                className={cn(
                  'text-sm font-medium transition-colors',
                  isCompleted &&
                    'text-muted-foreground decoration-muted-foreground/50 line-through',
                  isActive && 'text-foreground font-bold',
                  !isActive && !isCompleted && 'text-muted-foreground',
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default RegistrationStatusCard;
