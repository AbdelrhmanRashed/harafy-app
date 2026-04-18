import AdminLayout from './layout/AdminLayout';
import DashboardPage from '@/features/admin/dashboard/pages/DashboardPage';
import CraftsmenPage from '@/features/admin/craftsmen/pages/CraftsmenPage';
import ClientsPage from '@/features/admin/users/pages/ClientsPage';
import AdminOrdersPage from '@/features/admin/orders/pages/OrdersPage';
import ReportsPage from '@/features/admin/reports/pages/ReportsPage';
import SettingsPage from '@/features/admin/settings/pages/SettingsPage';
import RolesPage from '@/features/admin/roles/pages/RolesPage';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from '@/guards/ProtectedRoute';
import CraftsmenDetailsPage from '@/features/admin/craftsmen/pages/CraftsmenDetailsPage';

const adminRoutes = [
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['Admin']}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
        handle: { title: 'لوحة التحكم' },
      },
      {
        path: 'craftsmen',
        element: <CraftsmenPage />,
        handle: { title: 'الحرفيين' },
      },
      {
        path: 'craftsmen/:id',
        element: <CraftsmenDetailsPage />,
        handle: { title: 'تفاصيل الحرفي' },
      },
      {
        path: 'clients',
        element: <ClientsPage />,
        handle: { title: 'العملاء' },
      },
      {
        path: 'orders',
        element: <AdminOrdersPage />,
        handle: { title: 'الطلبات' },
      },
      {
        path: 'reports',
        element: <ReportsPage />,
        handle: { title: 'التقارير' },
      },
      {
        path: 'settings',
        element: <SettingsPage />,
        handle: { title: 'الإعدادات' },
      },
      {
        path: 'roles',
        element: <RolesPage />,
        handle: { title: 'الأدوار' },
      },
    ],
  },
];

export default adminRoutes;
