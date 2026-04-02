import { getMainRole } from '@/lib/role';
import { useAuthStore } from '@/store/useAuthStore';
import type { UserRole } from '@/types/auth.types';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuthStore();
  const role = user ? getMainRole(user.role, user.isProvider) : 'Guest';

  console.log(role);

  // If user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  console.log(allowedRoles);

  console.log(allowedRoles.includes(role));
  // If user is not authorized, redirect to unauthorized page
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  // If user is authenticated and authorized, render the children
  return children;
};

export default ProtectedRoute;
