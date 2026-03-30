import { ROUTES } from '@/constants/routes';
import AuthLayout from './layout/AuthLayout';
import LoginPage from '@/features/auth/pages/LoginPage';
import RegisterPage from '@/features/auth/pages/RegisterPage';
import VerificationPage from '@/features/auth/pages/VerificationPage';
import ReviewPage from '@/features/auth/pages/ReviewPage';
import { Navigate } from 'react-router-dom';

const authRoutes = [
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.AUTH.SIGNIN} replace />,
      },
      {
        path: ROUTES.AUTH.SIGNIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.AUTH.SIGNUP,
        element: <RegisterPage />,
      },
      {
        path: ROUTES.AUTH.VERIFY,
        element: <VerificationPage />,
      },
      {
        path: ROUTES.AUTH.REVIEW,
        element: <ReviewPage />,
      },
    ],
  },
];

export default authRoutes;
