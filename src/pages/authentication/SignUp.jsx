import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRegisterMutation } from '../../store/apis/authApi';
const SignUp = () => {
  const { data, isLoading, isSuccess, isError } = useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    {
      isLoading && <p>Loading...</p>;
    }
    {
      isSuccess && <p>Success</p>;
    }
    const body = {
      ...data,
      isPrivate: true,
    };
    try {
      const response = register(body);
      if (response.data) {
        console.log(response.data);
      } else {
        console.log(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const password = watch('password');
  return (
    <div className="flex flex-col mt-4">
      <header className="place-self-center text-xl font-bold flex py-4 text-blue-600">
        WebOSocial
      </header>

      <div className="flex flex-col pb-1 shadow-none bg-slate-100 rounded-lg w-1/4 mx-auto min-w-max">
        <form
          className="mx-8 flex flex-col"
          onSubmit={handleSubmit(onSubmit)} // Handle form submission
          noValidate
        >
          <h2 className="my-6 text-left text-slate-900 text-lg">Sign Up</h2>

          <label className="text-sm text-left py-1 text-slate-900">
            First Name<span className="form_label"></span>
            <input
              {...register('firstName', { required: true })}
              className="py-1 px-2 w-full mt-4 rounded-none border-2 focus:outline-blue-400"
              type="text"
            />
            {errors.firstName && (
              <span className="text-red-400">This field is required</span>
            )}
          </label>

          <label className="text-sm  text-left py-1 text-slate-900">
            Last Name<span className="form_label"></span>
            <input
              {...register('lastName', { required: true })}
              className="py-1 px-2 w-full mt-4 rounded-none border-2 focus:outline-blue-400"
              type="text"
            />
            {errors.lastName && (
              <span className="text-red-400">This field is required</span>
            )}
          </label>

          <label className="text-sm text-left py-1 text-slate-900">
            User Name<span className="form_label"></span>
            <input
              {...register('username', { required: true })}
              className="py-1 px-2 w-full mt-4 rounded-none border-2 focus:outline-blue-400"
              type="text"
            />
            {errors.username && (
              <span className="text-red-400">This field is required</span>
            )}
          </label>

          <label className="text-sm text-left py-1 text-slate-900">
            Password<span className="form_label"></span>
            <input
              {...register('password', {
                required: true,
                minLength: 6,
              })}
              className="py-1 px-2 w-full mt-4 rounded-none border-2 focus:outline-blue-400"
              type="password"
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

          <label className="text-sm text-left py-1 text-slate-900">
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
          </label>

          <button
            type="submit"
            className="my-3 text-x cursor-pointer text-center py-1 border2 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
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
