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
import DirectRequestDetailsPage from '@/features/services/pages/requests/DirectRequestDetailsPage';
import ActiveRequestGuard from '@/guards/ActiveRequestGuard';
import RequestsPage from '@/features/services/pages/RequestsPage';
import AllNotificationsPage from '@/features/notifications/pages/AllNotificationsPage';

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
        handle: { title: 'الرئيسية' },
      },
      {
        path: 'community',
        element: <CommunityPage />,
        handle: { title: 'المجتمع' },
      },
      // services routes
      {
        path: 'services',
        children: [
          {
            index: true,
            element: (
              <ActiveRequestGuard>
                <ServicesPage />
              </ActiveRequestGuard>
            ),
            handle: { title: 'الخدمات' },
          },
          {
            path: 'instant',
            element: (
              <ActiveRequestGuard>
                <InstantServicesPage />
              </ActiveRequestGuard>
            ),
            handle: { title: 'الخدمات الفورية' },
          },
          {
            path: 'requests/:requestId/pending',
            element: <RequestPending />,
            handle: { title: 'طلب قيد الانتظار' },
          },
          {
            path: 'requests/:requestId',
            element: <DirectRequestDetailsPage />,
            handle: { title: 'تفاصيل الطلب' },
          },
        ],
      },

      // Settings routes
      {
        path: 'settings',
        element: <SettingsLayout />,

        children: [
          { index: true, element: <Navigate to="info" replace /> },
          {
            path: 'info',
            element: <ProfileSettingsPage />,
            handle: { title: 'معلومات الملف الشخصي' },
          },
          {
            path: 'notifications',
            element: <NotificationsPage />,
            handle: { title: 'الإشعارات' },
          },
          {
            path: 'security',
            element: <SecurityPage />,
            handle: { title: 'الأمان' },
          },
        ],
      },

      // profile routes
      {
        path: 'profile/:providerId',
        element: <ProviderProfilePage />,
        handle: { title: 'الملف الشخصي' },
      },
      {
        path: 'requests',
        handle: { title: 'الطلبات' },
        element: <RequestsPage />,
      },
      {
        path: 'notifications',
        handle: { title: 'الإشعارات' },
        element: <AllNotificationsPage />,
      },
    ],
  },
];

export default clientRoutes;
