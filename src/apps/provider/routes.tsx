import CommunityPage from '@/features/community/pages/CommunityPage';
import ProviderDashboard from '@/features/dashboard/pages/ProviderDashboard';
import SettingsLayout from '@/features/profile/layout/SettingsLayout';
import NotificationsPage from '@/features/profile/pages/NotificationsPage';
import ProfilePage from '@/features/profile/pages/ProviderProfilePage';
import ProfileSettingsPage from '@/features/profile/pages/ProfileSettingsPage';
import SecurityPage from '@/features/profile/pages/SecurityPage';
import ProtectedRoute from '@/guards/ProtectedRoute';
import ProviderStatusGuard from '@/guards/ProviderStatusGuard';
import { Navigate } from 'react-router-dom';
import ProviderLayout from './layout/ProviderLayout';
import Requests from '@/features/Requests/pages/Requests';
import ReviewsPage from '@/features/reviews/pages/ReviewsPage';
import DirectPage from '@/features/Requests/pages/direct/DirectPage';
import DirectRequestPage from '@/features/Requests/pages/direct/Accepted/DirectRequestPage';
import AssignedRequestsPage from '@/features/Requests/pages/asignRequest/AllRequests';

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
        element: <CommunityPage />,
      },
      // requests routes
      {
        path: 'requests',
        children: [
          { index: true, element: <Requests /> },
          { path: "assigned-requests", element: <AssignedRequestsPage /> },
          { path: 'direct', element: <DirectPage /> },
          { path: 'direct/:serviceRequestId', element: <DirectRequestPage /> },
        ],
      },
      {
        path: 'reviews',
        element: <ReviewsPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
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
