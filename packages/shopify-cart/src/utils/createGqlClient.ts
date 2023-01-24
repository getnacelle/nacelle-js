import type { GqlClient } from '../cart-client.types';
import type { CreateClientParams } from '../client';
import sanitizeShopId from './sanitizeShopId';

export const fetchClientError =
  '[@nacelle/shopify-checkout] in order to create a checkout server-side, ' +
  'you must provide a fetch API-compatible `fetchClient` capable of running ' +
  'on both the client & server. Examples include `isomorphic-unfetch` and `cross-fetch`.';

type CreateGqlClientParams = Pick<
  CreateClientParams,
  | 'shopifyShopId'
  | 'shopifyStorefrontAccessToken'
  | 'shopifyCustomEndpoint'
  | 'fetchClient'
>;

export const missingParametersErrorMessage =
  '[@nacelle/shopify-cart]: missing required parameters. You must provide a `shopifyShopId` or a `shopifyCustomEndpoint`.';
export const missingAccessTokenMessage =
  '[@nacelle/shopify-cart]: missing required parameter `shopifyStorefrontAccessToken`.';

/**
 * Create a GraphQL client using `window.fetch` or the provided `fetchClient`
 */
export default function createGqlClient({
  shopifyShopId,
  shopifyStorefrontAccessToken,
  shopifyCustomEndpoint,
  fetchClient
}: CreateGqlClientParams): GqlClient {
  let endpoint = shopifyCustomEndpoint || '';

  if (!shopifyStorefrontAccessToken) {
    throw new Error(missingAccessTokenMessage);
  }

  if (!endpoint) {
    if (!shopifyShopId) {
      throw new Error(missingParametersErrorMessage);
    }
    const domain = sanitizeShopId(shopifyShopId);
    endpoint = `https://${domain}.myshopify.com/api/2023-01/graphql`;
  }

  const gqlClient: GqlClient = ({ query, variables }) => {
    let fetcher = fetchClient;

    if (!fetcher) {
      if (typeof window !== 'undefined') {
        fetcher = window.fetch;
      } else {
        throw new Error(fetchClientError);
      }
    }

    return fetcher(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': shopifyStorefrontAccessToken
      },
      body: JSON.stringify({ query, variables })
    }).then((res: Response) => res.json());
  };

  return gqlClient;
}
