import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { getMainRole } from '@/lib/auth/getMainRole';
import { mapStatus } from '@/lib/auth/mapProfileStatus';
import { useClientProfile } from '@/features/profile/hooks/useClientProfile';
import { useAccountStatus } from '@/features/auth/hooks/useAccountStatus';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import VerificationSkeleton from '@/features/onboarding/components/VerificationSkeleton';

const isProfileComplete = (profile: any): boolean => {
  if (!profile) return false;
  return !!(
    profile.firstName &&
    profile.lastName &&
    (profile.phoneNumbers?.length ?? 0) > 0 &&
    profile.governorateId &&
    profile.regionId
  );
};

const OnboardingGuard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  const { data: accountStatus, isLoading } = useAccountStatus();

  if (!user) return null;
  if (isLoading) return <LoadingSpinner />;

  const role = getMainRole(
    accountStatus?.role ?? user.role,
    accountStatus?.isProvider ?? user.isProvider,
  );
  const status = mapStatus(accountStatus?.status ?? user.status);

  if (role === 'Client') {
    if (status === 'Pending') return <ClientGuard>{children}</ClientGuard>;
    return <Navigate to="/app" replace />;
  }

  if (role === 'Provider') {
    if (status === 'UnderReview')
      return <Navigate to="/onboarding/review" replace />;
    if (status === 'Approved') return <Navigate to="/provider" replace />;
    if (status === 'Pending')
      return <ProviderPendingGuard>{children}</ProviderPendingGuard>;
  }

  return <>{children}</>;
};

const ClientGuard = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  if (location.pathname !== '/onboarding/user-profile') {
    return <Navigate to="/onboarding/user-profile" replace />;
  }
  return <>{children}</>;
};

const ProviderPendingGuard = ({ children }: { children: React.ReactNode }) => {
  const { data: profile, isLoading, isError } = useClientProfile();
  const location = useLocation();

  if (isLoading) return <VerificationSkeleton />;
  if (isError) return <>{children}</>;

  const complete = isProfileComplete(profile);

  if (!complete) {
    if (location.pathname !== '/onboarding/user-profile') {
      return <Navigate to="/onboarding/user-profile" replace />;
    }
    return <>{children}</>;
  }

  if (location.pathname !== '/onboarding/verification') {
    return <Navigate to="/onboarding/verification" replace />;
  }

  return <>{children}</>;
};

export default OnboardingGuard;
