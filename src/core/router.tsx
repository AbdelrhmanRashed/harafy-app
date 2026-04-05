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
import RootRedirect from '@/pages/RootRedirect';
import InformationLayout from '@/apps/information/layout/InformationLayout';
import VerificationPage from '@/features/information/pages/VerificationPage';
import ReviewPage from '@/features/information/pages/ReviewPage';
import UserInformation from '@/features/information/pages/UserInformation';

const routes = [
  {
    path: '/',
    element: <RootRedirect />,
  },

  ...authRoutes,
  ...clientRoutes,
  ...adminRoutes,
  ...ProviderRoutes,

  //TODO : remove this route
  {
    path: '/information',
    element: <InformationLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="verification" replace />,
      },

      {
        path: 'user-info',
        element: <UserInformation />,
      },
      {
        path: 'verification',
        element: <VerificationPage />,
      },
      {
        path: 'review',
        element: <ReviewPage />,
      },
    ],
  },

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
