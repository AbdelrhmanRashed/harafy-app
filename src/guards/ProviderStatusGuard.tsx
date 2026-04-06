import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { mapProfileStatus } from '@/lib/auth/mapProfileStatus';

const ProviderStatusGuard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();

  if (!user) return null;

  const status = mapProfileStatus(user.status);

  if (status !== 'Approved') {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default ProviderStatusGuard;
