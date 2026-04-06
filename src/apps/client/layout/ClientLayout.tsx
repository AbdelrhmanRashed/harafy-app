import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/layout/navbar/Navbar';

const ClientLayout = () => {
  // hydrate the store with the data from localStorage
  // useClientProfile();
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="w-full flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
    </div>
  );
};

export default ClientLayout;
