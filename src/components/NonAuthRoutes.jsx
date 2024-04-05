import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Auth } from '../context/AuthContext';
import PropTypes from 'prop-types';
function NonAuthRoutes({ children }) {
  const { isLoggedIn } = useContext(Auth);
  //console.log(isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }
  return children;
}

export default NonAuthRoutes;

NonAuthRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
