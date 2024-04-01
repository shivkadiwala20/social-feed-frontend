import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSignUpMutation } from '../../store/apis/authApi';
import Loader from 'react-spinner-loader';
import { regex } from '../../utilities/helper';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SignUp = () => {
  const [signUp, { isLoading }] = useSignUpMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = async (submittedData) => {
    console.log(submittedData);
    const body = {
      ...submittedData,
      isPrivate: true,
    };
    console.log('body', body);
    try {
      const response = await signUp(body);
      if (response?.data) {
        navigate('/');
        toast.success(response.data.message, {
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

  return (
    <div className="flex flex-col mt-4">
      <header className="place-self-center text-xl font-bold flex py-4 text-blue-600">
        WebOSocial
      </header>

      <div className="flex flex-col pb-1 shadow-none bg-slate-100 rounded-lg w-1/4 mx-auto min-w-max">
        <div className="z-20">
          <Loader show={isLoading} type="body" />
        </div>
        <form
          className="mx-8 flex flex-col"
          onSubmit={handleSubmit(onSubmit)} // Handle form submission
          noValidate
        >
          <h2 className="my-6 text-left text-slate-900 text-lg">Sign Up</h2>

          <label className="text-sm text-left py-1 text-slate-900 max-w-56">
            First Name<span className="form_label"></span>
            <input
              {...register('firstname', {
                required: 'First Name is required',
                minLength: {
                  value: 2,
                  message: 'First name must be at least 2 characters',
                },
                maxLength: {
                  value: 15,
                  message: 'First name must be at most 15 characters',
                },
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message:
                    'First name must contain only alphanumeric characters.',
                },
              })}
              className="py-1 px-2 w-full mt-4 rounded-none border-2 focus:outline-blue-400"
              type="text"
              placeholder="Enter your first name"
            />
            {errors.firstname && (
              <span className="text-red-400">{errors.firstname?.message}</span>
            )}
          </label>

          <label className="text-sm  text-left py-1 text-slate-900 max-w-56">
            Last Name<span className="form_label"></span>
            <input
              {...register('lastname', {
                required: 'Last Name is required',
                minLength: {
                  value: 2,
                  message: 'Last name must be at least 2 characters',
                },
                maxLength: {
                  value: 15,
                  message: 'Last name must be at most 15 characters',
                },
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message:
                    'Last name must contain only alphanumeric characters.',
                },
              })}
              className="py-1 px-2 w-full mt-4 rounded-none border-2 focus:outline-blue-400"
              type="text"
              placeholder="Enter your last name"
            />
            {errors.lastname && (
              <span className="text-red-400">{errors.lastname?.message}</span>
            )}
          </label>
          <label className="text-sm text-left py-1 text-slate-900 max-w-56">
            Email<span className="form_label"></span>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: regex.email,
                  message: 'Please enter a valid email address',
                },
              })}
              className="py-1 px-2 w-full mt-4 rounded-none border-2 focus:outline-blue-400"
              type="email"
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-red-400">{errors.email?.message}</span>
            )}
          </label>
          <label className="text-sm text-left py-1 text-slate-900 max-w-56">
            User Name<span className="form_label"></span>
            <input
              {...register('username', {
                required: 'Username is required',
                minLength: {
                  value: 6,
                  message: 'Username is too short - should be 6 chars minimum',
                },
                maxLength: {
                  value: 30,
                  message: 'Username is too long - should be 30 chars maximum',
                },
                pattern: {
                  value: /^[a-z][a-z0-9_]*$/,
                  message: 'Username must contain only alphanumeric characters',
                },
              })}
              className="py-1 px-2 w-full mt-4 rounded-none border-2 focus:outline-blue-400"
              type="text"
              placeholder="Enter your user name"
            />
            {errors.username && (
              <span className="text-red-400">{errors.username?.message}</span>
            )}
          </label>

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
              <span className="text-red-400">{errors.password?.message}</span>
            )}
            {errors.password && errors.password.type === 'minLength' && (
              <span className="text-red-400">
                Password must be at least 6 characters long
              </span>
            )}
          </label>

          {/* <label className="text-sm text-left py-1 text-slate-900">
            Confirm Password<span className="form_label"></span>
            <input
              {...register('confirmPassword', {
                required: true,
                validate: (value) => value === password,
              })}
              className="py-1 px-2 w-full mt-4 rounded-none border-2 focus:outline-blue-400"
              type="password"
            />
            {errors.confirmPassword &&
              errors.confirmPassword.type === 'required' && (
                <span className="text-red-400">This field is required</span>
              )}
            {errors.confirmPassword &&
              errors.confirmPassword.type === 'validate' && (
                <span className="text-red-400">Passwords do not match</span>
              )}
          </label> */}

          <button
            type="submit"
            className="my-3 text-x cursor-pointer text-center py-1 border2 bg-blue-600   hover:bg-blue-700 text-white font-semibold  rounded-xl"
          >
            Sign Up
          </button>

          <p className="my-2 text-center text-sm self-center text-blue-700 font-medium">
            <Link to="/">Already have an account {'>'} </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
