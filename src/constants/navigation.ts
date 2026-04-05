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
  Guest: [
    { title: 'الرئيسية', path: '/', icon: Home },
    { title: 'الخدمات', path: '/services', icon: Compass },
    { title: 'المجتمع', path: '/community', icon: MessageCircle },
  ],

  Client: [
    { title: 'الرئيسية', path: '/app/home', icon: Home },
    { title: 'الخدمات', path: '/app/services', icon: Compass },
    { title: 'المجتمع', path: '/app/community', icon: MessageCircle },
    { title: 'الطلبات', path: '/app/requests', icon: User },
  ],

  Provider: [
    { title: 'الرئيسية', path: '/provider', icon: Home },
    { title: 'الطلبات', path: '/provider/requests', icon: User },
    { title: 'أعمالي', path: '/provider/my-services', icon: Wrench },
  ],

  Admin: [
    { title: 'الرئيسية', path: '/dashboard', icon: Home },
    { title: 'الخدمات', path: '/services', icon: Compass },
    { title: 'المجتمع', path: '/community', icon: MessageCircle },
    { title: 'الطلبات', path: '/requests', icon: User },
  ],
};

export const getNavLinks = (role: UserRole) => {
  return NAV_LINKS[role];
};
