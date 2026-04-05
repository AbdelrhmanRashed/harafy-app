import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useLogout } from '../hooks/useLogout';
import { Loader2, LogOutIcon } from 'lucide-react';
import ConfirmDialog from '@/components/shared/ConfirmDialog';

const LogoutButton = () => {
  const { mutateAsync: logout, isPending } = useLogout();
  return (
    <ConfirmDialog
      title="تسجيل الخروج"
      description="هل انت متاكد من تسجيل الخروج"
      onConfirm={() => logout()}
      variant="logout"
      isLoading={isPending}
      confirmButton={
        isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            جاري الخروج
          </>
        ) : (
          <>
            <LogOutIcon className="h-4 w-4" />
            تسجيل الخروج
          </>
        )
      }
      cancelButton="إلغاء"
      size="sm"
    >
      <DropdownMenuItem
        variant="destructive"
        className="cursor-pointer"
        onSelect={(e) => e.preventDefault()}
      >
        <LogOutIcon className="h-4 w-4" />
        تسجيل الخروج
      </DropdownMenuItem>
    </ConfirmDialog>
  );
};

export default LogoutButton;
