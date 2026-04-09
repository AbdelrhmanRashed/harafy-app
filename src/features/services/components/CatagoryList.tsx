import { cn } from '@/lib/utils';
import {
  Paintbrush,
  AirVent,
  Sparkles,
  Zap,
  Wrench,
  Hammer,
  Layers,
  Flame,
} from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { label: 'دهانات', icon: Paintbrush },
  { label: 'تكييف', icon: AirVent },
  { label: 'تنظيف', icon: Sparkles },
  { label: 'كهرباء', icon: Zap },
  { label: 'سباكة', icon: Wrench },
  { label: 'نجارة', icon: Hammer },
  { label: 'بلاط', icon: Layers },
  { label: 'غاز', icon: Flame },
];

// ─── Props ────────────────────────────────────────────────────────────────────

interface CategoryListProps {
  onSelect?: (category: string) => void;
  selected?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CategoryList({
  onSelect,
  selected,
}: CategoryListProps) {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-2 justify-items-center gap-4 md:grid-cols-3 lg:grid-cols-5">
      {CATEGORIES.map(({ label, icon: Icon }) => (
        <button
          key={label}
          type="button"
          onClick={() => onSelect?.(label)}
          className={cn(
            'flex h-39 w-full min-w-37 cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl px-5 py-4 shadow-sm transition-all duration-200',
            selected === label
              ? 'bg-primary-gradient text-secondary shadow-sm'
              : 'text-foreground hover:text-primary hover:bg-primary/5 bg-card',
          )}
        >
          <div className="bg-secondary flex h-16 w-16 items-center justify-center rounded-full">
            <Icon className="text-primary h-6 w-6" />
          </div>
          <span className="font-bold">{label}</span>
        </button>
      ))}
    </div>
  );
}
