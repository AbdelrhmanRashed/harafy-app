import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

// Shared Routes
import NotFoundPage from '@/pages/NotFoundPage';
import UnauthorizedPage from '@/pages/UnauthorizedPage';

// Apps Routes
import authRoutes from '@/apps/auth/routes';
import adminRoutes from '@/apps/admin/routes';
import clientRoutes from '@/apps/client/routes';
import ProviderRoutes from '@/apps/provider/routes';
import RootRedirect from '@/guards/RootRedirect';
import onboardingRoutes from '@/apps/onboarding/routes';

const routes = [
  {
    path: '/',
    element: <RootRedirect />,
  },

  ...authRoutes,
  ...clientRoutes,
  ...adminRoutes,
  ...ProviderRoutes,
  ...onboardingRoutes,

  {
    path: '/unauthorized',
    element: <UnauthorizedPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

const router = createBrowserRouter(routes);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
