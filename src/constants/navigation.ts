import type { UserRole } from '@/types/auth.types';
import {
  Home,
  Compass,
  MessageCircle,
  User,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

interface NavLink {
  title: string;
  path: string;
  icon: LucideIcon;
}

export const NAV_LINKS: Record<UserRole, NavLink[]> = {
  guest: [
    { title: 'الرئيسية', path: '/', icon: Home },
    { title: 'الخدمات', path: '/services', icon: Compass },
    { title: 'المجتمع', path: '/community', icon: MessageCircle },
  ],

  client: [
    { title: 'الرئيسية', path: '/dashboard', icon: Home },
    { title: 'الخدمات', path: '/services', icon: Compass },
    { title: 'المجتمع', path: '/community', icon: MessageCircle },
    { title: 'الطلبات', path: '/requests', icon: User },
  ],

  provider: [
    { title: 'الرئيسية', path: '/dashboard', icon: Home },
    { title: 'الطلبات', path: '/requests', icon: User },
    { title: 'أعمالي', path: '/my-services', icon: Wrench },
  ],

  admin: [
    { title: 'الرئيسية', path: '/dashboard', icon: Home },
    { title: 'الخدمات', path: '/services', icon: Compass },
    { title: 'المجتمع', path: '/community', icon: MessageCircle },
    { title: 'الطلبات', path: '/requests', icon: User },
  ],
};

export const getNavLinks = (role: UserRole) => {
  return NAV_LINKS[role];
};
