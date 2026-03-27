import { Outlet } from 'react-router-dom';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import Navbar from '@/components/dashboard/Navbar';
import AppSidebar from '@/components/dashboard/AppSidebar';

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="bg-background flex min-h-screen w-full">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main content */}
        <SidebarInset className="flex flex-col">
          {/* Top bar */}

          <Navbar />

          {/* Page content */}
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
