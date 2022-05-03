import { get, set, del } from 'idb-keyval';
import createShopifyCheckoutClient from '@nacelle/shopify-checkout';

export const state = () => ({
  checkoutProcessing: false
});

export const getters = {
  checkoutProcessing(state) {
    return state.checkoutProcessing;
  }
};

export const mutations = {
  setCheckoutProcessing(state, payload) {
    state.checkoutProcessing = payload;
  }
};

export const actions = {
  async initCheckout({ commit }) {
    try {
      const checkoutClient = createShopifyCheckoutClient(this.$config.shopify);
      const checkoutId = await get('checkoutId');
      if (checkoutId) {
        const checkout = await checkoutClient.get({
          id: checkoutId
        });
        if (checkout?.completed) {
          await del('checkoutId');
          commit('cart/clearCart', false, { root: true });
        }
      }
    } catch (err) {
      console.error(err);
    }
  },
  async processCheckout({ rootState, commit }) {
    commit('setCheckoutProcessing', true);
    try {
      const checkoutClient = createShopifyCheckoutClient(this.$config.shopify);
      const cartItems = rootState.cart.lineItems.map((lineItem) => ({
        quantity: lineItem.quantity,
        variantId: lineItem.variantId
      }));
      const checkoutData = await checkoutClient.process({ cartItems });
      await set('checkoutId', checkoutData.id);
      if (checkoutData.url) {
        window.location.href = checkoutData.url;
      }
    } catch (err) {
      console.error(err);
    }
    commit('setCheckoutProcessing', false);
  }
};
