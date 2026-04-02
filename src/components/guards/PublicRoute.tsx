import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { getMainRole } from '@/lib/role';
import { ROLE_REDIRECT } from '@/constants/redirects';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAuthStore();

  if (isAuthenticated && user) {
    const role = getMainRole(user.role, user.isProvider);
    return <Navigate to={ROLE_REDIRECT[role]} replace />;
  }

  return children;
};

export default PublicRoute;
