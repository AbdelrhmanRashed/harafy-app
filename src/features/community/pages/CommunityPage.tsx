import CreatePost from '../components/CreatePost';
import CommunityFeed from '../components/CommunityFeed';
import QuickLinks from '../components/QuickLinks';
import ProfileCard from '../components/ProfileCard';
import FooterLinks from '../components/FooterLinks';
import { useAuthStore } from '@/store/useAuthStore';

const CommunityPage = () => {
  const user = useAuthStore((s) => s.user);
  console.log(user);

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="hidden lg:sticky lg:top-20 lg:col-span-3 lg:block">
          <ProfileCard user={user} />
        </div>

        <div className="col-span-1 space-y-4 lg:col-span-6">
          <CreatePost user={user} />
          <CommunityFeed />
        </div>

        <div className="hidden lg:sticky lg:top-20 lg:col-span-3 lg:block">
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
