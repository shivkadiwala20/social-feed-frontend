import React from 'react';

const CustomDialog = ({ isOpen, onClose, title, message, onConfirm }) => {
  return (
    <div
      className={`fixed  z-50 inset-0 overflow-y-auto ${isOpen ? 'visible' : 'invisible'}`}
      onClick={onClose}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full">
          <div className="px-6 py-4">
            <div className="text-lg font-bold mb-2">{title}</div>
            <p className="text-gray-700">{message}</p>
          </div>
          <div className="px-6 py-4 flex justify-end">
            <button
              className="mr-2 px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDialog;
