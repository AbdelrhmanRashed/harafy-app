import { Button } from '@/components/ui/button';
import { Moon, Sun, Plus } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileMenuTrigger from '../components/ProfileMenuTrigger';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTheme } from '@/hooks/useTheme';
import { useNotificationSocket } from '@/realtime/useNotificationSocket';
import NotificationCenter from '@/components/shared/NotificationCenter';
import {
  useMarkAsRead,
  useNotifications,
} from '@/features/notifications/hooks/useNotifications';

const ProviderActions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // ── Realtime notification ───────────────────────────────────────────────────
  const { connected } = useNotificationSocket();
  // ── Get all notifications ───────────────────────────────────────────────────
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useNotifications();

  const { mutate: markAsRead } = useMarkAsRead();

  const notifications = data?.pages.flatMap((p) => p.data) ?? [];
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const variant: Record<string, string> = {
    // '/provider/home': 'إضافة خدمة',
    // '/provider/services': 'إضافة خدمة',
    '/provider/community': 'إنشاء منشور',
  };

  const handleButtonClick = () => {
    const action = variant[location.pathname];

    if (action === 'إضافة خدمة') {
      navigate('/provider/services/create');
    }

    if (action === 'إنشاء منشور') {
      navigate('/provider/community', { state: { openCreatePost: true } });
    }
  };

  return (
    <>
      {/* Action Button */}
      {variant[location.pathname] && (
        <Button
          variant="gradient"
          className="bg-primary-gradient shadow-primary-gradient flex items-center gap-2 rounded-full px-6"
          onClick={handleButtonClick}
        >
          <Plus className="h-4 w-4" />
          {variant[location.pathname]}
        </Button>
      )}

      {/* Theme Toggle */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="cursor-pointer rounded-full"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {theme === 'dark' ? 'الوضع النهاري' : 'الوضع الليلي'}
        </TooltipContent>
      </Tooltip>

      {/* Notifications */}
      <NotificationCenter
        notifications={notifications}
        unreadCount={unreadCount}
        connected={connected}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={() => {
          const unreadIds = notifications
            .filter((n) => !n.isRead)
            .map((n) => n.id);
          if (unreadIds.length > 0) markAsRead(unreadIds);
        }}
        onClearAll={() => {}}
        onViewAll={() => navigate('/provider/notifications')}
        onLoadMore={fetchNextPage}
        hasMore={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />

      {/* Profile */}
      <ProfileMenuTrigger />
    </>
  );
};

export default ProviderActions;
