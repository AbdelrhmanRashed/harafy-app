// ─── AccountTypeCard ──────────────────────────────────────────────────────────

import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface AccountTypeCardProps {
  type: "client" | "professional";
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
}

const AccountTypeCard=({
  label,
  sublabel,
  icon,
  selected,
  onSelect,
}: AccountTypeCardProps)=> {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        selected
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border bg-card hover:border-primary/40 hover:bg-muted/40"
      )}
    >
      {/* Selected checkmark */}
      {selected && (
        <span className="absolute top-2 left-2">
          <CheckCircle2 className="h-4 w-4 text-primary fill-primary/20" />
        </span>
      )}

      <span
        className={cn(
          "p-2 rounded-lg transition-colors",
          selected
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        {icon}
      </span>

      <span
        className={cn(
          "font-bold  transition-colors",
          selected ? "text-primary" : "text-foreground"
        )}
      >
        {label}
      </span>

      <span className="text-xs text-muted-foreground leading-tight">
        {sublabel}
      </span>
    </button>
  );
}
export default AccountTypeCard;