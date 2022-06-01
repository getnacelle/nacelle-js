import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { useCart } from 'hooks/useCart';
import CartItem from './CartItem';
import CartCrossSells from './CartCrossSells';
import CartTotal from './CartTotal';
import closeIcon from 'assets/svgs/close';
import * as styles from './CartDrawer.module.css';

const CartDrawer = ({ content }) => {
  const { cartVisible, cartItems, setCartVisible } = useCart();

  const fields = content?.remoteFields;

  const itemContent = {
    itemQuantity: fields?.itemQuantity,
    itemRemove: fields?.itemRemove
  };

  const crossSellContent = {
    heading: fields?.crosssellHeading,
    items: fields?.crosssellItems,
    add: fields?.crosssellAdd
  };

  const totalContent = {
    subtotalLabel: fields?.subtotalLabel,
    subtotalText: fields?.subtotalText,
    checkoutText: fields?.checkoutText,
    continueText: fields?.continueText
  };

  return (
    content && (
      <CSSTransition
        in={cartVisible}
        timeout={0}
        classNames={{
          enterActive: styles.enterActive,
          exitActive: styles.exitActive,
          enter: styles.enter,
          exit: styles.exit
        }}
      >
        <div className="fixed top-0 right-0 bottom-0 w-screen bg-white max-w-md transition-transform ease-in-out duration-500">
          <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              <div className="flex items-start justify-between">
                {content.remoteFields.heading && (
                  <h2
                    id="slide-over-title"
                    className="text-lg font-medium text-gray-900"
                  >
                    {content.remoteFields.heading}
                  </h2>
                )}
                <div className="ml-3 h-7 flex items-center">
                  <button
                    type="button"
                    className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                    onClick={() => setCartVisible(false)}
                  >
                    <span className="sr-only">Close panel</span>
                    <span
                      className="flex h-6 w-6 text-gray-400"
                      dangerouslySetInnerHTML={{ __html: closeIcon }}
                    />
                  </button>
                </div>
              </div>
              <div className="mt-8">
                <div className="flow-root">
                  {cartItems.length > 0 && (
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {cartItems.map((item) => (
                        <CartItem
                          key={item.id}
                          item={item}
                          content={itemContent}
                        />
                      ))}
                    </ul>
                  )}
                  {!cartItems.length && content.remoteFields.emptyText && (
                    <p className="text-gray-400 text-center">
                      {content.remoteFields.emptyText}
                    </p>
                  )}
                  {crossSellContent && (
                    <CartCrossSells content={crossSellContent} />
                  )}
                </div>
              </div>
            </div>
            <CartTotal content={totalContent} />
          </div>
        </div>
      </CSSTransition>
    )
  );
};

export default CartDrawer;
