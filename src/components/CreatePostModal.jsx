import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { BsFillImageFill } from 'react-icons/bs';

export default function CreatePostModal({ isOpen, onClose }) {
  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPostTitle('');
    setPostDescription('');
    setImage(null);
    onClose();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-sm"
        onClose={onClose}
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
              <form onSubmit={handleSubmit}>
                <div className="px-6 py-4">
                  <div className="mb-4">
                    <input
                      type="text"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      placeholder="Title"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      value={postDescription}
                      onChange={(e) => setPostDescription(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      placeholder="Description"
                    />
                  </div>
                  <div className="mb-4 flex">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer text-blue-500"
                    >
                      <BsFillImageFill className="text-2xl mb-4 mr-6 text-blue-700 cursor-pointer" />
                    </label>
                    {image && (
                      <img
                        src={image}
                        alt="Uploaded Image"
                        className="mt-2 flex w-32 h-32  object-cover"
                      />
                    )}
                  </div>
                </div>

                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Post
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500  ml-2"
                  >
                    Close
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
