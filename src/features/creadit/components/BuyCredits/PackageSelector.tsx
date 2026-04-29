import { PACKAGES } from '../../types/constants';
import type { PaymentStatus } from '../../types/types';

interface PackageSelectorProps {
  selectedCredits: number;
  setSelectedCredits: (id: number) => void;
  status: PaymentStatus;
}

export const PackageSelector = ({ selectedCredits, setSelectedCredits, status }: PackageSelectorProps) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {PACKAGES.map((pkg) => {
        const Icon = pkg.icon;
        const isSelected = selectedCredits === pkg.id;
        return (
          <button
            key={pkg.id}
            type="button"
            disabled={status === 'success'}
            onClick={() => setSelectedCredits(pkg.id)}
            className={`relative flex flex-col items-center gap-2 rounded-2xl border-2 p-3 text-center transition-all hover:scale-[1.03] cursor-pointer ${isSelected
                ? 'border-emerald-500 bg-emerald-50 shadow-md dark:bg-emerald-950/30'
                : 'border-border bg-secondary/20 hover:border-emerald-300'
              }`}
          >
            {pkg.popular && (
              <span className="absolute -top-2.5 right-1/2 translate-x-1/2 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white whitespace-nowrap">
                الأكثر طلباً
              </span>
            )}
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${pkg.color}`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <p className="text-base font-bold text-foreground leading-tight">{pkg.label}</p>
            <p className="text-xs font-semibold text-muted-foreground">{pkg.price}</p>
          </button>
        );
      })}
    </div>
  );
};
