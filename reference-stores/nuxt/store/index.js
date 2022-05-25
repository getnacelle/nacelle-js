export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('site/initSite', false, { root: true });
  },
  async nuxtClientInit({ dispatch }) {
    window.onpageshow = function (event) {
      console.log('`pageshow` fired.');
      console.log(`event persisted: ${event.persisted}`);
    };
    await dispatch('checkout/initCheckout', false, { root: true });
    await dispatch('cart/initCart', false, { root: true });
  }
};
