import { ROUTES } from '@/constants/routes';
import AdminLayout from './layout/AdminLayout';
import DashboardPage from '@/features/admin/dashboard/pages/DashboardPage';
import CraftsmenPage from '@/features/admin/craftsmen/pages/CraftsmenPage';
import ClientsPage from '@/features/admin/users/pages/ClientsPage';
import AdminOrdersPage from '@/features/admin/orders/pages/OrdersPage';
import ReportsPage from '@/features/admin/reports/pages/ReportsPage';
import SettingsPage from '@/features/admin/settings/pages/SettingsPage';
import RolesPage from '@/features/admin/roles/pages/RolesPage';
import { Navigate } from 'react-router-dom';

const adminRoutes = [
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
];

export default adminRoutes;
