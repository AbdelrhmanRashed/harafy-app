import CommunityFeed from '@/features/community/components/CommunityFeed';
import CreatePost from '@/features/community/components/CreatePost';
import FooterLinks from '@/features/community/components/FooterLinks';
import ProfileCard from '@/features/community/components/ProfileCard';
import QuickLinks from '@/features/community/components/QuickLinks';
import WorkSpace from '../components/WorkSpace';
import Recommended from '../components/Recommended';
import QuickRequest from '../components/QuickRequest';
import  DirectRequest  from '../components/DirectRequest';

const ClientDashboard = () => {
  return (
<main className="max-w-7xl mx-auto px-4 py-6">
  <h1 className='text-3xl font-bold mb-4'>ابدأ الآن</h1>
      <div className="grid grid-cols-1  gap-6 lg:grid-cols-12">
        <div className="space-y-4 order-1 lg:order-0 lg:col-span-9">
          <QuickRequest/>
        </div>
        <div className="space-y-4 lg:col-span-3 order-2 lg:order-0 ">
          <DirectRequest/>
        </div>
        {/* RIGHT */}
        <div className="space-y-4 order-4 lg:order-0 lg:col-span-3 ">
          <ProfileCard />
          <WorkSpace/>
        </div>

        {/* CENTER */}
        <div className="space-y-4  order-3 lg:order-0 lg:col-span-6">
          <CreatePost />
          <CommunityFeed />
        </div>

        {/* LEFT */}
        <div className="space-y-4 order-2 lg:order-0  lg:col-span-3">
          <QuickLinks  />
          <Recommended/>
        </div>
        <div className=" order-5  lg:order-0  lg:col-span-12 ">
          <FooterLinks />
        </div>
      </div>
    </main>
  );
};

export default ClientDashboard;
