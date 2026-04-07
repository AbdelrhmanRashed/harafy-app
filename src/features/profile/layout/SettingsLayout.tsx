import ProfileSidebar from '../components/ProfileSidebar';
import { Outlet } from 'react-router-dom';

const SettingsLayout = () => {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8 px-4 py-6">
      <div className="col-span-12 lg:col-span-3">
        <div className="sticky top-22">
          <ProfileSidebar />
        </div>
      </div>

      <main className="col-span-12 lg:col-span-9">
        <Outlet />
      </main>
    </div>
  );
};

export default SettingsLayout;
