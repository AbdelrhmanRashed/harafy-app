// ─── AccountTypeCard ──────────────────────────────────────────────────────────

import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';

interface AccountTypeCardProps {
  type: 'client' | 'professional';
  label: string;
  subLabel: string;
  icon: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
}

const AccountTypeCard = ({
  label,
  subLabel,
  icon,
  selected,
  onSelect,
}: AccountTypeCardProps) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'focus-visible:ring-ring relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 text-center transition-all duration-200 focus:outline-none focus-visible:ring-2',
        selected
          ? 'border-primary bg-primary/5 shadow-sm'
          : 'border-border bg-card hover:border-primary/40 hover:bg-muted/40',
      )}
    >
      {/* Selected checkmark */}
      {selected && (
        <span className="absolute top-2 left-2">
          <CheckCircle2 className="text-primary fill-primary/20 h-4 w-4" />
        </span>
      )}

      <span
        className={cn(
          'rounded-lg p-2 transition-colors',
          selected
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground',
        )}
      >
        {icon}
      </span>

      <span
        className={cn(
          'font-bold transition-colors',
          selected ? 'text-primary' : 'text-foreground',
        )}
      >
        {label}
      </span>

      <span className="text-muted-foreground text-xs leading-tight">
        {subLabel}
      </span>
    </button>
  );
};
export default AccountTypeCard;
