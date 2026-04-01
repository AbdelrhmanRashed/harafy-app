import { cn } from '@/lib/utils';
import { Home, type LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface NavLinkProp {
  navLinks: {
    title: string;
    path: string;
    icon?: LucideIcon;
  }[];
  mobile?: boolean;
}

const NavLinks = ({ navLinks, mobile = false }: NavLinkProp) => {
  if (mobile)
    return (
      <nav className="bg-background border-border pb-safe shadow-primary-gradient fixed bottom-0 z-50 flex h-16 w-full items-center justify-around rounded-t-2xl border-t font-sans backdrop-blur-sm md:hidden">
        {navLinks.map((link) => {
          const Icon: LucideIcon | undefined = link.icon;
          return (
            <NavLink
              key={link.title}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  'flex h-full w-full flex-col items-center justify-center gap-1 transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground',
                )
              }
            >
              {Icon ? (
                <Icon className="h-5 w-5" />
              ) : (
                <Home className="h-5 w-5" />
              )}
              <span className="text-[10px] font-medium">{link.title}</span>
            </NavLink>
          );
        })}
      </nav>
    );

  return (
    <nav className="flex items-center gap-6">
      {navLinks.map((link) => (
        <NavLink
          key={link.title}
          to={link.path}
          className={({ isActive }) =>
            cn(
              'hover:text-primary text-sm font-medium transition-colors',
              isActive
                ? 'border-primary text-primary border-b-2 pb-1'
                : 'text-muted-foreground',
            )
          }
        >
          {link.title}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavLinks;
