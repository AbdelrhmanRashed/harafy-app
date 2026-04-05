import ProviderTest from '@/features/auth/pages/ProviderTest';
import ProtectedRoute from '@/components/guards/ProtectedRoute';
import VerificationPage from '@/features/information/pages/VerificationPage';
import ReviewPage from '@/features/information/pages/ReviewPage';

const ProviderRoutes = [
  {
    path: '/provider',
    element: (
      <ProtectedRoute allowedRoles={['Provider', 'Admin']}>
        <ProviderTest />
      </ProtectedRoute>
    ),

    children: [
      {
        path: 'verify',
        element: <VerificationPage />,
      },
      {
        path: 'review',
        element: <ReviewPage />,
      },
    ],
  },
];

export default ProviderRoutes;
