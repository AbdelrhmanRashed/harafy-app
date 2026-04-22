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
import { useAuthStore } from '@/store/useAuthStore';
import NotificationCenter from '@/components/shared/NotificationCenter';
import {
  useMarkAsRead,
  useNotifications,
} from '@/features/notifications/hooks/useNotifications';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

const mapType = (type: number): 'info' | 'success' | 'warning' | 'error' => {
  switch (type) {
    case 0:
      return 'info';
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

const ProviderActions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { token } = useAuthStore();
  const prevLengthRef = useRef<number>(0);

  // ── Realtime notification ───────────────────────────────────────────────────
  const { connected } = useNotificationSocket(token);
  // ── Get all notifications ───────────────────────────────────────────────────
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
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
            onClick: () => navigate('/notifications'),
          },
          duration: 5000,
          position: 'bottom-right',
        });
      }
    }
    prevLengthRef.current = notifications.length;
  }, [notifications.length]);

  const variant: Record<string, string> = {
    '/provider/home': 'إضافة خدمة',
    '/provider/services': 'إضافة خدمة',
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
