import ProfileSidebar from '../components/ProfileSidebar';
import { Outlet } from 'react-router-dom';

const SettingsLayout = () => {
  return (
    <div className="container m-auto grid grid-cols-12 gap-8 px-4 py-8">
      <div className="col-span-12 lg:col-span-3">
        <ProfileSidebar />
      </div>
      <div className="col-span-12 lg:col-span-9">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsLayout;
