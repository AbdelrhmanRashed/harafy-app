import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { mapStatus } from '@/lib/auth/mapProfileStatus';
import { useAccountStatus } from '@/features/auth/hooks/useAccountStatus';

const AppStatusGuard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  const { data: accountStatus } = useAccountStatus();

  console.log(accountStatus, user);

  if (!user) return null;

  const status = mapStatus(accountStatus?.status ?? user.status);

  if (status !== 'Completed') {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default AppStatusGuard;
