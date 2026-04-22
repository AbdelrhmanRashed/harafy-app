import {
  Bell,
  BellOff,
  CheckCheck,
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Trash2,
} from 'lucide-react';
import { cn, getTimeAgo } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useMarkAsRead,
  useNotifications,
} from '@/features/notifications/hooks/useNotifications';

// ── Type helpers ──────────────────────────────────────────────────────────────
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

const typeConfig = {
  info: {
    dot: 'bg-blue-500',
    ring: 'ring-blue-500/20',
    bg: 'bg-blue-500/10',
    text: 'text-blue-500',
    label: 'معلومة',
    icon: <Info className="h-5 w-5 text-blue-500" />,
  },
  success: {
    dot: 'bg-green-500',
    ring: 'ring-green-500/20',
    bg: 'bg-green-500/10',
    text: 'text-green-600',
    label: 'نجاح',
    icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
  },
  warning: {
    dot: 'bg-amber-500',
    ring: 'ring-amber-500/20',
    bg: 'bg-amber-500/10',
    text: 'text-amber-600',
    label: 'تحذير',
    icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
  },
  error: {
    dot: 'bg-red-500',
    ring: 'ring-red-500/20',
    bg: 'bg-red-500/10',
    text: 'text-red-600',
    label: 'خطأ',
    icon: <XCircle className="h-5 w-5 text-red-500" />,
  },
} as const;

// ── Skeleton Item ─────────────────────────────────────────────────────────────
const NotificationSkeleton = () => (
  <div className="border-border bg-card flex items-start gap-4 rounded-2xl border p-5">
    <Skeleton className="mt-0.5 h-12 w-12 shrink-0 rounded-xl" />
    <div className="flex-1 space-y-3 pt-1">
      <Skeleton className="h-4 w-1/3 rounded-lg" />
      <Skeleton className="h-3 w-full rounded-lg" />
      <Skeleton className="h-3 w-4/5 rounded-lg" />
    </div>
  </div>
);

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AllNotificationsPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useNotifications();

  const { mutate: markAsRead } = useMarkAsRead();

  const notifications = data?.pages.flatMap((p) => p.data) ?? [];
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAll = () => {
    const ids = notifications.filter((n) => !n.isRead).map((n) => n.id);
    if (ids.length > 0) markAsRead(ids);
  };

  return (
    <div className="mx-auto mt-2 min-h-screen max-w-7xl pb-12" dir="rtl">
      {/* ── Hero Banner ─────────────────────────────────────────────── */}
      <div className="bg-primary-gradient shadow-primary-gradient/20 mx-5 rounded-3xl px-6 py-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-black text-white">
              <Bell className="h-8 w-8" />
              مركز الإشعارات
            </h1>
            <p className="text-primary-foreground/80 mt-2 max-w-lg text-sm">
              تابع أحدث التنبيهات، العروض، وتحديثات الطلبات الخاصة بك في مكان
              واحد.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex min-w-[120px] flex-col items-center justify-center rounded-2xl bg-white/10 px-6 py-4 text-center backdrop-blur-md">
              <p className="text-4xl leading-none font-black text-white">
                {isLoading ? '-' : unreadCount}
              </p>
              <p className="mt-1 text-xs font-bold text-white/80">غير مقروء</p>
            </div>
            {unreadCount > 0 && !isLoading && (
              <button
                onClick={handleMarkAll}
                className="group text-primary flex min-w-[120px] cursor-pointer flex-col items-center justify-center rounded-2xl bg-white px-6 py-4 shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                <CheckCheck className="mb-1 h-7 w-7 transition-transform group-hover:scale-110" />
                <span className="text-xs font-bold">قراءة الكل</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Notification List ────────────────────────────────────────── */}
      <div className="mx-auto mt-8 max-w-4xl px-4">
        <div className="space-y-4">
          {isLoading ? (
            // Skeleton state
            Array.from({ length: 5 }).map((_, i) => (
              <NotificationSkeleton key={i} />
            ))
          ) : notifications.length === 0 ? (
            // Empty state
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="border-border bg-card/50 mt-8 flex flex-col items-center justify-center gap-5 rounded-3xl border border-dashed py-24 text-center"
            >
              <div className="bg-muted/60 relative flex h-24 w-24 items-center justify-center rounded-full">
                <div className="bg-primary/10 absolute inset-0 animate-ping rounded-full opacity-25" />
                <BellOff className="text-muted-foreground/40 h-10 w-10" />
              </div>
              <div className="space-y-1.5">
                <p className="text-foreground text-lg font-black">
                  لا توجد إشعارات
                </p>
                <p className="text-muted-foreground mx-auto max-w-[280px] text-sm leading-relaxed">
                  أنت على اطلاع بكل جديد. ستظهر الإشعارات الجديدة هنا فور
                  وصولها.
                </p>
              </div>
            </motion.div>
          ) : (
            // Items
            <AnimatePresence initial={false}>
              {notifications.map((n, idx) => {
                const type = mapType(n.type);
                const config = typeConfig[type];

                return (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.3,
                      delay: Math.min(idx * 0.05, 0.3),
                    }}
                    onClick={() => {
                      if (!n.isRead) markAsRead([n.id]);
                    }}
                    className={cn(
                      'group bg-card relative flex cursor-pointer items-start gap-5 rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:shadow-md',
                      !n.isRead
                        ? 'border-primary/20 bg-primary/[0.02]'
                        : 'border-border/50 hover:border-border',
                    )}
                  >
                    {/* Unread left accent */}
                    {!n.isRead && (
                      <span className="bg-primary absolute top-1/2 right-0 h-12 w-1.5 -translate-y-1/2 rounded-l-full" />
                    )}

                    {/* Icon badge */}
                    <div
                      className={cn(
                        'mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1',
                        config.bg,
                        config.ring,
                      )}
                    >
                      {config.icon}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <p
                          className={cn(
                            'text-base leading-snug font-bold transition-colors',
                            !n.isRead
                              ? 'text-foreground'
                              : 'text-muted-foreground group-hover:text-foreground',
                          )}
                        >
                          {n.title}
                        </p>

                        <div className="flex shrink-0 items-center gap-2">
                          <span
                            className={cn(
                              'rounded-full px-2.5 py-1 text-xs font-bold',
                              config.bg,
                              config.text,
                            )}
                          >
                            {config.label}
                          </span>

                          {/* Mark single as read icon — visible on hover */}
                          {!n.isRead && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsRead([n.id]);
                              }}
                              className="hover:bg-muted rounded-lg p-1.5 opacity-0 transition-all group-hover:opacity-100"
                              title="تعليم كمقروء"
                            >
                              <Trash2 className="text-muted-foreground hover:text-destructive h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      <p
                        className={cn(
                          'mt-2 text-sm leading-relaxed',
                          !n.isRead
                            ? 'text-muted-foreground'
                            : 'text-muted-foreground/70',
                        )}
                      >
                        {n.message}
                      </p>

                      <div className="mt-3 flex items-center gap-2">
                        <span
                          className={cn(
                            'block h-2 w-2 rounded-full',
                            config.dot,
                          )}
                        />
                        <p className="text-muted-foreground/60 text-xs font-medium">
                          {getTimeAgo(new Date(n.createdAt))}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}

          {/* Load More */}
          {hasNextPage && !isFetchingNextPage && (
            <div className="pt-6">
              <Button
                variant="outline"
                size="lg"
                className="text-muted-foreground hover:bg-muted/50 hover:text-foreground w-full rounded-2xl border-dashed py-6 text-sm font-bold"
                onClick={() => fetchNextPage()}
              >
                تحميل الإشعارات السابقة
              </Button>
            </div>
          )}

          {isFetchingNextPage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 py-8"
            >
              {[0, 150, 300].map((delay) => (
                <div
                  key={delay}
                  className="bg-primary/60 h-2.5 w-2.5 animate-bounce rounded-full"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
