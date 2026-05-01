// features/community/components/CommunityFeed.tsx
import { useEffect, useRef, useState } from 'react';
import { usePosts } from '../hooks/usePosts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPosts } from '../api/getPosts';
import { useClientProfile } from '@/features/profile/hooks/useClientProfile';
import { useDebounce } from '@/hooks/useDebounce';
import Post from './Post';
import PostSkeleton from './PostSkeleton';
import EmptyState from './EmptyState';
import DirectServiceDrawer from '@/features/services/components/DirectServiceDrawer';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const CommunityFeed = ({
  search,
  nearby,
}: {
  search?: string;
  nearby?: boolean;
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [providerId, setProviderId] = useState<number | undefined>(undefined);
  const queryClient = useQueryClient();

  // ── State & Refs ──────────────────────────────────────────────
  const [showNewPostsBanner, setShowNewPostsBanner] = useState(false);
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
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = usePosts({
    search: debouncedSearch,
    governorateId: nearby ? (profile?.governorateId ?? undefined) : undefined,
  });

  const posts = data?.pages.flatMap((page) => page.data) ?? [];
  const firstDisplayedPostId = posts[0]?.id;

  // ── Polling for New Posts ───────────────────────────────────────
  const { data: latestPostData } = useQuery({
    queryKey: [
      'latestPost',
      {
        search: debouncedSearch,
        governorateId: nearby ? profile?.governorateId : undefined,
      },
    ],
    queryFn: () =>
      getPosts({
        PageIndex: 1,
        PageSize: 1,
        Search: debouncedSearch || undefined,
        GovernorateId: nearby ? profile?.governorateId : undefined,
      }),
    refetchInterval: 10_000, // Poll every 10 seconds
    enabled: !!firstDisplayedPostId && !showNewPostsBanner, // Stop polling if banner is already shown
  });

  useEffect(() => {
    const latestId = latestPostData?.data[0]?.id;
    if (latestId && firstDisplayedPostId) {
      const isCurrentlyDisplayed = posts.some((p) => p.id === latestId);
      if (!isCurrentlyDisplayed) {
        setShowNewPostsBanner(true);
      }
    }
  }, [latestPostData, firstDisplayedPostId, posts]);

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

  // ── Handle clicking the "New Posts" pill ──────────────────────
  const handleLoadNewPosts = async () => {
    setShowNewPostsBanner(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    await queryClient.resetQueries({ queryKey: ['posts'] });
  };

  console.log('all posts', posts);

  if (isLoading && posts.length === 0)
    return (
      <div className="space-y-4">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    );

  if (!isFetching && posts.length === 0)
    return <EmptyState isSearch={!!search} />;

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
              className="group hover:shadow-primary/40 relative flex cursor-pointer items-center gap-2.5 overflow-hidden rounded-full px-5 py-2.5 shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-70"
            >
              {/* Gradient background */}
              <div className="bg-primary absolute inset-0" />
              {/* Shimmer sweep */}
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/20 to-transparent" />

              {/* Content */}
              <div className="relative flex items-center gap-2">
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

                <span className="text-sm font-black tracking-wide text-white">
                  منشورات جديدة
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
