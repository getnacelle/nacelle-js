import createShopifyCartClient from '@nacelle/shopify-cart';

export default (context, inject) => {
  const client = createShopifyCartClient(context.$config.cart);
  inject('cartClient', client);
};
