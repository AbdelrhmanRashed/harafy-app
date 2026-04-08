import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { getMainRole } from '@/lib/auth/getMainRole';

/**
 * Guards a route by authentication and (optionally) by role.
 *
 * Responsibilities:
 *  ✅ Redirect unauthenticated users to /auth/login
 *  ✅ Redirect users with wrong role to /unauthorized
 *
 * NOT responsible for:
 *  ❌ Profile status checks  → that is OnboardingGuard's job
 *  ❌ Onboarding step routing → that is OnboardingGuard's job
 */
const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (allowedRoles) {
    const role = getMainRole(user.role, user.isProvider);
    if (!allowedRoles.includes(role)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
