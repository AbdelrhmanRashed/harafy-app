import CreatePost from '../components/CreatePost';
import CommunityFeed from '../components/CommunityFeed';
import QuickLinks from '../components/QuickLinks';
import ProfileCard from '../components/ProfileCard';
import FooterLinks from '../components/FooterLinks';
import { useClientProfile } from '@/features/profile/hooks/useClientProfile';
import { useAuthStore } from '@/store/useAuthStore';
import CommunitySkeletonPage from '../components/CommunitySkeletonPage';
import PostsFilter from '../components/PostsFilter';
import { useState } from 'react';

const CommunityPage = () => {
  const { data: clientProfile, isLoading } = useClientProfile();
  const roles = useAuthStore((state) => state.user?.role);
  const [search, setSearch] = useState('');
  const [nearby, setNearby] = useState(false);

  if (isLoading) return <CommunitySkeletonPage />;

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="hidden lg:sticky lg:top-20 lg:col-span-3 lg:block">
          <ProfileCard clientProfile={clientProfile} roles={roles} />
        </div>

        <div className="col-span-1 space-y-4 lg:col-span-6">
          <CreatePost clientProfile={clientProfile} />
          <CommunityFeed search={search} nearby={nearby} />
        </div>

        <div className="hidden space-y-4 lg:sticky lg:top-20 lg:col-span-3 lg:block">
          <PostsFilter setSearch={setSearch} setNearby={setNearby} />
          <QuickLinks />
        </div>

        <div className="col-span-1 mt-4 lg:col-span-12">
          <FooterLinks />
        </div>
      </div>
    </main>
  );
};

export default CommunityPage;
