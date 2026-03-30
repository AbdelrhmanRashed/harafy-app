import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Shared Routes
import NotFoundPage from '@/core/NotFoundPage';
import authRoutes from '@/apps/auth/routes';
import adminRoutes from '@/apps/admin/routes';
import clientRoutes from '@/apps/client/routes';

const routes = [
  ...clientRoutes,
  ...authRoutes,
  ...adminRoutes,
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
