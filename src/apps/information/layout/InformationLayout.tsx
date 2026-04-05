import Footer from '@/apps/auth/layout/Footer';
import InfoCard from '@/features/information/components/InfoCard';
import RegistrationStatusCard from '@/features/information/components/RegistrationStatusCard';
import { Outlet } from 'react-router-dom';

const InformationLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto grid max-w-7xl flex-1 gap-6 px-4 py-10 md:grid-cols-6">
        {/* Mobile View */}
        <div className="space-y-4 md:hidden">
          <RegistrationStatusCard />
        </div>

        {/* Sidebar */}
        <aside className="sticky top-10 hidden h-fit space-y-4 md:col-span-2 md:block">
          <RegistrationStatusCard />
          <InfoCard />
        </aside>

        {/* Main Content */}
        <section className="col-span-1 md:col-span-4">
          <div className="mx-auto w-full max-w-4xl">
            <Outlet />
          </div>
        </section>
      </main>

      {/* Footer خارج الـ main ليمتد بعرض الشاشة أو يأخذ تنسيقه الخاص */}
      <Footer />
    </div>
  );
};

export default InformationLayout;
