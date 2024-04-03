import { createBrowserRouter } from 'react-router-dom';
import { SignIn } from './pages/authentication/SignIn';
import SignUp from './pages/authentication/SignUp';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Layout from './pages/layouts/Layout';

const appRouting = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]);

export default appRouting;
