import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useAuthStore, type User } from '@/store/useAuthStore';
import {
  BellIcon,
  Loader2,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from 'lucide-react';

const AvatarSection = ({ user }: { user: User | null }) => {
  return (
    <Avatar className="cursor-pointer">
      <AvatarImage
        src={user?.pictureUrl || 'https://github.com/shadcn.png'}
        alt="User Avatar"
      />
      <AvatarFallback>{user?.fullName.split(' ')[0][0]}</AvatarFallback>
    </Avatar>
  );
};

const ProfileMenuTrigger = () => {
  const { mutate: logout, isPending } = useLogout();
  const { user } = useAuthStore();
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
          onClick={() => logout()}
          disabled={isPending}
          className="cursor-pointer"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              جاري تسجيل الخروج
            </>
          ) : (
            <>
              <LogOutIcon className="h-4 w-4" />
              تسجيل الخروج
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenuTrigger;
