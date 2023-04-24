import { StorefrontClient } from '@nacelle/storefront-sdk';
import { CommerceQueries } from '@nacelle/commerce-queries-plugin';

const ClientWithCommerceQueries = CommerceQueries(StorefrontClient);

export default new ClientWithCommerceQueries({
  storefrontEndpoint: process.env.NEXT_PUBLIC_NACELLE_STOREFRONT_ENDPOINT
});
