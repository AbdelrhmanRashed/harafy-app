import { Outlet } from 'react-router-dom';
import Footer from '@/apps/auth/layout/Footer';
import InfoCard from '@/features/onboarding/components/InfoCard';
import RegistrationStatusCard from '@/features/onboarding/components/RegistrationStatusCard';
import { useAccountStatus } from '@/features/auth/hooks/useAccountStatus';
import { getMainRole } from '@/lib/auth/getMainRole';

const OnboardingLayout = () => {
  const { data: accountStatus } = useAccountStatus();
  const role = getMainRole(accountStatus?.role, accountStatus?.isProvider);

  const isProvider = role === 'Provider';

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <main className="mx-auto grid w-full max-w-7xl flex-1 gap-8 px-4 py-10 md:grid-cols-6 lg:gap-12">
        {/* Sidebar Logic */}
        {isProvider && (
          <aside className="space-y-6 md:col-span-2">
            {/* Mobile View */}
            <div className="md:hidden">
              <RegistrationStatusCard />
            </div>

            {/* Desktop View */}
            <div className="sticky top-10 hidden space-y-6 md:block">
              <RegistrationStatusCard />
              <InfoCard />
            </div>
          </aside>
        )}

        {/* Main Content Area */}
        <section
          className={
            isProvider ? 'md:col-span-4' : 'flex justify-center md:col-span-6'
          }
        >
          <div className="w-full max-w-4xl">
            <Outlet />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OnboardingLayout;
