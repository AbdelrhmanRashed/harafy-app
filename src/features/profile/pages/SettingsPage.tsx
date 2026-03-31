import { Outlet } from "react-router-dom";
import { ProfileSidebar } from "../components/ProfileSidebar";

export default function SettingsPage() {

  return (
    <div dir="rtl" className="max-h-screen bg-muted p-6 lg:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex gap-6 items-start">
         <ProfileSidebar
  onLogout={() => console.log("logout")}
/>
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}