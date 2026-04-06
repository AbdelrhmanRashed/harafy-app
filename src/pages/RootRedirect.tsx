import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { getRedirectPath } from '@/lib/auth/getRedirectPath';
import LandingPage from './LandingPage';
import { mapUser } from '@/lib/auth/mapUser';

const RootRedirect = () => {
  const { isAuthenticated, user } = useAuthStore();

  // not logged in
  if (!isAuthenticated || !user) {
    return <LandingPage />;
  }

  // map user
  const mappedUser = mapUser(user);

  //  get correct path
  const redirectPath = getRedirectPath(mappedUser);

  return <Navigate to={redirectPath} replace />;
};

export default RootRedirect;
