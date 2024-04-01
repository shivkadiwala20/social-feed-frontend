import { createBrowserRouter } from 'react-router-dom';
import { SignIn } from './pages/authentication/SignIn';
import SignUp from './pages/authentication/SignUp';
import Home from './pages/home/Home';

const appRouting = createBrowserRouter([
  {
    path: '/',
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
]);

export default appRouting;
