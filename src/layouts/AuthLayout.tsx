import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default AuthLayout;
