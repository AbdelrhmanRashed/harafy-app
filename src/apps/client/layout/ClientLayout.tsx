import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/layout/navbar/Navbar';

const ClientLayout = () => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <main className="w-full flex-1 overflow-y-auto pb-16 md:pb-0">
        <Outlet />
      </main>
    </div>
  );
};

export default ClientLayout;
