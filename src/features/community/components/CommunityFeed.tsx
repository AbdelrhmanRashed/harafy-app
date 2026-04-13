// features/community/components/CommunityFeed.tsx
import { useEffect, useRef, useState } from 'react';
import { usePosts } from '../hooks/usePosts';
import { useClientProfile } from '@/features/profile/hooks/useClientProfile';
import { useDebounce } from '@/hooks/useDebounce';
import Post from './Post';
import PostSkeleton from './PostSkeleton';
import EmptyState from './EmptyState';
import DirectServiceDrawer from '@/features/services/components/DirectServiceDrawer';

const CommunityFeed = ({
  search,
  nearby,
}: {
  search?: string;
  nearby?: boolean;
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [providerId, setProviderId] = useState<number | undefined>(undefined);
  const handleOpenRequest = (providerId: number) => {
    setProviderId(providerId);
    setIsDrawerOpen(true);
  };
  const bottomRef = useRef<HTMLDivElement>(null);
  const { data: profile } = useClientProfile();

  const debouncedSearch = useDebounce(search, 500);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    usePosts({
      search: debouncedSearch,
      governorateId: nearby ? (profile?.governorateId ?? undefined) : undefined,
    });

  // Infinite Scroll
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

  console.log(posts);
  return (
    <>
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
