import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { mapProfileStatus } from '@/lib/auth/mapProfileStatus';

const AppStatusGuard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();

  if (!user) return null;

  const status = mapProfileStatus(user.status);

  if (status !== 'Completed') {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default AppStatusGuard;
