import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from "react-redux";
// import { signInHandler } from "../../features/auth/helpers";
// import Loader from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const {
  //     auth: { isLoading },
  // } = useSelector(state => state);

  // const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (!data.username || !data.password) {
      toast.error('All fields are required!', {
        position: 'top-right',
        autoClose: 2000,
      });
      // alert("hi")
    } else {
      // dispatch(signInHandler(data));
      console.log('data', data);
    }
  };

  // const guestUser = { username: "chrislevin22", password: "chrislevin@123" };

  const formGuestSignInHandler = () => {
    // dispatch(signInHandler(guestUser));
  };

  return (
    <div className="flex flex-col justify-items-center items-center">
      <div className="z-20">
        {/* <Loader show={isLoading} type="body" /> */}
      </div>

      <h1 className="mt-16 text-4xl font-bold text-blue-600 hidden lg:block tracking-wider">
        WebOsocial
      </h1>

      <div className="mx-auto w-full ">
        <div className="md:container md:mx-auto mx-auto flex">
          <img
            src="assets/social1.svg"
            alt="social-img"
            className="w-1/2 hidden md:block ml-10"
          ></img>

          <div className="mx-auto mt-14 sm:mx-28 sm:mt-16">
            <header className="text-2xl font-bold text-center py-2 mb-2 text-blue-600 sm:hidden">
              <Link to="/home"> WebOsocial </Link>
            </header>
            <div className="flex flex-col mx-auto pb-8 shadow-none min-w-max bg-slate-100 rounded-lg">
              <form
                className="mx-8 flex flex-col"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <h2 className="my-6 text-left text-slate-900 text-lg">
                  Sign In
                </h2>

                <label className="text-sm py-1 text-slate-900">
                  Username<span className="form_label"></span>
                  <input
                    {...register('username')}
                    className="py-1 px-2 w-full mt-4 rounded-none border-2 focus:outline-blue-400"
                    type="text"
                    required
                  />
                </label>
                {errors.username && <span>This field is required</span>}

                <label className="relative text-sm py-1 text-slate-900">
                  Password<span className="form_label"></span>
                  <input
                    {...register('password')}
                    className="py-1 px-2 w-full mt-4 rounded-none border-2 focus:outline-blue-400"
                    type="password"
                    required
                  />
                </label>
                {errors.password && <span>This field is required</span>}

                <button
                  type="submit"
                  className="my-3 text-x cursor-pointer text-center py-1 border-2 font-semibold bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Login
                </button>

                <button
                  type="button"
                  className="my-3 text-x cursor-pointer text-center py-1 border-2 font-semibold  text-blue-700 hover:bg-slate-200"
                  onClick={formGuestSignInHandler}
                >
                  Guest Login
                </button>

                <p className="my-2 text-center text-sm text-slate-800 self-center font-medium">
                  {' '}
                  New to webOsocial?
                  <Link className="text-blue-700" to="/signup">
                    {' '}
                    Sign Up{' '}
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};