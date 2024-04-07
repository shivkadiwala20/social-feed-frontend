import { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useUpdateUserMutation } from '../store/apis/userApi';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export default function CreateProfileModal({
  isOpen,
  onClose,
  userData,
  setUserData,
  onProfileUpdate,
}) {
  console.log('userDataInProfileModal', userData);
  const [updateUser] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: userData?.firstname,
      lastname: userData?.lastname,
      email: userData?.email,
      username: userData?.username,
    },
  });

  useEffect(() => {
    reset({
      firstname: userData?.firstname,
      lastname: userData?.lastname,
      email: userData?.email,
      username: userData?.username,
    });
  }, [userData, reset]);

  const onSubmit = async (submittedData) => {
    console.log('submittedData', submittedData);
    const body = {
      ...submittedData,
      isPrivate: true,
    };

    const response = await updateUser(body);
    try {
      if (response.data) {
        console.log('response', response?.data?.data);
        setUserData(response?.data.data);
        onClose();
        toast.success('Profile Updated Successfully!!', {
          position: 'top-right',
          autoClose: 1000,
        });
        onProfileUpdate();
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

  const closeHandler = () => {
    onClose();
    reset();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeHandler}
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="px-6 py-4">
                  <div className="mb-4">
                    <label
                      htmlFor="firstName"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full border border-gray-300 p-2 rounded-lg"
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
                    />
                    {errors.firstname && (
                      <p className="text-red-500">{errors.firstname.message}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="lastName"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full border border-gray-300 p-2 rounded-lg"
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
                    />
                    {errors.lastname && (
                      <p className="text-red-500">{errors.lastname.message}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full border border-gray-300 p-2 rounded-lg"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: 'Please enter a valid email address',
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="username"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="Username"
                      className="w-full border border-gray-300 p-2 rounded-lg"
                      {...register('username', {
                        required: 'Username is required',
                        minLength: {
                          value: 6,
                          message:
                            'Username is too short - should be 6 chars minimum',
                        },
                        maxLength: {
                          value: 30,
                          message:
                            'Username is too long - should be 30 chars maximum',
                        },
                        pattern: {
                          value: /^[a-z][a-z0-9_]*$/,
                          message:
                            'Username must contain only alphanumeric characters',
                        },
                      })}
                    />
                    {errors.username && (
                      <p className="text-red-500">{errors.username.message}</p>
                    )}
                  </div>
                </div>

                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    className="inline-flex justify-center mx-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => closeHandler()}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
CreateProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  setUserData: PropTypes.func.isRequired,
  onProfileUpdate: PropTypes.func.isRequired,
};
