import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function NotificationRow({
  id,
  label,
  description,
  icon,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div
      dir="rtl"
      className="flex items-center justify-between gap-4 border-b py-3 last:border-none"
    >
      <div className="flex items-center gap-3">
        <span className="bg-muted text-muted-foreground flex size-8 items-center justify-center rounded-lg">
          {icon}
        </span>

        <Label htmlFor={id} className="cursor-pointer text-right">
          <p className="text-foreground text-sm font-medium">{label}</p>
          <p className="text-muted-foreground text-xs">{description}</p>
        </Label>
      </div>

      <Switch
        dir="ltr"
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="data-[state=checked]:bg-primary scale-x-[-1]"
      />
    </div>
  );
}
