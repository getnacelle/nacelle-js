export const actions = {
  async nuxtClientInit({ dispatch }) {
    await dispatch('cart/initCart', false, { root: true });
  }
};
