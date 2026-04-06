import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { getRedirectPath } from '@/lib/auth/getRedirectPath';
import { mapUser } from '@/lib/auth/mapUser';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAuthStore();

  if (isAuthenticated && user) {
    const mappedUser = mapUser(user);

    const redirectPath = getRedirectPath(mappedUser);

    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default PublicRoute;
