import { useContext, useEffect, useState } from 'react';
import {
  useDeleteUserMutation,
  useGetUserQuery,
} from '../../store/apis/userApi';
import CreateProfileModal from '../../components/CreateProfileModal';
import NavBar from '../../components/NavBar';
import { Auth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import CustomDialog from '../../components/CustomDialog';
import { toast } from 'react-toastify';
import { deleteCookie } from '../../utilities/helper';

const Profile = () => {
  const { data } = useGetUserQuery();
  //console.log('profileData', data);
  const [userData, setUserData] = useState(data?.data);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  // const userData = !isLoading && data.data;
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const [deleteUser, { isLoading, isError, error }] = useDeleteUserMutation();
  //console.log('deletedData', deleteUser);

  useEffect(() => {
    //console.log(userData);
    setUserData(data?.data);
  }, [data]);

  const handleEditProfile = () => {
    setIsProfileModalOpen(true);
  };

  const openDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const { handleLoggedOutUser } = useContext(Auth);
  const handleDeleteClick = async () => {
    try {
      // Call the deleteUser mutation
      await deleteUser().unwrap();
      // Perform necessary actions after successful deletion
      deleteCookie();
      handleLoggedOutUser();
      toast.success('You have deleted your account successfully!!', {
        position: 'top-right',
        autoClose: 1000,
      });
    } catch (error) {
      console.error('Failed to delete account:', error);
      // Handle error appropriately
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full">
          <div className="px-6 py-4">
            <div className="flex items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">
                  {userData ? userData.firstname + ' ' + userData.lastname : ''}
                </h1>
                <p className="text-gray-600">
                  @{userData ? userData.username : ''}
                </p>
              </div>
            </div>
            <div className="mb-8">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <p>{userData ? userData.email : ''}</p>
            </div>
            <button
              type="button"
              className="w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleEditProfile}
            >
              Edit Profile
            </button>
          </div>

          <div className="px-4 py-3 bg-gray-50 flex justify-between items-center sm:px-6">
            <button
              type="button"
              className="text-red-500 hover:text-red-700 text-sm font-medium"
              onClick={openDeleteDialog}
            >
              Delete Account
            </button>
          </div>
        </div>
        <CustomDialog
          isOpen={isDeleteDialogOpen}
          onClose={closeDeleteDialog}
          title="Delete Account"
          message="Are you sure you want to delete your account? This action cannot be undone."
          onConfirm={handleDeleteClick}
        />
        <CreateProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          userData={userData}
          setUserData={setUserData}
        />
      </div>
    </>
  );
};

export default Profile;
// box-shadow: 10px 10px 31px 2px rgba(0,0,0,0.51);
// -webkit-box-shadow: 10px 10px 31px 2px rgba(0,0,0,0.51);
// -moz-box-shadow: 10px 10px 31px 2px rgba(0,0,0,0.51);
