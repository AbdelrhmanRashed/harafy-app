import {
  BellIcon,
  ChevronsUpDown,
  Loader2,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { useLogout } from '@/features/auth/hooks/useLogout';
import { useAuthStore } from '@/store/useAuthStore';
import LogoutButton from '@/features/auth/components/LogoutButton';

interface ProfileMenuProps {
  collapsed: boolean;
  isMobile: boolean;
}

const AvatarSection = ({ collapsed }: { collapsed?: boolean }) => {
  const { user } = useAuthStore();
  return (
    <div className={`flex items-center ${collapsed ? 'gap-0' : 'gap-2'} py-1`}>
      <Avatar>
        <AvatarImage
          src={user?.pictureUrl || 'https://github.com/shadcn.png'}
          alt="Profile Image"
        />
        <AvatarFallback>{user?.fullName.split(' ')[0][0]}</AvatarFallback>
      </Avatar>
      {!collapsed && (
        <div className="flex flex-col items-start">
          <span className="text-sm font-semibold">{user?.fullName}</span>
          <span className="text-muted-foreground text-xs">مدير النظام</span>
        </div>
      )}
    </div>
  );
};

const ProfileMenu = ({ collapsed, isMobile }: ProfileMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`w-full px-2 py-6 ${collapsed ? 'justify-center' : 'justify-between'} cursor-pointer`}
        >
          <AvatarSection collapsed={collapsed} />
          {!collapsed && <ChevronsUpDown className="size-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={isMobile ? 'top' : 'right'}
        align={isMobile ? 'start' : 'end'}
        className="w-56"
      >
        <AvatarSection />

        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <UserIcon />
          الملف الشخصي
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <BellIcon />
          الاشعارات
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <SettingsIcon />
          الاعدادات
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* Logout Button */}
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
