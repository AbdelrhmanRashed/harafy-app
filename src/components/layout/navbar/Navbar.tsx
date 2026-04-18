import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import type { UserRole } from '@/types/auth.types';
import { useAuthStore } from '@/store/useAuthStore';

export const Navbar = () => {
  const { user } = useAuthStore();
  const role: UserRole = user?.role.includes('Provider')
    ? 'Provider'
    : user?.role.includes('Client')
      ? 'Client'
      : 'Guest';

  return (
    <>
      <DesktopNavbar role={role} />
      <MobileNavbar role={role} />
    </>
  );
};
