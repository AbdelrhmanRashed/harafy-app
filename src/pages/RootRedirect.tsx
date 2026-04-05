import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { getMainRole } from '@/lib/role';
import LandingPage from './LandingPage';

const RootRedirect = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user) {
    const role = getMainRole(user.role, user.isProvider);

    if (role === 'Admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }

    if (role === 'Client') {
      return <Navigate to="/app/home" replace />;
    }

    if (role === 'Provider') {
      return <Navigate to="/provider" replace />;
    }
  }

  return <LandingPage />;
};

export default RootRedirect;
