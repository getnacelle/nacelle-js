import Storefront from '@nacelle/storefront-sdk';

// Initializes a Storefront client from `@nacelle/storefront-sdk`
// using credentials provided from the Nacelle Dashboard.
// (https://nacelle.com/docs/querying-data/storefront-sdk)

export default new Storefront({
  storefrontEndpoint: import.meta.env.VITE_PUBLIC_NACELLE_STOREFRONT_ENDPOINT,
  token: import.meta.env.VITE_PUBLIC_NACELLE_STOREFRONT_TOKEN
});
