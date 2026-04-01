import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BellIcon, LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react';

const AvatarSection = () => {
  return (
    <Avatar className="cursor-pointer">
      <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  );
};

const ProfileMenuTrigger = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-10 rounded-full border-0 p-0">
          <AvatarSection />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side={'bottom'} align={'end'} className="w-56">
        <div className="flex items-center gap-2">
          <AvatarSection />
          <div className="flex flex-col">
            <p className="text-sm font-semibold">Abdelrhman Emad</p>
            <p className="text-muted-foreground text-xs">[EMAIL_ADDRESS]</p>
          </div>
        </div>

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
        <DropdownMenuItem
          variant="destructive"
          onClick={() => {
            console.log('logout!');
          }}
          className="cursor-pointer"
        >
          <LogOutIcon />
          تسجيل الخروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenuTrigger;
