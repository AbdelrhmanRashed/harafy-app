// ─── InputWithIcon ────────────────────────────────────────────────────────────

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";

interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  suffix?: React.ReactNode;
  width?: string
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ icon, suffix, className, ...props }, ref) => (
    <div className="relative flex items-center">
      {/* Leading icon — right side in RTL */}
      <span className="absolute right-3 z-10 text-muted-foreground pointer-events-none select-none">
        {icon}
      </span>

      <Input
        ref={ref}
        className={cn(
          "pr-9 h-11 bg-background border-border text-right",
          suffix ? "pl-9" : "",
          className
        )}
        {...props}
      />

      {/* Trailing suffix — left side in RTL */}
      {suffix && (
        <span className="absolute left-3 z-10 flex items-center">{suffix}</span>
      )}
    </div>
  )
);
InputWithIcon.displayName = "InputWithIcon";
export default InputWithIcon;