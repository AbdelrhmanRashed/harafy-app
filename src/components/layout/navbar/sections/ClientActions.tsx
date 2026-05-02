import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileMenuTrigger from '../components/ProfileMenuTrigger';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTheme } from '@/hooks/useTheme';
import NotificationCenter from '@/components/shared/NotificationCenter';
import { useNotificationSocket } from '@/realtime/useNotificationSocket';
import {
  useMarkAsRead,
  useNotifications,
} from '@/features/notifications/hooks/useNotifications';

const ClientActions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // ── Realtime notification ───────────────────────────────────────────────────
  const { connected } = useNotificationSocket();
  // ── Get all notifications ───────────────────────────────────────────────────
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useNotifications();

  const { mutate: markAsRead } = useMarkAsRead();

  const notifications = data?.pages.flatMap((p) => p.data) ?? [];
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const variant: Record<string, string> = {
    '/app/home': 'إنشاء منشور',
    '/app/services': 'طلب فورى',
    '/app/community': 'إنشاء منشور',
    '/app/services/instant': 'طلب خدمه مباشره',
    '/app/services/direct': 'طلب فورى',
  };

  const handleButtonClick = () => {
    if (variant[location.pathname] === 'إنشاء منشور') {
      navigate('/app/community', { state: { openCreatePost: true } });
    }
    if (variant[location.pathname] === 'طلب فورى') {
      navigate('/app/services/instant');
    }
    if (variant[location.pathname] === 'طلب خدمه مباشره') {
      navigate('/app/services');
    }
  };

  return (
    <>
      {variant[location.pathname] && (
        <Button
          variant="gradient"
          className="bg-primary-gradient shadow-primary-gradient rounded-full px-6"
          onClick={handleButtonClick}
        >
          {variant[location.pathname]}
        </Button>
      )}

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
        onViewAll={() => navigate('/app/notifications')}
        onLoadMore={fetchNextPage}
        hasMore={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
      />

      <ProfileMenuTrigger />
    </>
  );
};

export default ClientActions;
