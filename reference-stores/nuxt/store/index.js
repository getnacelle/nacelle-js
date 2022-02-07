export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('site/initSite', false, { root: true });
  },
  async nuxtClientInit({ dispatch }) {
    await dispatch('checkout/initCheckout', false, { root: true });
    await dispatch('cart/initCart', false, { root: true });
  }
};
