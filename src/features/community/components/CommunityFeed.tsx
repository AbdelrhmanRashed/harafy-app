// features/community/components/CommunityFeed.tsx
import { useEffect, useRef, useState, useCallback } from 'react';
import { usePosts } from '../hooks/usePosts';
import { useClientProfile } from '@/features/profile/hooks/useClientProfile';
import { useDebounce } from '@/hooks/useDebounce';
import Post from './Post';
import PostSkeleton from './PostSkeleton';
import EmptyState from './EmptyState';
import DirectServiceDrawer from '@/features/services/components/DirectServiceDrawer';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const NEW_POSTS_DELAY_MS = 10_000; // 10 seconds
const SCROLL_THRESHOLD_PX = 300; // must scroll at least this far down

const CommunityFeed = ({
  search,
  nearby,
}: {
  search?: string;
  nearby?: boolean;
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [providerId, setProviderId] = useState<number | undefined>(undefined);

  // ── "New Posts" pill state ──────────────────────────────────────
  const [showNewPostsBanner, setShowNewPostsBanner] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const feedTopRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleOpenRequest = (providerId: number) => {
    setProviderId(providerId);
    setIsDrawerOpen(true);
  };

  const { data: profile } = useClientProfile();
  const debouncedSearch = useDebounce(search, 500);

  const {
    data,
    fetchNextPage,
    refetch: refetchPosts,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = usePosts({
    search: debouncedSearch,
    governorateId: nearby ? (profile?.governorateId ?? undefined) : undefined,
  });

  // ── Infinite Scroll ─────────────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );
    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // ── "New Posts" pill — start timer when user scrolls far down ──
  const startNewPostsTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowNewPostsBanner(true);
    }, NEW_POSTS_DELAY_MS);
  }, []);

  const cancelNewPostsTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledDown = window.scrollY > SCROLL_THRESHOLD_PX;

      if (scrolledDown) {
        // Only start the timer if the banner isn't already shown
        if (!showNewPostsBanner) {
          startNewPostsTimer();
        }
      } else {
        // User scrolled back to the top — hide banner and cancel timer
        cancelNewPostsTimer();
        setShowNewPostsBanner(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelNewPostsTimer();
    };
  }, [showNewPostsBanner, startNewPostsTimer, cancelNewPostsTimer]);

  // ── Handle clicking the "New Posts" pill ──────────────────────
  const handleLoadNewPosts = async () => {
    setShowNewPostsBanner(false);
    cancelNewPostsTimer();
    setIsRefetching(true);

    // Scroll to the very top of the feed smoothly
    feedTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    await refetchPosts();
    setIsRefetching(false);
  };

  const posts = data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading)
    return (
      <div className="space-y-4">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    );

  if (posts.length === 0) return <EmptyState isSearch={!!search} />;

  return (
    <>
      {/* ── "New Posts" Floating Pill ───────────────────────────── */}
      <AnimatePresence>
        {showNewPostsBanner && (
          <motion.div
            initial={{ opacity: 0, y: -60, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -60, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="fixed top-20 left-1/2 z-50 -translate-x-1/2"
          >
            <button
              onClick={handleLoadNewPosts}
              disabled={isRefetching}
              className="group hover:shadow-primary/40 relative flex cursor-pointer items-center gap-2.5 overflow-hidden rounded-full px-5 py-2.5 shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-70"
            >
              {/* Gradient background */}
              <div className="bg-primary absolute inset-0" />
              {/* Shimmer sweep */}
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* Content */}
              <div className="relative flex items-center gap-2">
                {isRefetching ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: 'easeInOut',
                    }}
                  >
                    <ArrowUp className="h-4 w-4 text-white" />
                  </motion.div>
                )}
                <span className="text-sm font-black tracking-wide text-white">
                  {isRefetching ? 'جارٍ التحديث...' : 'منشورات جديدة'}
                </span>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sentinel at the very top of the feed list */}
      <div ref={feedTopRef} />

      <div className="space-y-4">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            handleOpenRequest={handleOpenRequest}
          />
        ))}

        {/* Infinite Scroll Trigger */}
        <div ref={bottomRef} />
        {isFetchingNextPage && <PostSkeleton />}
      </div>

      <DirectServiceDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        ProviderId={providerId}
      />
    </>
  );
};

export default CommunityFeed;
