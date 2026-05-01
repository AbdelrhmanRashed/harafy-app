import {
  LayoutGrid,
  ClipboardClock,
  Wallet,
  Star,
  Users,
  type LucideIcon,
  UserRoundPen,
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type NavItem = {
  label: string;
  icon: LucideIcon;
  path: string;
};

const links: NavItem[] = [
  { label: 'الرئيسية', icon: LayoutGrid, path: '/provider/home' },
  { label: 'المجتمع', icon: Users, path: '/provider/community' },
  { label: 'الطلبات', icon: ClipboardClock, path: '/provider/requests' },
  { label: 'التقييمات', icon: Star, path: '/provider/reviews' },
  { label: 'المحفظة', icon: Wallet, path: '/provider/wallet' },
  { label: 'الملف الشخصي', icon: UserRoundPen, path: '/provider/profile' },
];

const ProviderSidebar = () => {
  const { pathname } = useLocation();
  
//  const collapsed =
//     pathname.startsWith('/provider/requests') ||
//     pathname.startsWith('/provider/community');
  const collapsed = false;

  return (
    <TooltipProvider delayDuration={150}>
      <aside
        dir="rtl"
        className={cn(
          'bg-background border-border sticky top-16 z-30 h-[calc(100vh-4rem)] shrink-0 border-l transition-all duration-300',
          collapsed ? 'w-[72px]' : 'w-[72px] xl:w-60',
        )}
      >
        <nav className="flex h-full flex-col gap-2 px-2 py-4">
          {links.map((item) => {
            const isActive = pathname.startsWith(item.path);

            return (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={item.path}
                    className={cn(
                      'group focus-visible:ring-primary/40 relative flex w-full items-center gap-3 rounded-2xl py-3 text-sm font-bold transition-all duration-200 focus-visible:ring-2 focus-visible:outline-none',
                      collapsed
                        ? 'justify-center'
                        : 'justify-center xl:justify-start xl:px-4',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground',
                    )}
                  >
                    {/* Right-edge active indicator */}
                    {isActive && (
                      <span className="bg-primary absolute top-1/2 right-0 h-6 w-[3px] -translate-y-1/2 rounded-l-full" />
                    )}

                    <item.icon
                      size={20}
                      strokeWidth={isActive ? 2.5 : 2}
                      className="shrink-0 transition-transform duration-200 group-hover:scale-105"
                    />

                    {!collapsed && (
                      <span className="hidden text-[15px] xl:inline">
                        {item.label}
                      </span>
                    )}
                  </NavLink>
                </TooltipTrigger>

                <TooltipContent
                  side="left"
                  sideOffset={10}
                  className={cn(
                    'rounded-xl px-3 py-1.5 text-sm font-bold',
                    !collapsed && 'xl:hidden',
                  )}
                >
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
      </aside>
    </TooltipProvider>
  );
};

export default ProviderSidebar;
