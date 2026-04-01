import { ROUTES } from '@/constants/routes';
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
        path: ROUTES.CLIENT.COMMUNITY,
        element: <CommunityPage />,
      },
      {
        path: ROUTES.CLIENT.SERVICES,
        children: [
          { index: true, element: <ServicesPage /> },
          { path: 'instant', element: <InstantServicesPage /> },
          { path: 'direct', element: <DirectServicesPage /> },
        ],
      },
      {
        path: ROUTES.CLIENT.DIRECT_SERVICE,
        element: <DirectRequestPage />,
      },
      {
        path: ROUTES.CLIENT.PROFILE,
        element: <ProfilePage />,
      },
      {
        path: ROUTES.CLIENT.PROFILE_SETTINGS,
        element: <SettingsPage />,
      },
      {
        path: ROUTES.CLIENT.INSTANT_SERVICE,
        element: <InstantRequestPage />,
      },
      // {
      //   path: ROUTES.CLIENT.REQUESTS,
      //   element: <RequestsPage />,
      // },
    ],
  },
];

export default clientRoutes;
