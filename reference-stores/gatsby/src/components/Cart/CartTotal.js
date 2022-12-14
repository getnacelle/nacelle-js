import React from 'react';
import { useCart } from 'hooks/useCart';
import { formatPrice } from 'utils/formatPrice';

const CartTotal = ({ content }) => {
  const {
    setCartVisible,
    cartCount,
    cartSubtotal,
    checkoutProcessing,
    checkout
  } = useCart();

  const total = formatPrice({ price: cartSubtotal });
  const checkoutButtonText = checkoutProcessing
    ? 'Checking Out...'
    : content.checkoutText;

  return (
    content &&
    cartCount > 0 && (
      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          {content.subtotalLabel && <p>{content.subtotalLabel}</p>}
          <p className={!total ? 'hidden' : undefined}>{total}</p>
        </div>
        {content.subtotalText && (
          <p className="mt-0.5 text-sm text-gray-500">{content.subtotalText}</p>
        )}
        <div className="mt-6">
          <button
            disabled={checkoutProcessing}
            className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out"
            onClick={checkout}
          >
            {checkoutButtonText}
          </button>
        </div>
        {content.continueText && (
          <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
            <p>
              or &nbsp;
              <button
                type="button"
                className="text-indigo-600 font-medium hover:text-indigo-500"
                onClick={() => setCartVisible(false)}
              >
                {content.continueText}
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>
        )}
      </div>
    )
  );
};

export default CartTotal;
