import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import React, { useState } from 'react'


export default function NotifRow({
    id, label, description, icon, checked, onCheckedChange,
}: {
    id: string;
    label: string;
    description: string;
    icon: React.ReactNode;
    checked: boolean;
    onCheckedChange: (v: boolean) => void;
}) {

    return (
        <div className="flex items-center gap-4 py-3 border-b last:border-none">
            {/* Icon */}
            <span className="shrink-0 p-1.5 rounded-lg bg-muted text-muted-foreground">
                {icon}
            </span>

            {/* Text */}
            <Label htmlFor={id} className="flex-1 text-right cursor-pointer">
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground font-normal">{description}</p>
            </Label>

            {/* Switch */}
            <Switch
  id={id}
  checked={checked}
  onCheckedChange={onCheckedChange}
  className="data-[state=checked]:bg-primary"
/>

        </div>
    );
}
