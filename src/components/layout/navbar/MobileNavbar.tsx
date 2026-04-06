import Logo from './components/Logo';
import ClientActions from './sections/ClientActions';
import { getNavLinks } from '@/constants/navigation';
import NavLinks from './components/NavLinks';
import type { UserRole } from '@/types/auth.types';

interface MobileNavbarProps {
  role: UserRole;
}

const MobileNavbar = ({ role }: MobileNavbarProps) => {
  return (
    <>
      <header className="bg-background/80 border-border sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b px-4 font-sans shadow-sm backdrop-blur-md md:hidden">
        <Logo />
        <div className="flex items-center gap-2">
          {role === 'Client' && <ClientActions />}
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <NavLinks navLinks={getNavLinks(role)} mobile />
    </>
  );
};

export default MobileNavbar;
