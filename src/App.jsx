import { RouterProvider } from 'react-router-dom';
import './App.css';

import appRouting from './appRouting';
// import { SignIn } from './pages/authentication/SignIn';

function App() {
  return <RouterProvider router={appRouting} />;
}

export default App;
