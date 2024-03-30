import { BrowserRouter } from 'react-router-dom';
import './App.css';
import SignUp from './pages/authentication/SignUp';
// import { SignIn } from './pages/authentication/SignIn';

function App() {
  return (
    <>
      <BrowserRouter>
        <SignUp />
        {/* <SignIn /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
