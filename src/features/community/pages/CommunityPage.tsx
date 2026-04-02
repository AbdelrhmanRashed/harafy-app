import CreatePost from '../components/CreatePost';
import CommunityFeed from '../components/CommunityFeed';
import QuickLinks from '../components/QuickLinks';
import ProfileCard from '../components/ProfileCard';
import FooterLinks from '../components/FooterLinks';

const CommunityPage = () => {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* RIGHT */}
        <div className="order-1 space-y-4 lg:order-0 lg:col-span-3">
          <ProfileCard />
        </div>

        {/* CENTER */}
        <div className="order-3 space-y-4 lg:order-0 lg:col-span-6">
          <CreatePost />
          <CommunityFeed />
        </div>

        {/* LEFT */}
        <div className="order-2 space-y-4 lg:order-0 lg:col-span-3">
          <QuickLinks />
        </div>
        <div className="order-4 lg:order-0 lg:col-span-12">
          <FooterLinks />
        </div>
      </div>
    </main>
  );
};

export default CommunityPage;
