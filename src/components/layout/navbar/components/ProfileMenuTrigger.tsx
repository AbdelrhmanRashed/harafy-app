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
import { BellIcon, SettingsIcon, UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getFullName, getImageUrl } from '@/lib/utils';
import { useClientProfile } from '@/features/profile/hooks/useClientProfile';
import { useAuthStore } from '@/store/useAuthStore';

const AvatarSection = ({ user }: { user: any | null }) => {
  const userPicture = getImageUrl(user?.pictureUrl);
  return (
    <Avatar className="cursor-pointer">
      <AvatarImage src={userPicture} alt="User Avatar" />
      <AvatarFallback>
        {getFullName(user?.firstName, user?.lastName).split(' ')[0][0]}
      </AvatarFallback>
    </Avatar>
  );
};

const ProfileMenuTrigger = () => {
  const { data: user, isLoading } = useClientProfile();
  const data = useAuthStore((state) => state.user);

  const email = useAuthStore((state) => state.user?.email);

  if (isLoading) {
    return (
      <Button variant="ghost" className="size-10 rounded-full border-0 p-0">
        <AvatarSection user={null} />
      </Button>
    );
  }

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
            <p className="text-sm font-semibold">
              {getFullName(
                user?.firstName || 'اسم',
                user?.lastName || 'المستخدم',
              )}
            </p>
            <p className="text-muted-foreground text-xs">{email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />

        {data?.role.includes('Provider') && (
          <DropdownMenuItem asChild>
            <Link
              to="/app/profile"
              className="flex cursor-pointer items-center gap-2"
            >
              <UserIcon className="h-4 w-4" />
              الملف الشخصي
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link
            to="/app/settings/notifications"
            className="flex cursor-pointer items-center gap-2"
          >
            <BellIcon className="h-4 w-4" />
            الإشعارات
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            to="/app/settings"
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
