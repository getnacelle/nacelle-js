import createCartClient from '@nacelle/shopify-cart';

// Initializes a Cart client from `@nacelle/shopify-cart`

export default createCartClient({
  shopifyShopId: process.env.GATSBY_SHOPIFY_SHOP_ID,
  shopifyStorefrontAccessToken:
    process.env.GATSBY_SHOPIFY_STOREFRONT_ACCESS_TOKEN
});
