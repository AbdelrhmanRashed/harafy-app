import OnboardingLayout from './layout/OnboardingLayout';
import VerificationPage from '@/features/onboarding/pages/VerificationPage';
import ProviderProfilePage from '@/features/onboarding/pages/ProviderProfilePage';
import ReviewPage from '@/features/onboarding/pages/ReviewPage';
import UserProfileSettings from '@/features/onboarding/pages/UserProfileSettings';
import { Navigate } from 'react-router-dom';
import OnboardingGuard from '@/guards/OnboardingGuard';
import ProtectedRoute from '@/guards/ProtectedRoute';

const onboardingRoutes = [
  {
    path: '/onboarding',
    element: (
      <ProtectedRoute>
        <OnboardingLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="user-profile" replace />,
      },
      {
        path: 'user-profile',
        element: (
          <OnboardingGuard>
            <UserProfileSettings />
          </OnboardingGuard>
        ),
        handle: { title: 'المعلومات الشخصية' },
      },
      {
        path: 'provider-profile',
        element: (
          <OnboardingGuard>
            <ProviderProfilePage />
          </OnboardingGuard>
        ),
        handle: { title: 'بيانات المهنة' },
      },
      {
        path: 'verification',
        element: (
          <OnboardingGuard>
            <VerificationPage />
          </OnboardingGuard>
        ),
        handle: { title: 'رفع المستندات' },
      },
      {
        path: 'review',
        element: (
          <OnboardingGuard>
            <ReviewPage />
          </OnboardingGuard>
        ),
        handle: { title: 'مراجعة الطلب' },
      },
    ],
  },
];
export default onboardingRoutes;
