import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../../store/apis/authApi';
// import { useDispatch, useSelector } from "react-redux";
// import { signInHandler } from "../../features/auth/helpers";
// import Loader from 'react-loader-spinner';
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer, toast } from 'react-toastify';
import Loader from 'react-spinner-loader';
import { setCookie } from '../../utilities/helper';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { Auth } from '../../context/AuthContext';
export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { handleLoggedInUser } = useContext(Auth);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  // const {
  //     auth: { isLoading },
  // } = useSelector(state => state);

  // const dispatch = useDispatch();

  const onSubmit = async (submittedData) => {
    // if (!data.username || !data.password) {
    //   toast.error('All fields are required!', {
    //     position: 'top-right',
    //     autoClose: 2000,
    //   });
    //   // alert("hi")
    // } else {
    //   // dispatch(signInHandler(data));
    //   console.log('data', data);
    // }
    // console.log(data);
    try {
      const response = await login(submittedData);
      if (response?.data) {
        handleLoggedInUser(response?.data.data);
        // setCookie(response.data.data);
        navigate('home');
        toast.success('You have Sign In Successfully!!', {
          position: 'top-right',
          autoClose: 1000,
        });
        console.log(response.data);
      } else {
        toast.error(response.error.data.message, {
          position: 'top-right',
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const guestUser = { username: "chrislevin22", password: "chrislevin@123" };

  return (
    <div className="flex flex-col justify-items-center items-center">
      <div className="z-20">
        <Loader show={isLoading} type="body" />
      </div>

      <h1 className="mt-16 text-4xl font-bold text-blue-600 hidden lg:block tracking-wider">
        WebOSocial
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
              <Link to="/home"> WebOSocial </Link>
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

                <label className="text-sm text-left py-1 text-slate-900 max-w-56">
                  Email<span className="form_label"></span>
                  <input
                    {...register('email', {
                      required: true,
                      pattern:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    })}
                    className="py-1 px-2 w-full mt-4 rounded-none border-2 focus:outline-blue-400 "
                    type="email"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <span className="text-red-400">
                      Please enter a valid email address
                    </span>
                  )}
                </label>
                {errors.email && <span>{errors.email?.message}</span>}

                <label className="text-sm text-left py-1 text-slate-900 max-w-56">
                  Password<span className="form_label"></span>
                  <input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'The password must be at least 8 characters',
                      },
                      maxLength: {
                        value: 15,
                        message: 'The password can be at most 15 characters',
                      },
                    })}
                    className="py-1 px-2 w-full mt-4 rounded-none border-2 focus:outline-blue-400"
                    type="password"
                    placeholder="Enter your password"
                  />
                  {errors.password && errors.password.type === 'required' && (
                    <span className="text-red-400">This field is required</span>
                  )}
                  {errors.password && errors.password.type === 'minLength' && (
                    <span className="text-red-400">
                      Password must be at least 6 characters long
                    </span>
                  )}
                </label>

                <button
                  type="submit"
                  className="my-3 text-x cursor-pointer text-center py-1 border-2 font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                >
                  Login
                </button>

                <p className="my-2 text-center text-sm text-slate-800 self-center font-medium">
                  {' '}
                  New to webOSocial?
                  <Link className="text-blue-700" to="/sign-up">
                    {' '}
                    Sign Up{' '}
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};
