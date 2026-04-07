import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { getMainRole } from '@/lib/auth/getMainRole';
import { mapStatus } from '@/lib/auth/mapProfileStatus';
import { useClientProfile } from '@/features/profile/hooks/useClientProfile';
import { useAccountStatus } from '@/features/auth/hooks/useAccountStatus';
import VerificationSkeleton from '@/features/onboarding/components/VerificationSkeleton';

// ---------------------------------------------------------------------------
// Profile-completeness check — runs against React Query data, never Zustand.
// ---------------------------------------------------------------------------
const isProfileComplete = (
  profile:
    | {
        firstName?: string | null;
        lastName?: string | null;
        phoneNumbers?: string[];
        governorateId?: number | null;
        regionId?: number | null;
      }
    | undefined,
): boolean => {
  if (!profile) return false;
  return !!(
    profile.firstName &&
    profile.lastName &&
    (profile.phoneNumbers?.length ?? 0) > 0 &&
    profile.governorateId &&
    profile.regionId
  );
};

// ---------------------------------------------------------------------------
// Guard
// ---------------------------------------------------------------------------
const OnboardingGuard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  const { data: accountStatus } = useAccountStatus();

  // ── 1. No authenticated user → ProtectedRoute handles this, but be safe. ──
  if (!user) return null;

  const role = getMainRole(
    accountStatus?.role ?? user.role,
    accountStatus?.isProvider ?? user.isProvider,
  );
  const status = mapStatus(accountStatus?.status ?? user.status);

  // ── 2. Client routing (no profile query needed) ──────────────────────────
  if (role === 'Client') {
    if (status === 'Pending') {
      return <ClientGuard>{children}</ClientGuard>;
    }
    // Completed / any other status → push out of onboarding
    return <Navigate to="/app" replace />;
  }

  // ── 3. Provider routing (needs profile query for completeness check) ──────
  if (role === 'Provider') {
    if (status === 'UnderReview') {
      return <Navigate to="/onboarding/review" replace />;
    }
    if (status === 'Approved') {
      return <Navigate to="/provider" replace />;
    }
    // Pending — we need to know if the profile is filled in yet.
    if (status === 'Pending') {
      return <ProviderPendingGuard>{children}</ProviderPendingGuard>;
    }
  }

  // ── 4. Fallback ───────────────────────────────────────────────────────────
  return <>{children}</>;
};

// ---------------------------------------------------------------------------
// Client sub-guard: only /onboarding/user-profile is valid for a Client.
// Every other onboarding path redirects there.
// ---------------------------------------------------------------------------
const ClientGuard = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  if (location.pathname !== '/onboarding/user-profile') {
    return <Navigate to="/onboarding/user-profile" replace />;
  }

  return <>{children}</>;
};

// ---------------------------------------------------------------------------
// Provider pending sub-guard: reads React Query data to decide the step.
// Renders a full-page spinner while the query is in-flight, preventing any
// premature redirect from an undefined/stale profile state.
// ---------------------------------------------------------------------------
const ProviderPendingGuard = ({ children }: { children: React.ReactNode }) => {
  const { data: profile, isLoading, isError } = useClientProfile();
  const location = useLocation();

  // Still fetching — hold tight, render nothing committed yet.
  if (isLoading) {
    return <VerificationSkeleton />;
  }

  // On error, let the user stay where they are (fail open, not loop).
  if (isError) return <>{children}</>;

  const complete = isProfileComplete(profile);

  if (!complete) {
    if (location.pathname !== '/onboarding/user-profile') {
      return <Navigate to="/onboarding/user-profile" replace />;
    }
    return <>{children}</>;
  }

  // Profile is complete → must be on verification step.
  if (location.pathname !== '/onboarding/verification') {
    return <Navigate to="/onboarding/verification" replace />;
  }

  return <>{children}</>;
};

export default OnboardingGuard;
