import {
  BellIcon,
  ChevronsUpDown,
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
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

import profileImage from '@/assets/images/profileImage.png';

const AvatarSection = ({ collapsed }: { collapsed?: boolean }) => {
  return (
    <div className={`flex items-center ${collapsed ? 'gap-0' : 'gap-2'} py-1`}>
      <Avatar>
        <AvatarImage src={profileImage} alt="Profile Image" />
        <AvatarFallback>Profile Image</AvatarFallback>
      </Avatar>
      {!collapsed && (
        <div className="flex flex-col items-start">
          <span className="text-sm font-semibold">Ahmed Mohamed</span>
          <span className="text-muted-foreground text-xs">مدير النظام</span>
        </div>
      )}
    </div>
  );
};

const ProfileMenu = ({
  collapsed,
  isMobile,
}: {
  collapsed: boolean;
  isMobile: boolean;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`w-full px-2 py-6 ${collapsed ? 'justify-center' : 'justify-between'}`}
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
        <DropdownMenuItem>
          <UserIcon />
          الملف الشخصي
        </DropdownMenuItem>
        <DropdownMenuItem>
          <BellIcon />
          الاشعارات
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon />
          الاعدادات
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => {
            console.log('logout!');
          }}
        >
          <LogOutIcon />
          تسجيل الخروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
