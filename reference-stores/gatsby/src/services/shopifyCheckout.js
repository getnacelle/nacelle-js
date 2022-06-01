import createShopifyCheckoutClient from '@nacelle/shopify-checkout';

export default createShopifyCheckoutClient({
  storefrontCheckoutToken:
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_CHECKOUT_TOKEN,
  myshopifyDomain: process.env.NEXT_PUBLIC_MYSHOPIFY_DOMAIN,
  storefrontApiVersion: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION
});
