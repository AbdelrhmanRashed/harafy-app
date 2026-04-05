import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LogoutButton from '@/features/auth/components/LogoutButton';
import { useAuthStore, type User } from '@/store/useAuthStore';
import { BellIcon, SettingsIcon, UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '@/lib/utils';

const AvatarSection = ({ user }: { user: User | null }) => {
  const userPicture = getImageUrl(user?.pictureUrl);
  return (
    <Avatar className="cursor-pointer">
      <AvatarImage src={userPicture} alt="User Avatar" />
      <AvatarFallback>{user?.fullName.split(' ')[0][0]}</AvatarFallback>
    </Avatar>
  );
};

const ProfileMenuTrigger = () => {
  const user = useAuthStore((s) => s.user);
  console.log(user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-10 rounded-full border-0 p-0">
          <AvatarSection user={user} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side={'bottom'} align={'end'} className="w-56">
        <div className="flex items-center gap-2">
          <AvatarSection user={user} />
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{user?.fullName}</p>
            <p className="text-muted-foreground text-xs">{user?.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            to="/app/profile"
            className="flex cursor-pointer items-center gap-2"
          >
            <UserIcon className="h-4 w-4" />
            الملف الشخصي
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            to="/app/profile/settings/notifications"
            className="flex cursor-pointer items-center gap-2"
          >
            <BellIcon className="h-4 w-4" />
            الإشعارات
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            to="/app/profile/settings"
            className="flex cursor-pointer items-center gap-2"
          >
            <SettingsIcon className="h-4 w-4" />
            الإعدادات
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* Logout Button */}
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenuTrigger;
