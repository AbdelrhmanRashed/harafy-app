import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { mapStatus } from '@/lib/auth/mapProfileStatus';
import { useAccountStatus } from '@/features/auth/hooks/useAccountStatus';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

const AppStatusGuard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  const { data: accountStatus, isLoading } = useAccountStatus();

  if (!user) return null;
  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  const status = mapStatus(accountStatus?.status ?? user.status);

  if (status !== 'Completed' && status !== 'Approved') {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default AppStatusGuard;
