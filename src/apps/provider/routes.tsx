import ProviderDashboard from '@/features/dashboard/pages/ProviderDashboard';
import SettingsLayout from '@/features/profile/layout/SettingsLayout';
import NotificationsPage from '@/features/profile/pages/NotificationsPage';
import ProviderProfilePage from '@/features/profile/pages/ProviderProfilePage';
import ProfileSettingsPage from '@/features/profile/pages/ProfileSettingsPage';
import SecurityPage from '@/features/profile/pages/SecurityPage';
import ProtectedRoute from '@/guards/ProtectedRoute';
import ProviderStatusGuard from '@/guards/ProviderStatusGuard';
import { Navigate } from 'react-router-dom';
import ProviderLayout from './layout/ProviderLayout';
import Requests from '@/features/Requests/pages/Requests';
import ReviewsPage from '@/features/reviews/pages/ReviewsPage';
import DirectPage from '@/features/Requests/pages/direct/DirectPage';

import AllNotificationsPage from '@/features/notifications/pages/AllNotificationsPage';

import AssignedRequestsPage from '@/features/Requests/pages/asignRequest/AllRequests';
import MyOffersPage from '@/features/Requests/pages/offer/MyOffersPage';
import OrderTrackPage from '@/features/Requests/pages/track/OrderTrackPage';
import Creadit from '@/features/creadit/pages/Creadit';
import ProviderCommunityPage from '@/features/community/pages/ProviderCommunityPage';

const ProviderRoutes = [
  {
    path: '/provider',
    element: (
      <ProtectedRoute allowedRoles={['Provider', 'Admin']}>
        <ProviderStatusGuard>
          <ProviderLayout />
        </ProviderStatusGuard>
      </ProtectedRoute>
      // <ProviderLayout />
    ),
    children: [
      {
        index: true,
        element: <Navigate to="home" replace />,
      },
      {
        path: 'home',
        element: <ProviderDashboard />,
      },
      {
        path: 'community',
        element: <ProviderCommunityPage />,
      },
      // requests routes
      {
        path: 'requests',
        children: [
          { index: true, element: <Requests /> },
          { path: 'assigned-requests', element: <AssignedRequestsPage /> },
          { path: 'my-offers', element: <MyOffersPage /> },
          { path: 'direct', element: <DirectPage /> },
          { path: 'ordertrack/:serviceId', element: <OrderTrackPage /> },
        ],
      },
      {
        path: 'reviews',
        element: <ReviewsPage />,
      },
      {
        path: 'profile',
        handle: { title: 'الملف الشخصي' },
        element: <ProviderProfilePage />,
      },
      {
        path: 'profile/:providerId',
        handle: { title: 'الملف الشخصي' },
        element: <ProviderProfilePage />,
      },
      {
        path: 'notifications',
        handle: { title: 'الإشعارات' },
        element: <AllNotificationsPage />,
      },
      {
        path: 'wallet',
        element: <Creadit />,
      },
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
    ],
  },
];

export default ProviderRoutes;
