// ─── Types ────────────────────────────────────────────────────────────────────

import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

export type StepStatus = 'completed' | 'active' | 'pending';

export interface Step {
  id: number;
  label: string;
  subLabel: string;
  status: StepStatus;
  icon: LucideIcon;
  animate?: boolean;
}
// ─── StepItem ─────────────────────────────────────────────────────────────────

const StepItem = ({ step }: { step: Step }) => {
  const isCompleted = step.status === 'completed';
  const isActive = step.status === 'active';
  const isPending = step.status === 'pending';

  return (
    <div className="relative flex flex-1 flex-col items-center">
      {/* Circle */}
      <div
        className={cn(
          'absolute top-5 h-0.5 w-full',
          isCompleted && 'bg-primary',
          isActive && 'bg-primary',
          isPending && 'bg-muted-foreground/20',
        )}
      />
      <div
        className={cn(
          'z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors',
          isCompleted && 'bg-primary border-primary text-primary-foreground',
          isActive &&
            'border-primary text-primary bg-card dark:bg-secondary shadow-md',
          isPending && 'bg-muted text-muted-foreground',
        )}
      >
        <step.icon className={cn('h-5 w-5', step.animate && 'animate-spin')} />
      </div>

      {/* Labels */}
      <div className="mt-2 text-center">
        <p
          className={cn(
            'mb-1 text-xs font-bold',
            step.status === 'pending'
              ? 'text-muted-foreground'
              : 'text-foreground',
            step.status === 'active' && 'text-primary',
          )}
        >
          {step.label}
        </p>
        <p
          className={cn(
            'text-[11px]',
            step.status === 'active'
              ? 'text-primary font-medium'
              : 'text-muted-foreground',
          )}
        >
          {step.subLabel}
        </p>
      </div>
    </div>
  );
};
export default StepItem;
