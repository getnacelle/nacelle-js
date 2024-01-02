import { StorefrontClient } from '@nacelle/storefront-sdk';
import { CommerceQueries } from '@nacelle/commerce-queries-plugin';

const ClientWithCommerceQueries = CommerceQueries(StorefrontClient);

// Initializes a Storefront client from `@nacelle/storefront-sdk`
// using credentials provided from the Nacelle Dashboard.
// (https://docs.nacelle.com/docs/javascript-storefront-sdk)

const nacelleClient = new ClientWithCommerceQueries({
  storefrontEndpoint: process.env.NEXT_PUBLIC_NACELLE_STOREFRONT_ENDPOINT
});

export default nacelleClient;
