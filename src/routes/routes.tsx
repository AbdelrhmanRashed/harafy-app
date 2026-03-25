import AdminLayout from '@/layouts/AdminLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const routes = [
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
