import { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useCart } from 'hooks/useCart';
import CartItem from './CartItem';
import CartCrossSells from './CartCrossSells';
import CartTotal from './CartTotal';
import closeIcon from 'assets/svgs/close';
import styles from './CartDrawer.module.css';
import { nacelleClient } from 'services';

const CartDrawer = ({ content }) => {
  const { cartVisible, cartItems, setCartVisible, removeItem } = useCart();
  const [itemsRemoved, setItemsRemoved] = useState([]);
  const fields = content?.fields;

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
  useEffect(() => {
    const observable = {
      onNext: (result) => {
        if (result.data?.variantInventoryUpdated?.availableForSale === false) {
          const itemToRemove = cartItems.find(
            (item) =>
              item.variantNacelleEntryId ===
              result.data.variantInventoryUpdated.nacelleEntryId
          );
          removeItem(itemToRemove.id);
          setItemsRemoved((prevState) =>
            prevState.concat(itemToRemove.productTitle)
          );
        }
      },
      onError: (err) => {
        console.log('errors will be appear here', err);
      },
      complete: () => {
        console.log('complete hit');
      }
    };
    const unsubscribe = nacelleClient.productVariantSubscription(
      observable,
      cartItems.map((item) => item.variantNacelleEntryId)
    );
    return () => {
      unsubscribe();
    };
  }, [cartItems]);
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
                {content.fields.heading && (
                  <h2
                    id="slide-over-title"
                    className="text-lg font-medium text-gray-900"
                  >
                    {content.fields.heading}
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
                  {itemsRemoved.length > 0 && (
                    <div className="border-red-500 bg-red-100 border-2 rounded relative mb-4">
                      <button
                        type="button"
                        className="absolute right-0 top-0 p-3 text-gray-400 hover:text-gray-500"
                        onClick={() => setItemsRemoved([])}
                      >
                        <span className="sr-only">Clear message</span>
                        <span
                          className="flex h-4 w-4 text-gray-400"
                          dangerouslySetInnerHTML={{ __html: closeIcon }}
                        />
                      </button>
                      <p className="w-11/12 mx-auto py-2 pr-2">
                        Unfortunately, some of your items have ran out of
                        inventory and we have removed them from your cart. Items
                        affected:
                        <strong>
                          {` `}
                          {itemsRemoved.join(', ')}
                        </strong>
                      </p>
                    </div>
                  )}
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
                  {!cartItems.length && content.fields.emptyText && (
                    <p className="text-gray-400 text-center">
                      {content.fields.emptyText}
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
