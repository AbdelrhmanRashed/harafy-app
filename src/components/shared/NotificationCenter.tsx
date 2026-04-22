import {
  Bell,
  BellOff,
  CheckCheck,
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Trash2,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Skeleton } from '@/components/ui/skeleton';
import { cn, getTimeAgo } from '@/lib/utils';
import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationCenterProps {
  notifications: any[];
  unreadCount: number;
  connected: boolean;

  onMarkAsRead: (id: number[]) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onViewAll: () => void;

  onLoadMore: () => void;
  hasMore?: boolean;
  isFetchingNextPage?: boolean;
  isLoading?: boolean;
}

// Maps numeric type to a semantic label
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

// Per-type visual config: icon, dot color, bg tint, icon color
const typeConfig = {
  info: {
    dot: 'bg-blue-500',
    ring: 'ring-blue-500/20',
    bg: 'bg-blue-500/10',
    icon: <Info className="h-3.5 w-3.5 text-blue-500" />,
  },
  success: {
    dot: 'bg-green-500',
    ring: 'ring-green-500/20',
    bg: 'bg-green-500/10',
    icon: <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />,
  },
  warning: {
    dot: 'bg-amber-500',
    ring: 'ring-amber-500/20',
    bg: 'bg-amber-500/10',
    icon: <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />,
  },
  error: {
    dot: 'bg-red-500',
    ring: 'ring-red-500/20',
    bg: 'bg-red-500/10',
    icon: <XCircle className="h-3.5 w-3.5 text-red-500" />,
  },
} as const;

export default function NotificationCenter({
  notifications,
  unreadCount,
  connected,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  onViewAll,
  onLoadMore,
  hasMore,
  isFetchingNextPage,
  isLoading,
}: NotificationCenterProps) {
  const listRef = useRef<HTMLDivElement | null>(null);

  console.log(notifications);

  // Infinite Scroll via onScroll handler (works inside Popover)
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
      if (hasMore && !isFetchingNextPage) {
        onLoadMore();
      }
    }
  };

  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative cursor-pointer rounded-full transition-transform hover:scale-105 active:scale-95"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <motion.span
                  key={unreadCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="ring-background absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white shadow-sm ring-2"
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </motion.span>
              )}
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>الإشعارات</TooltipContent>
      </Tooltip>

      <PopoverContent
        align="end"
        className="ring-border/50 z-[9999] w-80 overflow-hidden rounded-2xl p-0 shadow-2xl ring-1"
      >
        {/* ── Header ────────────────────────────────────────── */}
        <div className="bg-muted/30 flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <h3 className="text-foreground font-bold">الإشعارات</h3>

            {unreadCount > 0 && (
              <span className="bg-primary/15 text-primary flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold">
                {unreadCount}
              </span>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-default">
                  {connected ? (
                    <Wifi className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <WifiOff className="h-3.5 w-3.5 text-red-500" />
                  )}
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="z-[10001]">
                {connected ? 'متصل' : 'غير متصل'}
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:bg-primary/10 hover:text-primary h-7 gap-1.5 px-2 text-xs font-medium"
                onClick={onMarkAllAsRead}
              >
                <CheckCheck className="h-3.5 w-3.5" />
                قراءة الكل
              </Button>
            )}
            {notifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive h-7 px-2 text-xs"
                onClick={onClearAll}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>

        {/* ── List ──────────────────────────────────────────── */}
        <div
          ref={listRef}
          onScroll={handleScroll}
          className="max-h-[28rem] overflow-x-hidden overflow-y-auto p-1.5"
        >
          {/* Skeleton State */}
          {isLoading ? (
            <div className="flex flex-col gap-1 p-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-3 rounded-xl p-3">
                  <Skeleton className="mt-1 h-7 w-7 shrink-0 rounded-lg" />
                  <div className="flex-1 space-y-2.5 pt-0.5">
                    <Skeleton className="h-3.5 w-3/4 rounded-md" />
                    <Skeleton className="h-3 w-full rounded-md" />
                    <Skeleton className="h-2.5 w-1/3 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          ) : notifications.length === 0 ? (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center gap-4 py-16 text-center"
            >
              <div className="bg-muted/60 relative flex h-16 w-16 items-center justify-center rounded-full">
                <div className="bg-primary/10 absolute inset-0 animate-ping rounded-full opacity-30" />
                <BellOff className="text-muted-foreground/50 h-7 w-7" />
              </div>
              <div className="space-y-1.5">
                <p className="text-foreground text-sm font-bold">
                  لا توجد إشعارات
                </p>
                <p className="text-muted-foreground mx-auto max-w-[190px] text-xs leading-relaxed">
                  أنت على اطلاع بكل جديد. ستظهر الإشعارات الجديدة هنا فور
                  وصولها.
                </p>
              </div>
            </motion.div>
          ) : (
            /* Notification Items */
            <div className="flex flex-col gap-0.5">
              <AnimatePresence initial={false}>
                {notifications.map((n, idx) => {
                  const type = mapType(n.type);
                  const config = typeConfig[type];

                  return (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: Math.min(idx * 0.04, 0.25),
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onMarkAsRead([n.id]);
                      }}
                      className={cn(
                        'group relative flex cursor-pointer gap-3 rounded-xl p-3 transition-all duration-200',
                        !n.isRead
                          ? 'bg-primary/5 hover:bg-primary/10'
                          : 'hover:bg-muted/60',
                      )}
                    >
                      {/* Unread left accent bar */}
                      {!n.isRead && (
                        <span className="bg-primary absolute top-1/2 right-0 h-8 w-1 -translate-y-1/2 rounded-l-full" />
                      )}

                      {/* Type icon badge */}
                      <div
                        className={cn(
                          'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ring-1',
                          config.bg,
                          config.ring,
                        )}
                      >
                        {config.icon}
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <p
                          className={cn(
                            'text-sm leading-snug font-semibold transition-colors',
                            !n.isRead
                              ? 'text-foreground'
                              : 'text-foreground/90 group-hover:text-foreground',
                          )}
                        >
                          {n.title}
                        </p>

                        <p
                          className={cn(
                            'mt-1 line-clamp-2 text-xs',
                            !n.isRead
                              ? 'text-foreground'
                              : 'text-foreground/90',
                          )}
                        >
                          {n.message}
                        </p>

                        <div className="mt-1.5 flex items-center gap-1.5">
                          <span
                            className={cn(
                              'block h-1.5 w-1.5 rounded-full',
                              config.dot,
                            )}
                          />
                          <p className="text-muted-foreground/70 text-[11px] font-medium">
                            منذ {getTimeAgo(new Date(n.createdAt))}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Load More Indicator */}
              {isFetchingNextPage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center gap-1.5 py-4"
                >
                  {[0, 150, 300].map((delay) => (
                    <div
                      key={delay}
                      className="bg-primary/60 h-1.5 w-1.5 animate-bounce rounded-full"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* ── Footer ────────────────────────────────────────── */}
        {notifications.length > 0 && !isLoading && (
          <div className="bg-muted/10 border-t p-2">
            <Button
              variant="ghost"
              className="w-full cursor-pointer rounded-full text-xs font-semibold"
              onClick={onViewAll}
            >
              عرض كل الإشعارات
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
