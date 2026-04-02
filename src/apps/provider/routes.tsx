import ProviderTest from '@/features/auth/pages/ProviderTest';
import ProtectedRoute from '@/components/guards/ProtectedRoute';

const ProviderRoutes = [
  {
    path: '/provider',
    element: (
      <ProtectedRoute allowedRoles={['Provider', 'Admin']}>
        <ProviderTest />
      </ProtectedRoute>
    ),
  },
];

export default ProviderRoutes;
