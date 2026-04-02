import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import type { UserRole } from '@/types/auth.types';

export const Navbar = () => {
  //CHANGE LATER!!!
  const role: UserRole = 'Client';

  return (
    <>
      <DesktopNavbar role={role} />
      <MobileNavbar role={role} />
    </>
  );
};
