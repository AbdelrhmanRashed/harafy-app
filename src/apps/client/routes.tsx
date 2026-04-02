import ClientLayout from './layout/ClientLayout';
import { Navigate } from 'react-router-dom';
import ClientDashboard from '@/features/dashboard/pages/ClientDashboard';
import DirectRequestPage from '@/features/services/pages/direct/DirectServicesPage';
import CommunityPage from '@/features/community/pages/CommunityPage';
import InstantRequestPage from '@/features/services/pages/instant/InstantServicesPage';
import ProfilePage from '@/features/profile/pages/ProfilePage';
import SettingsPage from '@/features/profile/pages/SettingsPage';
import InstantServicesPage from '@/features/services/pages/instant/InstantServicesPage';
import DirectServicesPage from '@/features/services/pages/direct/DirectServicesPage';
import ServicesPage from '@/features/services/pages/ServicesPage';
import ProtectedRoute from '@/components/guards/ProtectedRoute';
const clientRoutes = [
  {
    path: '/app',
    element: (
      <ProtectedRoute allowedRoles={['Client', 'Admin']}>
        <ClientLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="home" replace />,
      },
      {
        path: 'home',
        element: <ClientDashboard />,
      },
      {
        path: 'community',
        element: <CommunityPage />,
      },
      {
        path: 'services',
        children: [
          { index: true, element: <ServicesPage /> },
          { path: 'instant', element: <InstantServicesPage /> },
          { path: 'direct', element: <DirectServicesPage /> },
        ],
      },
      {
        path: 'direct-service',
        element: <DirectRequestPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'profile-settings',
        element: <SettingsPage />,
      },
      {
        path: 'instant-service',
        element: <InstantRequestPage />,
      },
      // {
      //   path: "requests",
      //   element: <RequestsPage />,
      // },
    ],
  },
];

export default clientRoutes;
