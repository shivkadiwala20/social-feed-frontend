/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

import { Navigate } from 'react-router-dom';
import { deleteCookie, setCookie } from '../utilities/helper';

export const Auth = createContext();

// eslint-disable-next-line react/prop-types
const Context = ({ children }) => {
  const [userData, setUserData] = useState();

  const cookie = document.cookie === '' ? false : true;
  const [isLoggedIn, setIsLoggedIn] = useState(cookie);

  const handleLoggedInUser = (userData) => {
    setUserData(userData);
    setIsLoggedIn(true);
    setCookie(userData);
  };

  const handleLoggedOutUser = () => {
    setIsLoggedIn(false);
    deleteCookie();
  };

  return (
    <Auth.Provider
      value={{ userData, handleLoggedInUser, isLoggedIn, handleLoggedOutUser }}
    >
      {children}
    </Auth.Provider>
  );
};

export default Context;

export function AuthRedirect({ children, authenticatedRoute = true }) {
  const auth = useContext(Auth);

  if (!auth?.isLoggedIn && authenticatedRoute) {
    return <Navigate to="/" />;
  } else if (auth?.isLoggedIn && !authenticatedRoute) {
    return <Navigate to="/home" />;
  }

  return children;
}
