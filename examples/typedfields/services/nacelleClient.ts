import { StorefrontClient } from '@nacelle/storefront-sdk';

const client = new StorefrontClient({
  storefrontEndpoint: process.env.NACELLE_ENDPOINT as string,
  locale: process.env.NACELLE_LOCALE
});

export default client;
