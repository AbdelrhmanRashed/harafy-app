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
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect, useRef } from 'react';
import { useNotificationSocket } from '@/realtime/useNotificationSocket';
import { toast } from 'sonner';
import {
  useMarkAsRead,
  useNotifications,
} from '@/features/notifications/hooks/useNotifications';

const mapType = (type: number): 'info' | 'success' | 'warning' | 'error' => {
  switch (type) {
    case 1:
      return 'success';
    case 2:
      return 'warning';
    case 3:
      return 'error';
    default:
      return 'info';
  }
};

const ClientActions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const prevLengthRef = useRef<number>(0);
  const { theme, toggleTheme } = useTheme();

  // ── Realtime notification ───────────────────────────────────────────────────
  const { connected } = useNotificationSocket(token);
  // ── Get all notifications ───────────────────────────────────────────────────
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useNotifications();

  const { mutate: markAsRead } = useMarkAsRead();

  const notifications = data?.pages.flatMap((p) => p.data) ?? [];
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    if (notifications.length > prevLengthRef.current) {
      const latest = notifications[0];
      if (latest && !latest.isRead) {
        toast[mapType(latest.type)](latest.title, {
          description: latest.message,
          action: {
            label: 'عرض',
            onClick: () => navigate('/app/notifications'),
          },
          duration: 5000,
          position: 'bottom-right',
        });
      }
    }
    prevLengthRef.current = notifications.length;
  }, [notifications.length]);

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
