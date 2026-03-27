import {
  FileText,
  HammerIcon,
  LayoutDashboard,
  NotepadText,
  Settings,
  ShieldUser,
  UserRoundCog,
  Users,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from '../ui/sidebar';
import SidebarNavItem from './SidebarNavItem';
import type { navLink } from '@/types/dashboard';
import { SidebarSeparator } from '../ui/sidebar';
import ProfileMenu from './ProfileMenu';

const mainLinks: navLink[] = [
  {
    title: 'الرئيسيه',
    icon: LayoutDashboard,
    path: '/dashboard',
  },
  {
    title: 'الحرفيين',
    icon: UserRoundCog,
    path: '/dashboard/craftsmen',
  },
  {
    title: 'العملاء',
    icon: Users,
    path: '/dashboard/customers',
    badge: 7,
  },
  {
    title: 'الطلبات',
    icon: NotepadText,
    path: '/dashboard/orders',
  },
  {
    title: 'التقارير',
    icon: FileText,
    path: '/dashboard/reports',
  },
];

const settingsItems: navLink[] = [
  {
    title: 'اعدادات المنصه',
    icon: Settings,
    path: '/dashboard/settings',
  },
  {
    title: 'الأدوار والصلاحيات',
    icon: ShieldUser,
    path: '/dashboard/roles',
  },
];

const AppSidebar = () => {
  const { state, isMobile } = useSidebar();
  return (
    <Sidebar side="right" collapsible="icon">
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex h-10 items-center gap-3">
            <div className="bg-sidebar-accent flex size-9 items-center justify-center rounded-md">
              <HammerIcon size={24} className="text-primary" />
            </div>
            {(state !== 'collapsed' || isMobile) && (
              <div>
                <p className="text-sidebar-foreground mb-0.5 text-sm font-bold">
                  حِرَفِيّ
                </p>
                <p className="text-sidebar-foreground/50 text-xs">
                  لوحة التحكم
                </p>
              </div>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator className="mx-0 w-full" />
      </SidebarHeader>

      <SidebarContent>
        {/* Main Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>القائمة الرئيسية</SidebarGroupLabel>
          <SidebarMenu>
            {mainLinks.map((item) => (
              <SidebarNavItem
                key={item.path}
                item={item}
                tooltip={item.title}
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupLabel>الإعدادات</SidebarGroupLabel>
          <SidebarMenu>
            {settingsItems.map((item) => (
              <SidebarNavItem
                key={item.path}
                item={item}
                tooltip={item.title}
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator className="mx-0 w-full" />

        <ProfileMenu collapsed={state === 'collapsed'} isMobile={isMobile} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
