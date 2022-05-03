import { useContext } from 'react';
import { CartContext } from 'context/Cart';

export const useCart = () => {
  const { cartVisible, setCartVisible, cartItems, addItem, removeItem } =
    useContext(CartContext);

  return {
    cartVisible,
    setCartVisible,
    cartItems,
    addItem,
    removeItem
  };
};
