import {
  LayoutGrid,
  ClipboardClock,
  Bookmark,
  Star,
  Settings,
  Users,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const links = [
  { label: "الرئيسية", icon: LayoutGrid, path: "/provider/home" },
  { label: "المجتمع", icon: Users, path: "/provider/community" },
  { label: "الطلبات", icon: ClipboardClock, path: "/provider/requests" },
  { label: "التقييمات", icon: Star, path: "/provider/reviews" },
  { label: "المحفظة", icon: Bookmark, path: "/provider/wallet" },
  { label: "الملف الشخصي", icon: Settings, path: "/provider/profile" },
];

const ProviderSidebar = () => {
  const { pathname } = useLocation();

  const isRequestsRoute = pathname.startsWith("/provider/requests");

  return (
    <aside
      className={`
        bg-background border-l flex flex-col min-h-screen shrink-0 transition-all duration-200
        ${isRequestsRoute ? "w-16 p-2" : "w-16 xl:w-64 p-2 xl:p-4"}
      `}
    >
      <div className="space-y-1">
        {links.map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 rounded-xl transition-colors
              ${isRequestsRoute ? "justify-center px-2" : "justify-center xl:justify-start px-2 xl:px-4"}
              ${isActive
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted"
              }`
            }
          >
            <item.icon size={20} className="shrink-0" />
            {!isRequestsRoute && (
              <span className="hidden xl:inline text-sm xl:text-base">
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default ProviderSidebar;