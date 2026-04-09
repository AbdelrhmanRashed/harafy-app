import { getNavLinks } from '@/constants/navigation';
import Logo from './components/Logo';
import NavLinks from './components/NavLinks';
import SearchInputField from './components/SearchInputField';
import ClientActions from './sections/ClientActions';
import type { UserRole } from '@/types/auth.types';

interface DesktopNavbarProps {
  role: UserRole;
}

const DesktopNavbar = ({ role }: DesktopNavbarProps) => {
  return (
    <header className="border-border bg-background/93 sticky top-0 z-700 hidden h-16 w-full items-center justify-between border-b px-6 font-sans backdrop-blur-md md:flex">
      {/* Right Side: Logo & Links */}
      <div className="flex items-center gap-8">
        <Logo />
        <NavLinks navLinks={getNavLinks(role)} />
      </div>

      {/* Center: Search */}
      <SearchInputField />

      {/* Left Side: Actions */}
      <div className="flex items-center gap-4">
        {role === 'Client' && <ClientActions />}
      </div>
    </header>
  );
};

export default DesktopNavbar;
