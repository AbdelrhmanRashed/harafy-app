import { Outlet } from 'react-router-dom';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

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
          <header className="border-border flex h-14 items-center gap-3 border-b px-6">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <div className="bg-border h-5 w-px" />
            <p className="text-muted-foreground text-sm">Admin Panel</p>
          </header>

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
