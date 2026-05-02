import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { getMainRole } from '@/lib/auth/getMainRole';
import { mapStatus } from '@/lib/auth/mapProfileStatus';
import { useClientProfile } from '@/features/profile/hooks/useClientProfile';
import { useAccountStatus } from '@/features/auth/hooks/useAccountStatus';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import VerificationSkeleton from '@/features/onboarding/components/VerificationSkeleton';
import { useGetMyProviderProfile } from '@/features/onboarding/hooks/useGetMyProviderProfile';
import { useGetProviderDocs } from '@/features/onboarding/hooks/useGetProviderDocs';

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

const isProviderProfileComplete = (providerProfile: any): boolean => {
  // Provider profile must exist AND have at least one service
  return !!(
    providerProfile &&
    Array.isArray(providerProfile.services) &&
    providerProfile.services.length >= 1
  );
};


const hasUploadedDocs = (docs: any): boolean => {
  if (!Array.isArray(docs) || docs.length === 0) return false;
  // If any document is explicitly rejected, the provider must re-upload it
  const hasRejected = docs.some((doc: any) => doc.isApproved === false);
  return !hasRejected;
};


const OnboardingGuard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  const { data: accountStatus, isLoading } = useAccountStatus();
  const location = useLocation();

  if (!user) return null;
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const role = getMainRole(
    accountStatus?.role ?? user.role,
    accountStatus?.isProvider ?? user.isProvider,
  );
  const status = mapStatus(accountStatus?.status ?? user.status);

  if (status === 'Suspended') {
    return <Navigate to="/suspended" replace />;
  }

  if (role === 'Client') {
    if (status === 'Pending') return <ClientGuard>{children}</ClientGuard>;
    return <Navigate to="/app" replace />;
  }

  if (role === 'Provider') {
    if (status === 'UnderReview') {
      if (location.pathname !== '/onboarding/review') {
        return <Navigate to="/onboarding/review" replace />;
      }
      return <>{children}</>;
    }
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

/**
 * Guards the 4-step provider onboarding flow:
 *   Step 1: /onboarding/user-profile    → gated by isProfileComplete (client profile)
 *   Step 2: /onboarding/provider-profile → gated by isProviderProfileComplete (provider profile API)
 *   Step 3: /onboarding/verification     → gated by hasUploadedDocs
 *   Step 4: /onboarding/review
 */
const ProviderPendingGuard = ({ children }: { children: React.ReactNode }) => {
  const { data: profile, isLoading: isLoadingProfile, isError: isProfileError } = useClientProfile();
  const { data: providerProfile, isLoading: isLoadingProviderProfile, isFetched: isProviderProfileFetched } = useGetMyProviderProfile();
  const { data: docs, isLoading: isLoadingDocs, isFetched: isDocsFetched } = useGetProviderDocs();
  const location = useLocation();

  // Show skeleton while any critical data is loading
  const isLoading = isLoadingProfile || isLoadingProviderProfile || isLoadingDocs;
  if (isLoading) return <VerificationSkeleton />;

  // If client profile fetch errored, allow through to avoid blocking
  if (isProfileError) return <>{children}</>;

  // ── Step 1 check: user-profile must be complete ──
  const profileComplete = isProfileComplete(profile);
  if (!profileComplete) {
    if (location.pathname !== '/onboarding/user-profile') {
      return <Navigate to="/onboarding/user-profile" replace />;
    }
    return <>{children}</>;
  }

  // ── Step 2 check: provider profile must exist ──
  const providerProfileComplete = isProviderProfileFetched && isProviderProfileComplete(providerProfile);
  if (!providerProfileComplete) {
    if (location.pathname !== '/onboarding/provider-profile') {
      return <Navigate to="/onboarding/provider-profile" replace />;
    }
    return <>{children}</>;
  }

  // ── Step 3 check: documents must be uploaded ──
  const docsUploaded = isDocsFetched && hasUploadedDocs(docs);
  if (!docsUploaded) {
    if (location.pathname !== '/onboarding/verification') {
      return <Navigate to="/onboarding/verification" replace />;
    }
    return <>{children}</>;
  }

  // ── All steps done → review ──
  if (location.pathname !== '/onboarding/review') {
    return <Navigate to="/onboarding/review" replace />;
  }

  return <>{children}</>;
};

export default OnboardingGuard;
