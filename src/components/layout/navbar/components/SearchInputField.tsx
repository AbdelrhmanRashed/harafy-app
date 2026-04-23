import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Field } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Kbd, KbdGroup } from '@/components/ui/kbd';
import {
  Search,
  User as UserIcon,
  Bell,
  Settings,
  LogOut,
  LogIn,
  ArrowLeft,
  Sparkles,
  Moon,
  Sun,
} from 'lucide-react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { NAV_LINKS } from '@/constants/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { logout as logoutApi } from '@/features/auth/api/logout';
import { queryClient } from '@/lib/queryClient';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/types/auth.types';
import { useThemeStore } from '@/store/useThemeStore';

// Map icon names to colored style configs for visual richness
const iconColorMap: Record<string, string> = {
  Home: 'bg-blue-500/10 text-blue-500',
  Compass: 'bg-violet-500/10 text-violet-500',
  MessageCircle: 'bg-green-500/10 text-green-500',
  User: 'bg-amber-500/10 text-amber-500',
  Wrench: 'bg-orange-500/10 text-orange-500',
  LayoutDashboard: 'bg-teal-500/10 text-teal-500',
};

// Quick access items with color configs
const quickAccessItems = [
  {
    label: 'الملف الشخصي',
    path: '/app/settings/info',
    icon: UserIcon,
    color: 'bg-amber-500/10 text-amber-500',
    description: 'بياناتك وإعداداتك الشخصية',
  },
  {
    label: 'الإشعارات',
    path: '/app/notifications',
    icon: Bell,
    color: 'bg-red-500/10 text-red-500',
    description: 'تنبيهاتك وتحديثاتك',
  },
  {
    label: 'الإعدادات',
    path: '/app/settings/info',
    icon: Settings,
    color: 'bg-slate-500/10 text-slate-500',
    description: 'ضبط حسابك وتفضيلاتك',
  },
];

const SearchInputField = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, removeUser } = useAuthStore();

  const userRole: UserRole = useMemo(() => {
    if (!isAuthenticated || !user) return 'Guest';
    if (user.role.includes('Admin')) return 'Admin';
    if (user.role.includes('Provider') || user.isProvider) return 'Provider';
    return 'Client';
  }, [user, isAuthenticated]);

  const navLinks = NAV_LINKS[userRole] || NAV_LINKS['Guest'];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  const handleLogout = async () => {
    setOpen(false);
    try {
      await logoutApi();
    } finally {
      removeUser();
      queryClient.clear();
      navigate('/auth/login');
    }
  };

  return (
    <>
      {/* ── Trigger Button ─────────────────────────────────────── */}
      <div
        className="max-w-md flex-1 px-4"
        onClick={() => setOpen(true)}
        role="button"
        aria-label="فتح لوحة البحث"
      >
        <Field className="relative">
          <InputGroup
            className={cn(
              'bg-muted/50 h-10 cursor-pointer rounded-full border px-4 transition-all duration-200',
              'border-border/40 hover:border-border hover:bg-muted/80 hover:shadow-sm',
            )}
          >
            <InputGroupInput
              id="search"
              placeholder="ابحث عن الخدمات والصفحات..."
              className="pointer-events-none cursor-pointer border-none bg-transparent shadow-none placeholder:opacity-70 focus-visible:ring-0"
              readOnly
              tabIndex={-1}
            />
            <InputGroupAddon align="inline-start">
              <Search className="text-muted-foreground h-4 w-4" />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <KbdGroup>
                <Kbd>K</Kbd>
                <Kbd>⌘</Kbd>
              </KbdGroup>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </div>

      {/* ── Command Palette Dialog ──────────────────────────────── */}
      <CommandDialog open={open} onOpenChange={setOpen} className="max-w-xl!">
        <Command dir="rtl" className="flex flex-col overflow-hidden rounded-xl">
          {/* Search Input */}
          <div className="border-b px-1 pb-1">
            <CommandInput
              placeholder="ابحث عن أي شيء في حرفي..."
              className="h-11! py-10! text-base"
              autoFocus
            />
          </div>

          <CommandList className="max-h-[420px] p-2 text-right" dir="rtl">
            {/* Empty State */}
            <CommandEmpty className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <div className="bg-muted relative flex h-20 w-20 items-center justify-center rounded-full">
                <div className="bg-primary/10 absolute inset-0 animate-ping rounded-full opacity-20" />
                <Search className="text-muted-foreground/40 h-9 w-9" />
              </div>
              <div className="space-y-1">
                <p className="text-foreground font-bold">لا توجد نتائج</p>
                <p className="text-muted-foreground text-xs">
                  جرّب البحث بكلمات مختلفة
                </p>
              </div>
            </CommandEmpty>

            {/* Main Nav */}
            <CommandGroup
              heading={
                <span className="flex items-center gap-1.5 text-xs font-bold">
                  <Sparkles className="h-3 w-3" />
                  التنقل الأساسي
                </span>
              }
            >
              {navLinks.map((link) => {
                const Icon = link.icon;
                const iconName = Icon.displayName ?? Icon.name ?? '';
                const colorClass =
                  iconColorMap[iconName] ?? 'bg-primary/10 text-primary';
                return (
                  <CommandItem
                    key={link.path}
                    value={link.title}
                    onSelect={() => runCommand(() => navigate(link.path))}
                    className="group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-all"
                  >
                    <div
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
                        colorClass,
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1 text-right">
                      <p className="text-sm leading-none font-bold">
                        {link.title}
                      </p>
                    </div>
                    <ArrowLeft className="text-muted-foreground/0 group-data-selected:text-muted-foreground/70 h-3.5 w-3.5 transition-all" />
                  </CommandItem>
                );
              })}
            </CommandGroup>

            {/* Quick Access */}
            {isAuthenticated && (
              <>
                <CommandSeparator className="my-1.5" />
                <CommandGroup
                  heading={
                    <span className="text-xs font-bold">الوصول السريع</span>
                  }
                >
                  {quickAccessItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <CommandItem
                        key={item.path}
                        value={item.label + ' ' + item.description}
                        onSelect={() => runCommand(() => navigate(item.path))}
                        className="group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-all"
                      >
                        <div
                          className={cn(
                            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
                            item.color,
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1 text-right">
                          <p className="text-sm leading-none font-bold">
                            {item.label}
                          </p>
                          <p className="text-muted-foreground mt-0.5 text-[11px]">
                            {item.description}
                          </p>
                        </div>
                        <ArrowLeft className="text-muted-foreground/0 group-data-selected:text-muted-foreground/70 h-3.5 w-3.5 transition-all" />
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </>
            )}
            {/*Dark mode*/}
            <CommandSeparator className="my-1.5" />

            <CommandGroup
              heading={
                <span className="flex items-center gap-1.5 text-xs font-bold">
                  <Sparkles className="h-3 w-3" />
                  المظهر
                </span>
              }
            >
              <CommandItem
                value="الوضع الليلي dark mode"
                onSelect={toggleTheme}
                className={cn(
                  'group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-all',
                  theme === 'dark' &&
                    'data-selected:bg-primary/10 text-primary',
                )}
              >
                <div
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
                    theme === 'dark'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-primary/10 text-primary',
                  )}
                >
                  {theme === 'light' ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                </div>
                <div className="min-w-0 flex-1 text-right">
                  <p className="text-primary text-sm leading-none font-bold">
                    {theme === 'light' ? 'الوضع الليلي' : 'الوضع النهاري'}
                  </p>
                  <p className="text-muted-foreground mt-0.5 text-[11px]">
                    {theme === 'light'
                      ? 'تفعيل الوضع الليلي'
                      : 'تفعيل الوضع النهاري'}
                  </p>
                </div>
              </CommandItem>
            </CommandGroup>
            {/* Auth Actions */}
            <CommandSeparator className="my-1.5" />

            <CommandGroup
              heading={<span className="text-xs font-bold">الحساب</span>}
            >
              {isAuthenticated ? (
                <CommandItem
                  value="تسجيل الخروج logout"
                  onSelect={handleLogout}
                  className="group data-selected:bg-destructive/10 flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-all"
                >
                  <div className="bg-destructive/10 text-destructive flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                    <LogOut className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1 text-right">
                    <p className="text-destructive text-sm leading-none font-bold">
                      تسجيل الخروج
                    </p>
                    <p className="text-muted-foreground mt-0.5 text-[11px]">
                      إنهاء جلستك الحالية
                    </p>
                  </div>
                </CommandItem>
              ) : (
                <CommandItem
                  value="تسجيل الدخول login"
                  onSelect={() => runCommand(() => navigate('/auth/login'))}
                  className="group data-selected:bg-primary/10 flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-all"
                >
                  <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                    <LogIn className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1 text-right">
                    <p className="text-primary text-sm leading-none font-bold">
                      تسجيل الدخول
                    </p>
                    <p className="text-muted-foreground mt-0.5 text-[11px]">
                      ادخل إلى حسابك في حرفي
                    </p>
                  </div>
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>

          {/* Footer hints */}
          <div
            className="bg-muted/30 text-muted-foreground flex items-center justify-between gap-4 border-t px-4 py-2 text-[11px]"
            dir="rtl"
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Kbd className="px-1.5 py-0.5 text-[10px]">↑</Kbd>
                <Kbd className="px-1.5 py-0.5 text-[10px]">↓</Kbd>
                للتنقل
              </span>
              <span className="flex items-center gap-1">
                <Kbd className="px-1.5 py-0.5 text-[10px]">↵</Kbd>
                للتحديد
              </span>
              <span className="flex items-center gap-1">
                <Kbd className="px-1.5 py-0.5 text-[10px]">Esc</Kbd>
                للإغلاق
              </span>
            </div>
            <span className="flex items-center gap-1 font-medium">
              <Sparkles className="text-primary h-3 w-3" />
              حرفي
            </span>
          </div>
        </Command>
      </CommandDialog>
    </>
  );
};

export default SearchInputField;
