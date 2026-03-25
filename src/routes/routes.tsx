import AdminLayout from '@/layouts/AdminLayout';
import AuthLayout from '@/layouts/AuthLayout';
import LoginPage from '@/pages/auth/LoginPage';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

const routes = [
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <AdminLayout />,
    children: [],
  },
];

const router = createBrowserRouter(routes);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
