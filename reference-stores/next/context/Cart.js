import { createContext, useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuid } from 'uuid';

export const CartContext = createContext({});

export const CartProvider = ({ children, cacheKey = 'cart' }) => {
  const [cartVisible, setCartVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const cartCount = useMemo(() =>
    cartItems.reduce((acc, item) => acc + item.quantity, 0)
  );
  const cartSubtotal = useMemo(() =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  const router = useRouter();

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
    // set('cart', state.lineItems);
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

  return (
    <CartContext.Provider
      value={{
        cartVisible,
        setCartVisible,
        cartItems,
        cartCount,
        cartSubtotal,
        addItem,
        removeItem,
        updateItem,
        incrementItem,
        decrementItem,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
