import { StorefrontClient } from '@nacelle/storefront-sdk';

export default new StorefrontClient({
  storefrontEndpoint: process.env.NEXT_PUBLIC_NACELLE_STOREFRONT_ENDPOINT
});
