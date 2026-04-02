import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Shared Routes
import LandingPage from '@/pages/LandingPage';
import NotFoundPage from '@/pages/NotFoundPage';
import UnauthorizedPage from '@/pages/UnauthorizedPage';

// Apps Routes
import authRoutes from '@/apps/auth/routes';
import adminRoutes from '@/apps/admin/routes';
import clientRoutes from '@/apps/client/routes';
import ProviderRoutes from '@/apps/provider/routes';

const routes = [
  {
    path: '/',
    element: <LandingPage />,
  },
  ...authRoutes,
  ...clientRoutes,
  ...adminRoutes,
  ...ProviderRoutes,
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
