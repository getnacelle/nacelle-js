import { createClient, cacheExchange, fetchExchange } from '@urql/core';
import { fetch } from 'cross-fetch';

export const graphQLClient = createClient({
  url: process.env.NACELLE_STOREFRONT_API_ENDPOINT as string,
  exchanges: [cacheExchange, fetchExchange],
  fetch,
  fetchOptions: () => {
    return {
      headers: {
        'x-nacelle-space-token': process.env
          .NACELLE_STOREFRONT_API_TOKEN as string
      }
    };
  }
});
