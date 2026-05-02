import type { UserRole } from '@/types/auth.types';
import {
  Home,
  Compass,
  MessageCircle,
  User,
  // Wrench,
  type LucideIcon,
  LayoutGrid,
  Users,
  ClipboardClock,
  Star,
  Wallet,
  UserRoundPen,
} from 'lucide-react';
import { ADMIN_NAV_LINKS } from './admin-navigation';

interface NavLink {
  title: string;
  path: string;
  icon: LucideIcon;
}

export const NAV_LINKS: Record<UserRole, NavLink[]> = {
  Guest: [],

  Client: [
    { title: 'الرئيسية', path: '/app/home', icon: Home },
    { title: 'الخدمات', path: '/app/services', icon: Compass },
    { title: 'المجتمع', path: '/app/community', icon: MessageCircle },
    { title: 'الطلبات', path: '/app/requests', icon: User },
  ],

  Provider: [
    { title: 'الرئيسية', path: '/provider/home', icon: LayoutGrid },
    { title: 'المجتمع', path: '/provider/community', icon: Users },
    { title: 'الطلبات', path: '/provider/requests', icon: ClipboardClock },
    { title: 'التقييمات', path: '/provider/reviews', icon: Star },
    { title: 'المحفظة', path: '/provider/wallet', icon: Wallet },
    { title: 'الملف الشخصي', path: '/provider/profile', icon: UserRoundPen },
  ],

  Admin: [
    ...ADMIN_NAV_LINKS.main.map((link) => ({
      title: link.title,
      path: link.path,
      icon: link.icon,
    })),
  ],
};

export const getNavLinks = (role: UserRole) => {
  return NAV_LINKS[role];
};
