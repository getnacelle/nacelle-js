import { useContext } from 'react';
import { CartContext } from 'context/Cart';

export const useCart = () => {
  const {
    cartVisible,
    setCartVisible,
    cartItems,
    cartCount,
    cartSubtotal,
    addItem,
    removeItem
  } = useContext(CartContext);

  return {
    cartVisible,
    setCartVisible,
    cartItems,
    cartCount,
    cartSubtotal,
    addItem,
    removeItem
  };
};
