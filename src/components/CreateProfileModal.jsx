import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useGetUserQuery, useUpdateUserMutation } from '../store/apis/userApi';
import { toast } from 'react-toastify';

// import { useSelector } from 'react-redux';

export default function CreateProfileModal({ isOpen, onClose }) {
  console.log('form Renderd');
  // const [userData, setUserData] = useState();
  // console.log('userData', userData);
  // const [updatedData, setUpdatedData] = useState()

  const [updateUser] = useUpdateUserMutation();
  const { data, isLoading } = useGetUserQuery();
  const userData = !isLoading && data.data;

  // console.log('updatedddData', updatedData);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstname: userData?.firstname,
      lastname: userData?.lastname,
      email: userData?.email,
      username: userData?.username,
    },
  });

  const onSubmit = async (submittedData) => {
    console.log('submittedData', { submittedData });
    const body = {
      ...submittedData,
      isPrivate: true,
    };

    const response = await updateUser(body);

    try {
      console.log(response);
      if (response.data) {
        console.log('data updated');
        onClose();
        toast.success('Profile Updated Successfully!!', {
          position: 'top-right',
          autoClose: 1000,
        });
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

  // const updateUserData = async () => {
  //   const response = await updateUser(updatedData);
  //   console.log(response);
  //   if (response.data) {
  //     console.log('data updated');
  //   }
  // };
  const closeHandler = () => {
    console.log('dsjfjksd');
    onClose();
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="px-6 py-4">
                  <div className="mb-4">
                    <label
                      htmlFor="firstName"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      First Name
                    </label>
                    <div>
                      <input
                        type="text"
                        placeholder="First Name"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                        {...register('firstname', {
                          required: 'First Name is required',
                        })}
                      />
                    </div>
                    {/* <span>{  }</span> */}
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
                      })}
                    />
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
                      })}
                    />
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
                      })}
                    />
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
                    onClick={() => setIsEditProfile(false)}
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
