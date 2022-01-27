export const actions = {
  async nuxtClientInit({ dispatch }) {
    await dispatch('checkout/initCheckout', false, { root: true });
    await dispatch('cart/initCart', false, { root: true });
  }
};
