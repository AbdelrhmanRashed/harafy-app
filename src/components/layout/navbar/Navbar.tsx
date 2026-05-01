import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import type { UserRole } from '@/types/auth.types';
import { useAuthStore } from '@/store/useAuthStore';

interface NavbarProps {
  hideLinks?: boolean;
}

export const Navbar = ({ hideLinks }: NavbarProps) => {
  const { user } = useAuthStore();
  const role: UserRole = user?.role.includes('Provider')
    ? 'Provider'
    : user?.role.includes('Client')
      ? 'Client'
      : 'Guest';

  return (
    <>
      <DesktopNavbar role={role} hideLinks={hideLinks} />
      <MobileNavbar role={role} hideLinks={hideLinks} />
    </>
  );
};
