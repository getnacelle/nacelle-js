import createCartClient from '@nacelle/shopify-cart';

// Initializes a Cart client from `@nacelle/shopify-cart`

export default createCartClient({
  shopifyShopId: process.env.NEXT_PUBLIC_SHOPIFY_SHOP_ID,
  shopifyStorefrontAccessToken:
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
});
