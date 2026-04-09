
import { cn } from "@/lib/utils";
import {
  Paintbrush,
  AirVent,
  Sparkles,
  Zap,
  Wrench,
  Hammer,
  Layers,
  Flame,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { label: "دهانات",        icon: Paintbrush },
  { label: "تكييف",         icon: AirVent    },
  { label: "تنظيف",         icon: Sparkles   },
  { label: "كهرباء",        icon: Zap        },
  { label: "سباكة",         icon: Wrench     },
  { label: "نجارة",         icon: Hammer     },
  { label: "بلاط",          icon: Layers     },
  { label: "غاز",           icon: Flame      },
];

// ─── Props ────────────────────────────────────────────────────────────────────

interface CategoryListProps {
  onSelect?: (category: string) => void;
  selected?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CategoryList({ onSelect, selected }: CategoryListProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 justify-items-center lg:grid-cols-5  gap-4  max-w-4xl mx-auto ">
      {CATEGORIES.map(({ label, icon: Icon }) => (
        <button
          key={label}
          type="button"
          onClick={() => onSelect?.(label)}
          className={cn(
            "flex flex-col items-center justify-center  gap-2 px-5 py-4 rounded-3xl  transition-all duration-200 min-w-35 h-37 cursor-pointer",
            selected === label
              ? " bg-primary/5 text-primary shadow-sm"
              : " bg-white text-foreground  hover:text-primary hover:bg-primary/5"
          )}
        >
          <div className="h-16 w-16 bg-[#E8EFF4] rounded-full flex items-center justify-center"><Icon className="h-6 w-6 text-primary" /></div>
          <span className="font-bold">{label}</span>
        </button>
      ))}
    </div>
  );
}
