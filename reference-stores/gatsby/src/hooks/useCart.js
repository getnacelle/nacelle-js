import { useContext } from 'react';
import { CartContext } from 'context/Cart';

export const useCart = () => {
  const {
    cartReady,
    cartVisible,
    setCartVisible,
    cartItems,
    checkoutProcessing,
    cartCount,
    cartSubtotal,
    addItem,
    removeItem,
    clearCart,
    processCheckout
  } = useContext(CartContext);

  return {
    cartReady,
    cartVisible,
    setCartVisible,
    cartItems,
    checkoutProcessing,
    cartCount,
    cartSubtotal,
    addItem,
    removeItem,
    clearCart,
    processCheckout
  };
};
