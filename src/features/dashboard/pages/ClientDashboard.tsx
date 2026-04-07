import CommunityFeed from '@/features/community/components/CommunityFeed';
import CreatePost from '@/features/community/components/CreatePost';
import FooterLinks from '@/features/community/components/FooterLinks';
import ProfileCard from '@/features/community/components/ProfileCard';
import QuickLinks from '@/features/community/components/QuickLinks';
import WorkSpace from '../components/WorkSpace';
import QuickRequest from '../components/QuickRequest';
import DirectRequest from '../components/DirectRequest';
import { useAuthStore } from '@/store/useAuthStore';
import { useClientProfile } from '@/features/profile/hooks/useClientProfile';
import ProfileCardSkeleton from '@/features/community/components/ProfileCardSkeleton';

const ClientDashboard = () => {
  const { data: clientProfile, isLoading } = useClientProfile();
  const roles = useAuthStore((state) => state.user?.role);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6" dir="rtl">
      <h1 className="text-primary mb-6 text-right text-3xl font-bold">
        ابدأ الآن
      </h1>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="order-1 lg:col-span-8">
          <QuickRequest />
        </div>

        <div className="order-2 lg:col-span-4">
          <DirectRequest />
        </div>

        <div className="order-4 hidden space-y-4 lg:sticky lg:top-20 lg:order-3 lg:col-span-3 lg:block">
          {isLoading ? (
            <ProfileCardSkeleton />
          ) : (
            <ProfileCard clientProfile={clientProfile} roles={roles} />
          )}
          <WorkSpace />
        </div>

        <div className="order-3 space-y-4 lg:order-4 lg:col-span-6">
          <CreatePost clientProfile={clientProfile} />
          <CommunityFeed />
        </div>

        <div className="order-5 hidden space-y-4 lg:sticky lg:top-20 lg:col-span-3 lg:block">
          <QuickLinks />
        </div>

        <div className="order-6 mt-6 lg:col-span-12">
          <FooterLinks />
        </div>
      </div>
    </main>
  );
};
export default ClientDashboard;
