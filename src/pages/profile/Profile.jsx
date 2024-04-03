import React, { useLayoutEffect, useState } from 'react';
import Home from '../home/Home';
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from '../../store/apis/userApi';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { data } = useGetUserQuery();
  // console.log('backendData', data);
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  console.log('userData', userData);
  const [updatedData, setUpdatedData] = useState();
  const [updateUser] = useUpdateUserMutation();
  useLayoutEffect(() => {
    setUserData(data?.data);
  }, [data]);
  console.log('updatedddData', updatedData);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstname: userData ? userData.firstname : '',
      lastname: userData ? userData.lastname : '',
      email: userData ? userData.email : '',
      username: userData ? userData.username : '',
    },
  });

  const onSubmit = async (submittedData) => {
    // console.log(data);
    // onClose();
    console.log('submittedData', { submittedData });
    const body = {
      ...submittedData,
      isPrivate: true,
    };
    setUpdatedData(body);
  };

  const updateUserData = async () => {
    const response = await updateUser(updatedData);
    console.log(response);
    if (response.data) {
      console.log('data updated');
    }
  };

  const [isEditProfile, setIsEditProfile] = useState(false);
  //   const handleEditProfile = () => {
  //     console.log('edit profile');
  //     setIsEditProfile(true);
  //   };

  //   const handleButtonClick = () => {
  //     if (isEditProfile) {
  //       updateUserData();
  //     } else {
  //       handleEditProfile();
  //     }
  //   };
  const handleEditProfile = () => {
    navigate('/edit-profile');
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen">
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
                  {isEditProfile ? (
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full border border-gray-300 p-2 rounded-lg"
                      {...register('firstname', {
                        required: 'First Name is required',
                      })}
                    />
                  ) : (
                    <div>{userData ? userData.firstname : ''}</div>
                  )}
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
                {isEditProfile ? (
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    {...register('lastname', {
                      required: 'Last Name is required',
                    })}
                  />
                ) : (
                  <div>{userData ? userData.lastname : ''}</div>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
                {isEditProfile ? (
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    {...register('email', {
                      required: 'Email is required',
                    })}
                  />
                ) : (
                  <div>{userData ? userData.email : ''}</div>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Username
                </label>
                {isEditProfile ? (
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    {...register('username', {
                      required: 'Username is required',
                    })}
                  />
                ) : (
                  <div>{userData ? userData.username : ''}</div>
                )}
              </div>
            </div>

            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleEditProfile}
              >
                {isEditProfile ? 'Save' : 'Edit'}
              </button>
              {isEditProfile ? (
                <button
                  type="button"
                  className="inline-flex justify-center mx-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => setIsEditProfile(false)}
                >
                  Cancel
                </button>
              ) : (
                ''
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
