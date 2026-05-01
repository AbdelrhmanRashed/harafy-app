import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

// Shared Routes
import NotFoundPage from '@/pages/NotFoundPage';
import UnauthorizedPage from '@/pages/UnauthorizedPage';
import SuspendedPage from '@/pages/SuspendedPage';

// Apps Routes
import authRoutes from '@/apps/auth/routes';
import adminRoutes from '@/apps/admin/routes';
import clientRoutes from '@/apps/client/routes';
import ProviderRoutes from '@/apps/provider/routes';
import RootRedirect from '@/guards/RootRedirect';
import onboardingRoutes from '@/apps/onboarding/routes';
import SuspendedGuard from '@/guards/SuspendedGuard';

import { useMatches } from 'react-router-dom';
import { useEffect } from 'react';

const TitleUpdater = () => {
  const matches = useMatches();

  useEffect(() => {
    const match = [...matches].reverse().find((m: any) => m.handle?.title);
    document.title = match ? `حرفي | ${(match as any).handle.title}` : 'حرفي';
  }, [matches]);

  return <Outlet />;
};

const routes = [
  {
    path: '/',

    element: <TitleUpdater />,
    children: [
      {
        index: true,
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
        path: '/suspended',
        element: (
          <SuspendedGuard>
            <SuspendedPage />
          </SuspendedGuard>
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
