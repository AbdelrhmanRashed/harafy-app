import { Zap, Star, Crown } from 'lucide-react';
import type { Package } from './types';

export const PACKAGES: Package[] = [
  {
    id: 50,
    label: '50 نقطة',
    price: '50 جنيه',
    icon: Zap,
    color: 'from-sky-500 to-blue-600',
    popular: false,
  },
  {
    id: 100,
    label: '100 نقطة',
    price: '100 جنيه',
    icon: Star,
    color: 'from-emerald-500 to-teal-600',
    popular: true,
  },
  {
    id: 200,
    label: '200 نقطة',
    price: '200 جنيه',
    icon: Crown,
    color: 'from-violet-500 to-purple-700',
    popular: false,
  },
];
