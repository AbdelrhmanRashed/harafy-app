import CreatePost from '../components/CreatePost';
import CommunityFeed from '../components/CommunityFeed';
import QuickLinks from '../components/QuickLinks';
import ProfileCard from '../components/ProfileCard';
import WorkSpace from '../components/WorkSpace';

const CommunityPage = () => {
  return (
    <main>
      <CreatePost />
      <CommunityFeed />
      <QuickLinks />
      <ProfileCard />
      <WorkSpace />
    </main>
  );
};

export default CommunityPage;
