import type { LucideIcon } from 'lucide-react';

export type PaymentStatus = 'idle' | 'loading' | 'success' | 'error';

export interface Package {
  id: number;
  label: string;
  price: string;
  icon: LucideIcon;
  color: string;
  popular: boolean;
}
