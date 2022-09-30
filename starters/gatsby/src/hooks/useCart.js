import { useContext } from 'react';
import { CartContext } from '../context/Cart';

export const useCart = () => {
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    cartErrors,
    isLoading,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    checkout,
    checkoutProcessing
  } = useContext(CartContext);

  return {
    cartItems,
    cartCount,
    cartSubtotal,
    cartErrors,
    isLoading,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    checkout,
    checkoutProcessing
  };
};
