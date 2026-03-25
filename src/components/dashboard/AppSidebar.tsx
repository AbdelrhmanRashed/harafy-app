import {
  FileText,
  LayoutDashboard,
  LogOut,
  NotepadText,
  Settings,
  ShieldUser,
  UserRoundCog,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarMenuItem,
  SidebarFooter,
} from '../ui/sidebar';
import logo from '@/assets/icons/Icon.png';
import { Button } from '../ui/button';

interface navLinks {
  title: string;
  icon: LucideIcon;
  path: string;
  badge?: string | number | null;
}

const mainLinks: navLinks[] = [
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

const settingsItems: { title: string; icon: LucideIcon; path: string }[] = [
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
  return (
    <Sidebar side="right" collapsible="icon">
      {/* Header */}
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-3">
            <div className="bg-sidebar-accent flex size-9 items-center justify-center rounded-md">
              <img src={logo} alt="logo" className="size-5" />
            </div>
            <div>
              <p className="text-sidebar-foreground text-sm font-bold">حرفي</p>
              <p className="text-sidebar-foreground/50 text-xs">لوحة التحكم</p>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarMenu>
            {mainLinks.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton asChild>
                  <NavLink
                    to={item.path}
                    className={(isActive) =>
                      isActive
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                        : 'default'
                    }
                  >
                    <item.icon size={18} />
                    <span>{item.title}</span>
                  </NavLink>
                </SidebarMenuButton>
                {item.badge && (
                  <SidebarMenuBadge className="bg-secondary text-secondary-foreground">
                    {item.badge}
                  </SidebarMenuBadge>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <Button variant="outline">dagsvcdgvca</Button>

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarMenu>
            {settingsItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton asChild>
                  <NavLink
                    to={item.path}
                    className={(isActive) =>
                      isActive
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                        : 'default'
                    }
                  >
                    <item.icon size={18} />
                    <span>{item.title}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <Button
            variant="outline"
            className="w-full cursor-pointer rounded-lg border-red-500/30 bg-red-50 px-3 py-5 text-red-500 transition-colors hover:border-red-500/60 hover:bg-red-500/10 hover:text-red-600"
            onClick={() => {
              console.log('logout!');
            }}
          >
            <LogOut size={18} />
            <span className="font-semibold">تسجيل الخروج</span>
          </Button>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
