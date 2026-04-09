import { NavLink } from 'react-router-dom';
import {
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../../../components/ui/sidebar';
import { ChevronLeft } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const SidebarNavItem = ({ item, tooltip }: { item: any; tooltip: string }) => {
  const location = useLocation();
  const Icon = item.icon;
  return (
    <SidebarMenuItem key={item.path} className="group/item">
      <SidebarMenuButton
        tooltip={tooltip}
        asChild
        isActive={location.pathname === item.path}
        className="py-5"
      >
        <NavLink
          to={item.path}
          className="relative flex w-full items-center gap-3 transition-all duration-200"
        >
          <Icon size={24} />

          <span className="flex-1 text-right">{item.title}</span>

          {item.badge ? (
            <SidebarMenuBadge className="bg-sidebar-primary text-sidebar-primary-foreground static size-5 rounded-full">
              {item.badge}
            </SidebarMenuBadge>
          ) : (
            <ChevronLeft
              size={14}
              className="translate-x-2 opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100"
            />
          )}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default SidebarNavItem;
