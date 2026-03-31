import React from "react";
import { Link, useLocation } from "react-router-dom";
import { User, Bell, ShieldUser, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";
import defaultAvatar from "@/assets/images/profileImage.png";
import { ROUTES } from "@/constants/routes";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

interface ProfileSidebarProps {
  onLogout?: () => void;
}

// ─── Nav items ────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  {
    label: "الملف الشخصي",
    icon: <User className="h-4 w-4" />,
    href: ROUTES.CLIENT.SETTINGS_PROFILE,
  },
  {
    label: "الإشعارات",
    icon: <Bell className="h-4 w-4" />,
    href: ROUTES.CLIENT.SETTINGS_NOTIFICATIONS,
  },
  {
    label: "الأمان",
    icon: <ShieldUser className="h-4 w-4" />,
    href: ROUTES.CLIENT.SETTINGS_SECURITY,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function ProfileSidebar({ onLogout }: ProfileSidebarProps) {
  const { name, email, role, avatar } = useUserStore();
  const { pathname } = useLocation();

  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  function isActive(item: NavItem): boolean {
    return pathname === item.href;
  }

  return (
    <aside className="w-60 shrink-0 flex flex-col gap-2">

      {/* ── User card ── */}
      <div className="bg-muted p-4 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl overflow-hidden">
          <img
            src={avatar || defaultAvatar}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="min-w-0 text-right">
          <p className="text-sm font-semibold text-foreground truncate">{name}</p>
          <p className="text-xs text-muted-foreground truncate">{email}</p>
          <span className="inline-block mt-0.5 text-muted-foreground text-xs">
            {role === "provider" ? "حرفي" : "عميل جديد"}
          </span>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className="overflow-hidden bg-muted border-b-2 border-border pb-8 mb-2">
        {NAV_ITEMS.map((item, index) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "w-full flex items-center justify-start px-4 py-3 transition-colors rounded-4xl",
              index !== 0 && "border-transparent",
              isActive(item)
                ? "bg-white text-primary"
                : "text-foreground hover:bg-muted/60"
            )}
          >
            <div className="flex gap-3 items-center min-w-0">
              <span className={cn(
                "inline-block",
                isActive(item) ? "text-primary" : "text-muted-foreground"
              )}>
                {item.icon}
              </span>
              <p className={cn(
                "font-bold inline-block",
                isActive(item) ? "text-primary" : "text-foreground"
              )}>
                {item.label}
              </p>
            </div>
          </Link>
        ))}
      </nav>

      {/* ── Logout ── */}
      <div className="rounded-xl border border-transparent bg-[#F76A801A] overflow-hidden">
        <Button
          type="button"
          variant="ghost"
          className="w-full justify-center px-4 py-3 h-auto text-[#AC3149] hover:text-destructive hover:bg-destructive/5 rounded-none"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span className="text-sm font-semibold">تسجيل الخروج</span>
        </Button>
      </div>

    </aside>
  );
}