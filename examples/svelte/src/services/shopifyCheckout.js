import createShopifyCheckoutClient from '@nacelle/shopify-checkout';

export default createShopifyCheckoutClient({
	storefrontCheckoutToken: import.meta.env.VITE_PUBLIC_SHOPIFY_STOREFRONT_CHECKOUT_TOKEN,
	myshopifyDomain: import.meta.env.VITE_PUBLIC_MYSHOPIFY_DOMAIN,
	storefrontApiVersion: import.meta.env.VITE_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION
});
