import { Navigate } from 'react-router-dom';
import ProtectedRoute from '@/guards/ProtectedRoute';
// layout
import ClientLayout from './layout/ClientLayout';
// pages
import ClientDashboard from '@/features/dashboard/pages/ClientDashboard';
import CommunityPage from '@/features/community/pages/CommunityPage';
// services
import ServicesPage from '@/features/services/pages/ServicesPage';
import InstantServicesPage from '@/features/services/pages/instant/InstantServicesPage';
import DirectServicesPage from '@/features/services/pages/direct/DirectServicesPage';
// profile
import ProviderProfilePage from '@/features/profile/pages/ProviderProfilePage';
// profile settings
import SettingsLayout from '@/features/profile/layout/SettingsLayout';
import ProfileSettingsPage from '@/features/profile/pages/ProfileSettingsPage';
import NotificationsPage from '@/features/profile/pages/NotificationsPage';
import SecurityPage from '@/features/profile/pages/SecurityPage';
// guards
import AppStatusGuard from '@/guards/AppStatusGuard';
import RequestPending from '@/features/services/pages/servicesStatus/RequestPendingPage';

const clientRoutes = [
  {
    path: '/app',
    element: (
      <ProtectedRoute allowedRoles={['Client', 'Admin']}>
        <AppStatusGuard>
          <ClientLayout />
        </AppStatusGuard>
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
      // services routes
      {
        path: 'services',
        children: [
          { index: true, element: <ServicesPage /> },
          { path: 'instant', element: <InstantServicesPage /> },
          { path: 'direct', element: <DirectServicesPage /> },
          { path: ':requests/:requestId/pending', element: <RequestPending /> },
          { path: 'requests', element: <div>Requests List Page</div> },
          {
            path: 'requests/:requestId',
            element: <div>Request Details Page</div>,
          },
        ],
      },

      // Settings routes
      {
        path: 'settings',
        element: <SettingsLayout />,
        children: [
          { index: true, element: <Navigate to="info" replace /> },
          { path: 'info', element: <ProfileSettingsPage /> },
          { path: 'notifications', element: <NotificationsPage /> },
          { path: 'security', element: <SecurityPage /> },
        ],
      },

      // profile routes
      {
        path: 'profile/provider/:providerId',
        element: <ProviderProfilePage />,
      },
      // {
      //   path: "requests",
      //   element: <RequestsPage />,
      // },
    ],
  },
];

export default clientRoutes;
