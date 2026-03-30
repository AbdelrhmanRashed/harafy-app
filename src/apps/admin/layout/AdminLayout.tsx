import { Outlet } from 'react-router-dom';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import AdminNavbar from '@/apps/admin/layout/AdminNavbar';
import AdminSidebar from '@/apps/admin/layout/AdminSidebar';

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="bg-background flex min-h-screen w-full">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main content */}
        <SidebarInset className="flex flex-col">
          {/* Top bar */}

          <AdminNavbar />

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
