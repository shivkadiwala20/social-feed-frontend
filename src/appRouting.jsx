import { createBrowserRouter } from 'react-router-dom';
import { SignIn } from './pages/authentication/SignIn';
import SignUp from './pages/authentication/SignUp';

const appRouting = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: 'sign-up',
    element: <SignUp />,
  },
]);

export default appRouting;
