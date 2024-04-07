import { Fragment, useContext, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import './NavBar.css';
import { Auth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import CustomDialog from './CustomDialog';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const navigation = [{ name: 'Feed', current: true }];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
  const navigate = useNavigate();
  const [isSignOutDialogOpen, setIsSignOutDialogOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track menu state

  const handleProfileClick = () => {
    navigate('/profile');
    setIsMenuOpen(false); // Close the menu when profile is clicked
  };

  const openSignOutDialog = () => {
    setIsSignOutDialogOpen(true);
  };

  const closeSignOutDialog = () => {
    setIsSignOutDialogOpen(false);
  };

  const { handleLoggedOutUser } = useContext(Auth);

  const handleSignOut = () => {
    handleLoggedOutUser();
    navigate('/');
    toast.success('You have Sign Out Successfully!!', {
      position: 'top-right',
      autoClose: 1000,
    });
  };

  return (
    <>
      <CustomDialog
        isOpen={isSignOutDialogOpen}
        onClose={closeSignOutDialog}
        title="Sign Out"
        message="Are you sure you want to sign out?"
        onConfirm={handleSignOut}
      />
      <Disclosure as="nav" className="bg-blue-600 w-full">
        <div className="lg:px-8">
          <div className="relative flex h-16 items-center justify-between w-full">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
              </Disclosure.Button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start w-full">
              <div className="flex flex-shrink-0 items-center">
                <NavLink to="/home" className="text-white">
                  WebOSocial{' '}
                </NavLink>
              </div>
              <div className="hidden sm:ml-6 sm:block w-full">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to="/home"
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )}
                      activeclassname="bg-gray-900 text-white"
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button
                    className="relative flex rounded-full bg-blue-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu state
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <UserCircleIcon
                      className="h-8 w-8 rounded-full"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  show={isMenuOpen} // Conditionally render based on menu state
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <>
                          <button
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                            onClick={handleProfileClick}
                          >
                            Your Profile
                          </button>
                        </>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          href="#"
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}
                          onClick={openSignOutDialog}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </Disclosure>
    </>
  );
}
