import { get, set, del } from 'idb-keyval';
import createShopifyCheckoutClient from '@nacelle/shopify-checkout';

export const actions = {
  async initCheckout({ commit }) {
    try {
      const checkoutClient = createShopifyCheckoutClient(this.$config.shopify);
      const checkoutId = await get('checkoutId');
      if (checkoutId) {
        const checkout = checkoutClient.get({
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
  async processCheckout({ rootState }) {
    try {
      const checkoutClient = createShopifyCheckoutClient(this.$config.shopify);
      const cartItems = rootState.cart.lineItems.map((lineItem) => ({
        quantity: lineItem.quantity,
        variantId: lineItem.variant.id
      }));
      const checkoutData = await checkoutClient.process({ cartItems });
      await set('checkoutId', checkoutData.id);
      if (checkoutData.url) {
        window.location.href = checkoutData.url;
      }
    } catch (err) {
      console.error(err);
    }
  }
};
