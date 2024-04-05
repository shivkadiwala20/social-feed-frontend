import { useContext } from 'react';

import { Outlet } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { Auth } from '../../context/AuthContext';

const Layout = () => {
  const { isLoggedIn } = useContext(Auth);
  return (
    <>
      {isLoggedIn && <NavBar />}

      <Outlet />
    </>
  );
};

export default Layout;
