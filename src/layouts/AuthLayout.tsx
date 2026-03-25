import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
