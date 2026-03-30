import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

// Auth Routes
import AuthLayout from '@/layouts/AuthLayout';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import VerificationPage from '@/pages/auth/VerificationPage';
import ReviewPage from '@/pages/auth/ReviewPage';

// Client Routes
import ClientLayout from '@/layouts/ClientLayout';
import HomePage from '@/pages/client/HomePage';
import ServicesPage from '@/pages/client/ServicesPage';
import CommunityPage from '@/pages/shared/CommunityPage';
import OrdersPage from '@/pages/client/OrdersPage';
import QuickServicePage from '@/pages/client/QuickServicePage';

// Admin Routes
import AdminLayout from '@/layouts/AdminLayout';
import DashboardPage from '@/pages/admin/DashboardPage';
import CraftsmenPage from '@/pages/admin/CraftsmenPage';
import ClientsPage from '@/pages/admin/ClientsPage';
import AdminOrdersPage from '@/pages/admin/OrdersPage';
import ReportsPage from '@/pages/admin/ReportsPage';
import SettingsPage from '@/pages/admin/SettingsPage';
import RolesPage from '@/pages/admin/RolesPage';

// Shared Routes
import NotFoundPage from '@/pages/shared/NotFoundPage';

const routes = [
  {
    path: '/',
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.CLIENT.HOME} replace />,
      },
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'services',
        element: <ServicesPage />,
      },
      {
        path: 'community',
        element: <CommunityPage />,
      },
      {
        path: 'orders',
        element: <OrdersPage />,
      },
      {
        path: 'quick-service',
        element: <QuickServicePage />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.AUTH.SIGNIN} replace />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'verify',
        element: <VerificationPage />,
      },
      {
        path: 'review',
        element: <ReviewPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.ADMIN.DASHBOARD} replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'craftsmen',
        element: <CraftsmenPage />,
      },
      {
        path: 'clients',
        element: <ClientsPage />,
      },
      {
        path: 'orders',
        element: <AdminOrdersPage />,
      },
      {
        path: 'reports',
        element: <ReportsPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'roles',
        element: <RolesPage />,
      },
    ],
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
