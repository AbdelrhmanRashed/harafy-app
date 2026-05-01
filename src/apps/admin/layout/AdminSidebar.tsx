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
} from '../../../components/ui/sidebar';
import SidebarNavItem from './SidebarNavItem';
import { SidebarSeparator } from '../../../components/ui/sidebar';
import ProfileMenu from './ProfileMenu';
import { ADMIN_NAV_LINKS } from '@/constants/admin-navigation';
import { HammerIcon } from 'lucide-react';

import { useGetUnderReviewProvider } from '@/features/admin/craftsmen/hooks/useGetUnderReviewProviders';
import { useGetAllReports } from '@/features/admin/reports/hooks/useGetAllReports';
import { useGetAllBannedUsers } from '@/features/admin/banned/hooks/useGetAllBannedUsers';

const AdminSidebar = () => {
  const { state, isMobile } = useSidebar();

  const { data: underReviewProviders } = useGetUnderReviewProvider();
  const craftsmenCount = underReviewProviders?.length || 0;

  const { data: reportsData } = useGetAllReports(1, 10);
  const reportsCount = reportsData?.count || 0;

  const { data: bannedUsers } = useGetAllBannedUsers();
  const bannedUsersCount = bannedUsers?.length || 0;

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
            {ADMIN_NAV_LINKS.main.map((item) => {
              let badge = item.badge;
              
              if (item.path === '/admin/craftsmen' && craftsmenCount > 0) {
                badge = craftsmenCount;
              }
              if (item.path === '/admin/reports' && reportsCount > 0) {
                badge = reportsCount;
              }
              if (item.path === '/admin/banned-users' && bannedUsersCount > 0) {
                badge = bannedUsersCount;
              }

              return (
                <SidebarNavItem
                  key={item.path}
                  item={{ ...item, badge }}
                  tooltip={item.title}
                />
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupLabel>الإعدادات</SidebarGroupLabel>
          <SidebarMenu>
            {ADMIN_NAV_LINKS.settings.map((item) => (
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

export default AdminSidebar;
