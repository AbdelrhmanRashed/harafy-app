import { Outlet } from "react-router-dom";
import ProviderSidebar from "@/components/layout/sidebar/SideBar";
import { Navbar } from "@/components/layout/navbar/Navbar";

const ProviderLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      
        {/* Navbar */}
        <Navbar  />

      {/* Main */}
      <div className="flex-1 flex flex-row">
        
      {/* Sidebar */}
        <ProviderSidebar />

        {/* Content */}
        <main className="flex-1  bg-muted/30">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default ProviderLayout;