import React, { useEffect, useRef } from 'react';
import { useCart } from '../../hooks/useCart';
import * as styles from './ErrorModal.module.css';

const ErrorModal = () => {
  const { cartErrors } = useCart();

  const modalRef = useRef(null);

  useEffect(() => {
    if (cartErrors && cartErrors.length && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [cartErrors, modalRef]);
  const closeErrorModal = () => {
    modalRef.current.close();
  };
  return (
    <dialog
      ref={modalRef}
      className="
    transform
    overflow-hidden
    rounded-lg
    bg-white
    text-left
    shadow-xl
    transition-all
    sm:my-8 sm:w-full sm:max-w-lg
  "
    >
      {/* For supporting older versions of Safari suggest using https://a11y-dialog.netlify.app/ or https://github.com/KittyGiraudel/react-a11y-dialog */}
      {/* <div
        className="
              flex
              min-h-full
              items-end
              justify-center
              p-4
              text-center
              sm:items-center sm:p-0
            "
      >
        <div
          className="
            relative
            transform
            overflow-hidden
            rounded-lg
            bg-white
            text-left
            shadow-xl
            transition-all
            sm:my-8 sm:w-full sm:max-w-lg
          "
        > */}
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div
            className="
                      mx-auto
                      flex
                      h-12
                      w-12
                      flex-shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-red-100
                      sm:mx-0 sm:h-10 sm:w-10
                    "
          >
            <svg
              className="h-6 w-6 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h2
              id="global-error-modal-title"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              Errors
            </h2>
            <div className="mt-2 ml-3">
              <ul className="list-disc text-sm text-gray-500">
                {cartErrors.map((error, index) => {
                  return <li key={index}>{error}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="
                    inline-flex
                    w-full
                    justify-center
                    rounded-md
                    border border-transparent
                    bg-red-600
                    px-4
                    py-2
                    text-base
                    font-medium
                    text-white
                    shadow-sm
                    hover:bg-red-700
                    focus:outline-none
                    focus:ring-2
                    focus:ring-red-500
                    focus:ring-offset-2
                    sm:ml-3 sm:w-auto sm:text-sm
                  "
          onClick={closeErrorModal}
        >
          Close
        </button>
      </div>
      {/* </div>
      </div> */}
    </dialog>
  );
};

export default ErrorModal;
