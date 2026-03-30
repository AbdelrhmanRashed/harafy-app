import type { LucideIcon } from 'lucide-react';

export interface navLink {
  title: string;
  icon: LucideIcon;
  path: string;
  badge?: string | number | null;
}
