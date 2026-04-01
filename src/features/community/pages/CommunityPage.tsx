import CreatePost from '../components/CreatePost';
import CommunityFeed from '../components/CommunityFeed';
import QuickLinks from '../components/QuickLinks';
import ProfileCard from '../components/ProfileCard';
import FooterLinks from '../components/FooterLinks';

const CommunityPage = () => {
  return (
<main className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* RIGHT */}
        <div className="space-y-4 order-1 lg:order-0 lg:col-span-3 ">
          <ProfileCard />
        </div>

        {/* CENTER */}
        <div className="space-y-4  order-3 lg:order-0 lg:col-span-6">
          <CreatePost />
          <CommunityFeed />
        </div>

        {/* LEFT */}
        <div className="space-y-4 order-2 lg:order-0  lg:col-span-3">
          <QuickLinks  />
        </div>
        <div className=" order-4  lg:order-0  lg:col-span-12 ">
          <FooterLinks />
        </div>
      </div>
    </main>
  );
};

export default CommunityPage;
