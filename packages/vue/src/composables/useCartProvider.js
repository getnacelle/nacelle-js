import { inject } from 'vue';

export default function useCartProvider() {
  return {
    cart: inject('cart'),
    addItem: inject('addItem'),
    removeItem: inject('removeItem'),
    updateItem: inject('updateItem'),
    incrementItem: inject('incrementItem'),
    decrementItem: inject('decrementItem'),
    clearCart: inject('clearCart')
  };
}
