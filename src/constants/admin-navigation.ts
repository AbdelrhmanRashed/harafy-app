import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  ShieldUser,
  UserRoundCog,
  NotepadText,
  type LucideIcon,
} from 'lucide-react';
import { ROUTES } from './routes';

interface NavLink {
  title: string;
  icon: LucideIcon;
  path: string;
  badge?: string | number | null;
}

export const ADMIN_NAV_LINKS: Record<'main' | 'settings', NavLink[]> = {
  main: [
    {
      title: 'الرئيسيه',
      icon: LayoutDashboard,
      path: ROUTES.ADMIN.DASHBOARD,
    },
    {
      title: 'الحرفيين',
      icon: UserRoundCog,
      path: ROUTES.ADMIN.CRAFTSMEN,
    },
    {
      title: 'العملاء',
      icon: Users,
      path: ROUTES.ADMIN.CLIENTS,
      badge: 7,
    },
    {
      title: 'الطلبات',
      icon: NotepadText,
      path: ROUTES.ADMIN.ORDERS,
    },
    {
      title: 'التقارير',
      icon: FileText,
      path: ROUTES.ADMIN.REPORTS,
    },
  ],
  settings: [
    {
      title: 'اعدادات المنصه',
      icon: Settings,
      path: ROUTES.ADMIN.SETTINGS,
    },
    {
      title: 'الأدوار والصلاحيات',
      icon: ShieldUser,
      path: ROUTES.ADMIN.ROLES,
    },
  ],
};
