import AdminLayout from '@/layouts/AdminLayout';
import AuthLayout from '@/layouts/AuthLayout';
import DashboardPage from '@/pages/admin/DashboardPage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

const routes = [
  {
    path: '/',
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
