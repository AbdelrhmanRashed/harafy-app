import OnboardingLayout from './layout/OnboardingLayout';
import VerificationPage from '@/features/onboarding/pages/VerificationPage';
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
        <OnboardingGuard>
          <OnboardingLayout />
        </OnboardingGuard>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="user-profile" replace />,
      },

      {
        path: 'user-profile',
        element: <UserProfileSettings />,
      },
      {
        path: 'verification',
        element: <VerificationPage />,
      },
      {
        path: 'review',
        element: <ReviewPage />,
      },
    ],
  },
];

export default onboardingRoutes;
