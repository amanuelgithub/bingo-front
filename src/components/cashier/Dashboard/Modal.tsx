import React from "react";

function Modal() {
  return (
    <div className="relative top-20 mx-auto w-96 rounded-md border bg-white p-5 shadow-lg">
      <div className="mt-3 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Successful!
        </h3>
        <div className="mt-2 px-7 py-3">
          <p className="text-sm text-gray-500">
            Account has been successfully registered!
          </p>
        </div>
        <div className="items-center px-4 py-3">
          <button
            id="ok-btn"
            className="w-full rounded-md bg-green-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
