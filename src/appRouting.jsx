import { Navigate, createBrowserRouter } from 'react-router-dom';
import { SignIn } from './pages/authentication/SignIn';
import SignUp from './pages/authentication/SignUp';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Layout from './pages/layouts/Layout';
import { Auth, AuthRedirect } from './context/AuthContext';
import { useContext } from 'react';
import PropTypes from 'prop-types';

const getRouteWrapper = (component, authRoute = true) => {
  return (
    <AuthRedirect authenticatedRoute={authRoute}>{component}</AuthRedirect>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
const DefaultNavigate = () => {
  const { isLoggedIn } = useContext(Auth);

  return <Navigate to={isLoggedIn ? '/home' : '/'} />;
};
const appRouting = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: getRouteWrapper(<SignIn />, false),
      },
      {
        path: 'sign-up',
        element: getRouteWrapper(<SignUp />, false),
      },
      {
        path: 'home',
        element: getRouteWrapper(<Home />, true),
      },
      {
        path: 'profile',
        element: getRouteWrapper(<Profile />, true),
      },
    ],
  },
  {
    path: '*',
    element: <DefaultNavigate />,
  },
]);

export default appRouting;
AuthRedirect.propTypes = {
  authenticatedRoute: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
