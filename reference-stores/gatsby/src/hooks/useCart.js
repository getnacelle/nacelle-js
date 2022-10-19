import { useContext } from 'react';
import { CartContext } from 'context/Cart';

export const useCart = () => {
  const {
    cartVisible,
    setCartVisible,
    lineItems,
    checkoutProcessing,
    cartCount,
    cartSubtotal,
    addItem,
    removeItem,
    clearCart,
    checkout,
    cartErrors
  } = useContext(CartContext);

  return {
    cartVisible,
    setCartVisible,
    lineItems,
    checkoutProcessing,
    cartCount,
    cartSubtotal,
    addItem,
    removeItem,
    clearCart,
    checkout,
    cartErrors
  };
};
