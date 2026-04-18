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
  LayoutGrid,
} from 'lucide-react';

const getCategoryIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('سباك') || n.includes('plumbing')) return Wrench;
  if (n.includes('كهرباء') || n.includes('electric')) return Zap;
  if (n.includes('دهان') || n.includes('paint')) return Paintbrush;
  if (n.includes('تكييف') || n.includes('air')) return AirVent;
  if (n.includes('تنظيف') || n.includes('clean')) return Sparkles;
  if (n.includes('نجارة') || n.includes('carpenter')) return Hammer;
  if (n.includes('بلاط') || n.includes('tile')) return Layers;
  if (n.includes('غاز') || n.includes('gas')) return Flame;
  return LayoutGrid;
};

interface CategoryListProps {
  categories: { id: number; name: string }[];
  selectedId: number;
  onSelect: (id: number, name: string) => void;
}

export default function CategoryList({
  categories,
  onSelect,
  selectedId,
}: CategoryListProps) {
  // لو مفيش داتا لسه جت من الـ API، متبعش الـ component فاضي تماماً
  if (!categories || categories.length === 0) {
    return (
      <div className="flex w-full items-center justify-center py-10">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-2 justify-items-center gap-4 p-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
      {categories.map((cat) => {
        const Icon = getCategoryIcon(cat.name);
        const isSelected = selectedId === cat.id;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelect(cat.id, cat.name)}
            className={cn(
              'flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl shadow-sm transition-all duration-300',
              isSelected
                ? 'bg-primary-gradient scale-105 text-white shadow-lg'
                : 'bg-card text-foreground hover:bg-primary/5 border-border/50 border',
            )}
          >
            <div
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-2xl transition-colors',
                isSelected ? 'bg-white/20' : 'bg-primary/10',
              )}
            >
              <Icon
                className={cn(
                  'h-6 w-6',
                  isSelected ? 'text-white' : 'text-primary',
                )}
              />
            </div>
            <span className="text-xs font-bold">{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
