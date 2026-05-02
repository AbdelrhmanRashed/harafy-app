import { useState, useMemo } from 'react';
import {
  Bell,
  BellOff,
  CheckCheck,
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Search,
  Check,
  BookOpen,
} from 'lucide-react';
import { cn, getTimeAgo } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
    ring: 'ring-blue-500/30',
    bg: 'bg-blue-500/10',
    text: 'text-blue-600',
    label: 'معلومة',
    icon: <Info className="h-5 w-5 text-blue-500" />,
  },
  success: {
    dot: 'bg-green-500',
    ring: 'ring-green-500/30',
    bg: 'bg-green-500/10',
    text: 'text-green-600',
    label: 'نجاح',
    icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
  },
  warning: {
    dot: 'bg-amber-500',
    ring: 'ring-amber-500/30',
    bg: 'bg-amber-500/10',
    text: 'text-amber-600',
    label: 'تحذير',
    icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
  },
  error: {
    dot: 'bg-red-500',
    ring: 'ring-red-500/30',
    bg: 'bg-red-500/10',
    text: 'text-red-600',
    label: 'خطأ',
    icon: <XCircle className="h-5 w-5 text-red-500" />,
  },
} as const;

const FILTER_OPTIONS = [
  { id: 'all', label: 'الكل', icon: <Bell className="h-3.5 w-3.5" /> },
  {
    id: 'unread',
    label: 'غير مقروء',
    icon: <BookOpen className="h-3.5 w-3.5" />,
  },
  { id: 'info', label: 'معلومات', icon: <Info className="h-3.5 w-3.5" /> },
  {
    id: 'success',
    label: 'نجاح',
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
  },
  {
    id: 'warning',
    label: 'تحذير',
    icon: <AlertTriangle className="h-3.5 w-3.5" />,
  },
  { id: 'error', label: 'خطأ', icon: <XCircle className="h-3.5 w-3.5" /> },
] as const;

// ── Skeleton Item ─────────────────────────────────────────────────────────────
const NotificationSkeleton = () => (
  <div className="border-border bg-card flex items-start gap-3 rounded-2xl border p-4 shadow-sm sm:gap-6 sm:p-5">
    <Skeleton className="mt-0.5 h-10 w-10 shrink-0 rounded-xl sm:h-12 sm:w-12" />
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

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = useMemo(
    () => data?.pages.flatMap((p) => p.data) ?? [],
    [data],
  );
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = useMemo(() => {
    return notifications.filter((n) => {
      // Filter by type
      let matchesType = true;
      if (activeFilter === 'unread') matchesType = !n.isRead;
      else if (activeFilter !== 'all')
        matchesType = mapType(n.type) === activeFilter;

      // Filter by search
      const matchesSearch =
        searchQuery === '' ||
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.message.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesType && matchesSearch;
    });
  }, [notifications, activeFilter, searchQuery]);

  const handleMarkAll = () => {
    const ids = notifications.filter((n) => !n.isRead).map((n) => n.id);
    if (ids.length > 0) markAsRead(ids);
  };

  return (
    <div className="mx-auto mt-2 max-w-7xl pb-12" dir="rtl">
      {/* ── Hero Banner ─────────────────────────────────────────────── */}
      <div className="relative mx-4 overflow-hidden rounded-3xl px-5 py-8 shadow-xl sm:mx-5 sm:px-10 sm:py-10">
        <div className="bg-primary-gradient absolute inset-0" />

        {/* Animated Background Orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="bg-primary-foreground/10 absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="bg-primary-foreground/10 absolute -bottom-32 -left-32 h-80 w-80 rounded-full blur-3xl"
        />

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-center md:text-right">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 text-2xl font-black text-white sm:text-3xl md:justify-start"
            >
              <Bell className="h-7 w-7 sm:h-8 sm:w-8" />
              مركز الإشعارات
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-primary-foreground/90 mt-3 max-w-lg text-sm leading-relaxed md:text-base"
            >
              تابع أحدث التنبيهات، العروض، وتحديثات الطلبات الخاصة بك في مكان
              واحد. تمتع بإدارة سلسة واحترافية.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex w-full flex-col gap-4 sm:flex-row md:w-auto"
          >
            <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-center shadow-inner backdrop-blur-md sm:px-8 sm:py-5 md:min-w-[140px]">
              <p className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                {isLoading ? '-' : unreadCount}
              </p>
              <p className="mt-1.5 text-xs font-bold tracking-wider text-white/90 uppercase">
                غير مقروء
              </p>
            </div>

            <AnimatePresence>
              {unreadCount > 0 && !isLoading && (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={handleMarkAll}
                  className="group text-primary hover:shadow-primary/30 flex flex-1 cursor-pointer flex-col items-center justify-center rounded-2xl bg-white px-4 py-4 shadow-2xl transition-all hover:-translate-y-1 active:scale-95 sm:px-6 sm:py-5 md:min-w-[140px]"
                >
                  <div className="bg-primary/10 mb-2 rounded-full p-2 transition-transform group-hover:scale-110">
                    <CheckCheck className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-black">قراءة الكل</span>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-5xl px-5">
        {/* ── Toolbar (Search & Filters) ─────────────────────────────────── */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Filters */}
          <div className="bg-card flex flex-wrap items-center gap-1.5 rounded-2xl border p-1.5 shadow-sm">
            {FILTER_OPTIONS.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    'relative z-10 flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all',
                    isActive
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="all-notifications-filter-bubble"
                      className="bg-primary absolute inset-0 -z-10 rounded-xl shadow-md"
                      transition={{
                        type: 'spring',
                        bounce: 0.25,
                        duration: 0.5,
                      }}
                    />
                  )}
                  {filter.icon && (
                    <span
                      className={cn(
                        'shrink-0 transition-transform duration-300',
                        isActive ? 'scale-110 opacity-100' : 'opacity-70',
                      )}
                    >
                      {filter.icon}
                    </span>
                  )}
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative w-full shrink-0 lg:max-w-xs">
            <Search className="text-muted-foreground absolute top-1/2 right-3.5 h-5 w-5 -translate-y-1/2" />
            <Input
              type="text"
              placeholder="ابحث في الإشعارات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-card focus-visible:ring-primary h-12 rounded-2xl border pr-11 text-sm font-medium shadow-sm transition-all focus-visible:ring-offset-2"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-muted-foreground hover:text-foreground absolute top-1/2 left-3.5 -translate-y-1/2 rounded-full p-1 transition-colors"
              >
                <XCircle className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* ── Notification List ────────────────────────────────────────── */}
        <div className="space-y-4">
          {isLoading ? (
            // Skeleton state
            Array.from({ length: 5 }).map((_, i) => (
              <NotificationSkeleton key={i} />
            ))
          ) : filteredNotifications.length === 0 ? (
            // Empty state
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="border-border bg-card/40 flex flex-col items-center justify-center gap-6 rounded-3xl border border-dashed py-28 text-center shadow-sm"
            >
              <div className="bg-muted/80 relative flex h-28 w-28 items-center justify-center rounded-full shadow-inner">
                <div
                  className="bg-primary/10 absolute inset-0 animate-ping rounded-full opacity-30"
                  style={{ animationDuration: '3s' }}
                />
                <div className="bg-primary/5 absolute inset-4 animate-pulse rounded-full opacity-50" />
                <BellOff className="text-muted-foreground/40 relative z-10 h-12 w-12" />
              </div>
              <div className="space-y-2">
                <p className="text-foreground text-xl font-black">
                  {notifications.length === 0
                    ? 'لا توجد إشعارات'
                    : 'لا توجد إشعارات مطابقة'}
                </p>
                <p className="text-muted-foreground mx-auto max-w-[320px] text-sm leading-relaxed">
                  {notifications.length === 0
                    ? 'أنت على اطلاع بكل جديد. ستظهر الإشعارات الجديدة هنا فور وصولها.'
                    : 'لم يتم العثور على إشعارات تطابق عملية البحث أو الفلتر المحدد.'}
                </p>
              </div>

              {notifications.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setActiveFilter('all');
                    setSearchQuery('');
                  }}
                  className="mt-2 rounded-xl"
                >
                  إعادة ضبط الفلاتر
                </Button>
              )}
            </motion.div>
          ) : (
            // Items
            <div className="grid gap-4">
              <AnimatePresence initial={false} mode="popLayout">
                {filteredNotifications.map((n, idx) => {
                  const type = mapType(n.type);
                  const config = typeConfig[type];

                  return (
                    <motion.div
                      layout
                      key={n.id}
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{
                        duration: 0.3,
                        delay: Math.min(idx * 0.04, 0.2),
                        layout: { duration: 0.3, ease: 'easeOut' },
                      }}
                      onClick={() => {
                        if (!n.isRead) markAsRead([n.id]);
                      }}
                      className={cn(
                        'group bg-card relative flex cursor-pointer items-start gap-3 rounded-2xl border p-4 shadow-sm transition-all duration-300 hover:shadow-md sm:gap-6 sm:p-5',
                        !n.isRead
                          ? 'border-primary/20 bg-primary/3'
                          : 'border-border/50 hover:border-border hover:bg-muted/30',
                      )}
                    >
                      {/* Unread left accent */}
                      {!n.isRead && (
                        <motion.span
                          layoutId={`unread-accent-${n.id}`}
                          className="bg-primary absolute top-1/2 right-0 h-14 w-1.5 -translate-y-1/2 rounded-l-full shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                        />
                      )}

                      {/* Icon badge */}
                      <div
                        className={cn(
                          'mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ring-1 transition-transform group-hover:scale-105 sm:h-12 sm:w-12',
                          config.bg,
                          config.ring,
                        )}
                      >
                        {config.icon}
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                          <p
                            className={cn(
                              'line-clamp-1 text-base leading-snug font-bold transition-colors',
                              !n.isRead
                                ? 'text-foreground'
                                : 'text-muted-foreground group-hover:text-foreground',
                            )}
                          >
                            {n.title}
                          </p>

                          <div className="flex shrink-0 items-center gap-2 self-start">
                            <span
                              className={cn(
                                'rounded-full px-2.5 py-1 text-[11px] font-black tracking-wide',
                                config.bg,
                                config.text,
                              )}
                            >
                              {config.label}
                            </span>

                            {/* Mark single as read icon */}
                            <AnimatePresence>
                              {!n.isRead && (
                                <motion.button
                                  initial={{ opacity: 0, scale: 0.5 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.5 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead([n.id]);
                                  }}
                                  className="text-muted-foreground hover:bg-primary hover:text-primary-foreground bg-muted flex h-7 w-7 items-center justify-center rounded-full transition-all"
                                  title="تعليم كمقروء"
                                >
                                  <Check className="h-4 w-4" />
                                </motion.button>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        <p
                          className={cn(
                            'mt-2 max-w-3xl text-sm leading-relaxed',
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
                              'block h-1.5 w-1.5 rounded-full',
                              config.dot,
                            )}
                          />
                          <p className="text-muted-foreground/70 text-xs font-semibold">
                            {getTimeAgo(new Date(n.createdAt))}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

          {/* Load More */}
          {hasNextPage &&
            !isFetchingNextPage &&
            filteredNotifications.length > 0 && (
              <div className="pt-6">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-muted-foreground hover:bg-muted/50 hover:text-foreground w-full rounded-2xl border-dashed py-7 text-sm font-black transition-colors"
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
              className="flex items-center justify-center gap-2 py-10"
            >
              {[0, 150, 300].map((delay) => (
                <div
                  key={delay}
                  className="bg-primary/60 h-3 w-3 animate-bounce rounded-full"
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
