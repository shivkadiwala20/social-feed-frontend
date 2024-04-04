import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
// import { BsFillImageFill } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { useCreatePostMutation } from '../store/apis/postApi';

export default function CreatePostModal({ isOpen, onClose, setNewPost }) {
  const [image, setImage] = useState(null);
  const inputRef = useRef(null);

  const [createPost] = useCreatePostMutation();

  const handleImageUpload = (event) => {
    const uploadedImage = event.target.files[0];
    setImage(uploadedImage);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (submittedData) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      // //console.log(reader.result);
      submittedData.image = reader.result;
    });
    reader.readAsDataURL(image);
    //console.log('onSubmitData', { submittedData });

    const body = {
      ...submittedData,
      image: image,
      isPrivate: false,
    };

    const response = await createPost(body);
    // //console.log(response);
    setNewPost(response?.data?.data);

    setImage('');
    reset();
    onClose();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-sm"
        onClose={() => {
          clearErrors();
          onClose();
        }}
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
                  <h2 className="text-xl font-semibold mb-4">Create Post</h2>
                  <div className="mb-8 flex items-center justify-center">
                    <div className="mb-4 flex">
                      <input
                        {...register('image', {
                          validate: (value) => {
                            if (!image) {
                              //console.log(value);
                              return 'Image is required';
                            } else {
                              return true;
                            }
                          },
                        })}
                        id="image-upload"
                        type="file"
                        ref={inputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer text-blue-500"
                      >
                        <div className="relative w-64 h-48 cursor-pointer mx-auto">
                          {image ? (
                            <img
                              className="object-cover w-full h-full rounded"
                              src={URL.createObjectURL(image)}
                              alt="Uploaded avatar"
                              onClick={handleClick}
                            />
                          ) : (
                            <label
                              htmlFor="image-upload"
                              className="flex items-center justify-center w-full h-full bg-gray-200 rounded cursor-pointer"
                            >
                              <span className="text-gray-500">Add Photo</span>
                            </label>
                          )}
                        </div>
                      </label>
                      {errors.image && !image && (
                        <p className="text-red-500">{errors.image.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      {...register('title', { required: true })}
                      className={`w-full p-2 border ${
                        errors.title ? 'border-red-500' : 'border-gray-300'
                      } rounded-md focus:outline-none focus:border-blue-500`}
                      placeholder="Title"
                    />
                    {errors.title && (
                      <p className="text-red-500">Title is required</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      {...register('description', { required: true })}
                      className={`w-full p-2 border ${
                        errors.description
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } rounded-md focus:outline-none focus:border-blue-500`}
                      placeholder="Description"
                    />
                    {errors.description && (
                      <p className="text-red-500">Description is required</p>
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
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ml-2"
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
