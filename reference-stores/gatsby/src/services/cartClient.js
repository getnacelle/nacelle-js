import createCartClient from '@nacelle/shopify-cart';

const cartClient = createCartClient({
  shopifyShopId: process.env.GATSBY_SHOPIFY_SHOP_ID,
  shopifyStorefrontAccessToken:
    process.env.GATSBY_SHOPIFY_STOREFRONT_ACCESS_TOKEN
});

export default cartClient
