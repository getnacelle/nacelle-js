export const actions = {
  nuxtClientInit({ dispatch }) {
    dispatch('cart/initCart', false, { root: true });
  }
};
