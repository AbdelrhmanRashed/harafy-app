import { NavLink } from 'react-router-dom';

const Logo = () => {
  return (
    <NavLink
      to="/"
      className="bg-primary-gradient bg-clip-text pb-1 text-2xl font-bold text-transparent"
    >
      حِرَفِيّ
    </NavLink>
  );
};

export default Logo;
