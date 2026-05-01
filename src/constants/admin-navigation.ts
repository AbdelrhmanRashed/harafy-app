import {
  LayoutDashboard,
  FileText,
  Settings,
  ShieldUser,
  UserRoundCog,
  type LucideIcon,
  ShieldBan,
} from 'lucide-react';

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
      path: '/admin/dashboard',
    },
    {
      title: 'الحرفيين',
      icon: UserRoundCog,
      path: '/admin/craftsmen',
    },

    // {
    //   title: 'العملاء',
    //   icon: Users,
    //   path: '/admin/clients',
    //   badge: 7,
    // },
    // {
    //   title: 'الطلبات',
    //   icon: NotepadText,
    //   path: '/admin/orders',
    // },
    {
      title: 'التقارير',
      icon: FileText,
      path: '/admin/reports',
    },
    {
      title: 'المحظورين',
      icon: ShieldBan,
      path: '/admin/banned-users',
    },
  ],
  settings: [
    {
      title: 'اعدادات المنصه',
      icon: Settings,
      path: '/admin/settings',
    },
    {
      title: 'الأدوار والصلاحيات',
      icon: ShieldUser,
      path: '/admin/roles',
    },
  ],
};
