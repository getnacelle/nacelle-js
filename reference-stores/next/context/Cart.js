import { createContext, useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { get, set } from 'idb-keyval';
import { v4 as uuid } from 'uuid';
import checkoutClient from 'services/shopifyCheckout';

export const CartContext = createContext({});

export const CartProvider = ({ children, cacheKey = 'cart' }) => {
  const [cartReady, setCartReady] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [checkoutProcessing, setCheckoutProcessing] = useState(false);

  const cartCount = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );
  const cartSubtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems]
  );

  const router = useRouter();

  useEffect(() => {
    initCart();
  }, []);

  useEffect(() => {
    if (cartReady) {
      set(cacheKey, cartItems);
      setCartVisible(true);
    }
  }, [cartItems]);

  useEffect(() => {
    setCartVisible(false);
  }, [router.asPath]);

  const addItem = (payload) => {
    const index = cartItems.findIndex((lineItem) => {
      if (lineItem.variantId === payload.variantId) {
        return (
          JSON.stringify(payload.metafields) ===
          JSON.stringify(lineItem.metafields)
        );
      }
      return false;
    });
    if (index === -1) {
      payload.id = `${payload.variantId}::${uuid()}`;
      setCartItems([...cartItems, payload]);
    } else {
      setCartItems(
        cartItems.map((cartItem, itemIndex) => {
          if (index === itemIndex) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + payload.quantity
            };
          }
          return cartItem;
        })
      );
    }
  };

  const removeItem = (payload) => {
    const index = cartItems.findIndex((item) => item.id === payload);
    if (index > -1) {
      setCartItems(
        cartItems.filter((_, itemIndex) => {
          return index !== itemIndex;
        })
      );
    }
  };

  const updateItem = (payload) => {
    const index = cartItems.findIndex((item) => item.id === payload.id);
    if (index > -1) {
      setCartItems(
        cartItems.map((cartItem, itemIndex) => {
          if (index === itemIndex) {
            return {
              ...cartItem,
              ...payload
            };
          }
          return cartItem;
        })
      );
    }
  };

  const incrementItem = (payload) => {
    const index = cartItems.findIndex((item) => item.id === payload);
    if (index > -1) {
      if (cartItems[index].quantity === 1) {
        setCartItems(
          cartItems.filter((_, itemIndex) => {
            return index !== itemIndex;
          })
        );
      }
      setCartItems(
        cartItems.map((cartItem, itemIndex) => {
          if (index === itemIndex) {
            return {
              ...cartItem,
              quantity: cartItem.quantity - 1
            };
          }
          return cartItem;
        })
      );
    }
  };

  const decrementItem = (payload) => {
    const index = cartItems.findIndex((item) => item.id === payload);
    if (index > -1) {
      setCartItems(
        cartItems.map((cartItem, itemIndex) => {
          if (index === itemIndex) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1
            };
          }
          return cartItem;
        })
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const processCheckout = async () => {
    try {
      setCheckoutProcessing(true);
      const items = cartItems.map((lineItem) => ({
        quantity: lineItem.quantity,
        variantId: lineItem.variantId
      }));
      const checkoutData = await checkoutClient.process({ cartItems: items });
      // await set('checkoutId', checkoutData.id);
      if (checkoutData.url) {
        window.location.href = checkoutData.url;
      }
    } catch (err) {
      setCheckoutProcessing(false);
      console.error(err);
    }
  };

  const initCart = async () => {
    await initCheckout();
    const cachedCart = await get(cacheKey);
    if (cachedCart) setCartItems(cachedCart);
    setCartReady(true);
  };

  const initCheckout = async () => {
    try {
      const checkoutId = await get('checkoutId');
      if (checkoutId) {
        const checkout = await checkoutClient.get({
          id: checkoutId
        });
        if (checkout?.completed) {
          await del('checkoutId');
          await del(cacheKey);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartReady,
        cartVisible,
        setCartVisible,
        cartItems,
        checkoutProcessing,
        cartCount,
        cartSubtotal,
        addItem,
        removeItem,
        updateItem,
        incrementItem,
        decrementItem,
        clearCart,
        processCheckout
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
