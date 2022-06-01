import createShopifyCheckoutClient from '@nacelle/shopify-checkout';

export default createShopifyCheckoutClient({
  storefrontCheckoutToken:
    process.env.GATSBY_SHOPIFY_STOREFRONT_CHECKOUT_TOKEN,
  myshopifyDomain: process.env.GATSBY_MYSHOPIFY_DOMAIN,
  storefrontApiVersion: process.env.GATSBY_SHOPIFY_STOREFRONT_API_VERSION
});
