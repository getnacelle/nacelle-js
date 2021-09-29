import createShopifyCheckoutClient from '@nacelle/shopify-checkout';

export default function(context, inject) {
  const {
    myshopifyDomain,
    storefrontApiVersion,
    storefrontCheckoutToken
  } = context.$config.shopify;

  const checkoutClient = createShopifyCheckoutClient({
    myshopifyDomain,
    storefrontApiVersion,
    storefrontCheckoutToken
  });

  inject('shopifyCheckout', checkoutClient);
}
