import { ROUTES } from '@/constants/routes';
import ClientLayout from './layout/ClientLayout';
import { Navigate } from 'react-router-dom';
import ClientDashboard from '@/features/dashboard/pages/ClientDashboard';
import DirectRequestPage from '@/features/requests/pages/DirectRequestPage';
import CommunityPage from '@/features/community/pages/CommunityPage';
import InstantRequestPage from '@/features/requests/pages/InstantRequestPage';
import ProfilePage from '@/features/profile/pages/ProfilePage';
import SettingsPage from '@/features/profile/pages/SettingsPage';
import Notifications from '@/features/profile/pages/Notifications';
import SecurityPage from '@/features/profile/pages/SecurityPage';
const clientRoutes = [
  {
    path: ROUTES.CLIENT.BASE,
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.CLIENT.DASHBOARD} replace />,
      },
      {
        path: ROUTES.CLIENT.DASHBOARD,
        element: <ClientDashboard />,
      },
      {
        path: ROUTES.CLIENT.DIRECT,
        element: <DirectRequestPage />,
      },
      {
        path: ROUTES.CLIENT.COMMUNITY,
        element: <CommunityPage />,
      },
    {
        path: ROUTES.CLIENT.PROFILE,
        element: <ProfilePage />,
      },
      {
        path: ROUTES.CLIENT.PROFILE_SETTINGS,
        element: <SettingsPage />,
        children: [
          {
            index: true,
            element: <Navigate to="profile" replace />,
          },
          {
            path: 'profile',
            element: <ProfilePage />,
          },
          {
            path: 'notifications',
            element: <Notifications />,
          },
          {
            path: 'security',
            element: <SecurityPage />,
          },
        ],
      },
      {
        path: ROUTES.CLIENT.INSTANT,
        element: <InstantRequestPage />,
      },
    ],
  },
];

export default clientRoutes;
