import ProviderTest from '@/features/auth/pages/ProviderTest';
import ProtectedRoute from '@/guards/ProtectedRoute';
import ProviderStatusGuard from '@/guards/ProviderStatusGuard';

const ProviderRoutes = [
  {
    path: '/provider',
    element: (
      <ProtectedRoute allowedRoles={['Provider', 'Admin']}>
        <ProviderStatusGuard>
          <ProviderTest />
        </ProviderStatusGuard>
      </ProtectedRoute>
    ),
  },
];

export default ProviderRoutes;
