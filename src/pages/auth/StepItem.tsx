// ─── Types ────────────────────────────────────────────────────────────────────

import { cn } from "@/lib/utils";

export type StepStatus = "completed" | "active" | "pending";

export interface Step {
  id: number;
  label: string;
  sublabel: string;
  status: StepStatus;
  icon: React.ReactNode;
}
// ─── StepItem ─────────────────────────────────────────────────────────────────

const StepItem=({ step }: { step: Step })=> {
  return (
    <div className="flex flex-col items-center  flex-1 relative">
      {/* Circle */}
      <div className={cn("absolute top-5 h-0.5 w-full",step.status === "completed" &&"bg-primary ",
        step.status === "active" &&"bg-primary ",step.status === "pending" &&"bg-muted-foreground/20",
       )}/>
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors z-10",
          step.status === "completed" &&
          "bg-primary border-primary text-primary-foreground",
          step.status === "active" &&
          "bg-white border-primary text-primary shadow-md",
          step.status === "pending" &&
          "bg-muted border-border text-muted-foreground"
        )}
      >
        {step.icon}
      </div>

      {/* Labels */}
      <div className="text-center">
        <p
          className={cn(
            "text-xs font-semibold",
            step.status === "pending"
              ? "text-muted-foreground"
              : "text-foreground",
              step.status==="active"&&"text-primary",
          )}
        >
          {step.label}
        </p>
        <p
          className={cn(
            "text-[11px]",
            step.status === "active"
              ? "text-primary font-medium"
              : "text-muted-foreground"
          )}
        >
          {step.sublabel}
        </p>
      </div>
    </div>
  );
}
export default StepItem;