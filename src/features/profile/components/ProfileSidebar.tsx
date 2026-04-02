import { NavLink } from 'react-router-dom';
import {
  User,
  Bell,
  ShieldUser,
  LogOut,
  type LucideIcon,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import { useLogout } from '@/features/auth/hooks/useLogout';

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  icon: LucideIcon;
  to: string;
}

// ─── Nav items ────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  {
    label: 'الملف الشخصي',
    icon: User,
    to: '/app/profile/settings/info',
  },
  {
    label: 'الإشعارات',
    icon: Bell,
    to: '/app/profile/settings/notifications',
  },
  {
    label: 'الأمان',
    icon: ShieldUser,
    to: '/app/profile/settings/security',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const ProfileSidebar = () => {
  const { mutateAsync: logout, isPending } = useLogout();
  return (
    <Card className="flex w-full flex-col gap-4 p-4">
      {/* ── User card ── */}
      <div className="flex items-center gap-2">
        <div className="size-12 overflow-hidden rounded-xl">
          <img
            className="h-full w-full object-cover"
            src="https://github.com/shadcn.png"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-md font-bold">تامر الجيار</p>
          <p className="text-sm">abdo@gmail.com</p>
          <p className="text-xs">عميل</p>
        </div>
      </div>

      <Separator />
      {/* ── Navigation ── */}
      <nav className="flex flex-col gap-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex w-full items-center justify-start rounded-4xl px-4 py-3 font-semibold transition-colors',

                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-muted/60',
                )
              }
            >
              <div className="flex min-w-0 items-center gap-3">
                <Icon className="size-5" />
                <p>{item.label}</p>
              </div>
            </NavLink>
          );
        })}
      </nav>

      <Separator />

      {/* ── Logout ── */}
      <ConfirmDialog
        title="تسجيل الخروج"
        description="هل انت متاكد من تسجيل الخروج؟"
        onConfirm={() => logout()}
        variant="logout"
        size="sm"
        isLoading={isPending}
        cancelButton="الغاء"
        confirmButton={
          isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <p>جاري الخروج</p>
            </>
          ) : (
            <p>تسجيل الخروج</p>
          )
        }
      >
        <Button
          type="button"
          variant="destructive"
          className="h-11 cursor-pointer rounded-full"
        >
          <LogOut className="size-4" />
          <p className="font-semibold">تسجيل الخروج</p>
        </Button>
      </ConfirmDialog>
    </Card>
  );
};

export default ProfileSidebar;
