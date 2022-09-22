export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('site/initSite', false, { root: true });
  },
  async nuxtClientInit({ dispatch }) {
    await dispatch('cart/initCart', false, { root: true });
  }
};
