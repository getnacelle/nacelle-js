import { GqlClient } from '../checkout-client.types';
import { CreateClientParams } from '../client';

/**
 * Sanitize `(brand).myshopify.com` domains.
 */
function sanitizeShopifyDomain(domain: string): string {
  const sanitizedDomain = domain
    ?.split('.myshopify')
    .shift()
    ?.split('//')
    .pop()
    ?.split('.')
    .pop();

  return sanitizedDomain || domain;
}

export const fetchClientError =
  '[@nacelle/shopify-checkout] in order to create a checkout server-side, ' +
  'you must provide a fetch API-compatible `fetchClient` capable of running ' +
  'on both the client & server. Examples include `isomorphic-unfetch` and `cross-fetch`.';

type CreateGqlClientParams = Pick<
  CreateClientParams,
  | 'customEndpoint'
  | 'fetchClient'
  | 'myshopifyDomain'
  | 'storefrontCheckoutToken'
>;

export const missingParametersErrorMessage =
  '[@nacelle/shopify-checkout]: missing required parameters. You must provide a `myshopifyDomain` or a `customEndpoint`.';
export const missingAccessTokenMessage =
  '[@nacelle/shopify-checkout]: missing required parameter `storefrontCheckoutToken`.';

/**
 * Create a GraphQL client using `window.fetch` or the provided `fetchClient`
 */
export default function createGqlClient({
  customEndpoint,
  fetchClient,
  myshopifyDomain,
  storefrontCheckoutToken
}: CreateGqlClientParams): GqlClient {
  const gqlClient: GqlClient = ({ query, variables }) => {
    let endpoint = customEndpoint || '';

    if (!storefrontCheckoutToken) {
      throw new Error(missingAccessTokenMessage);
    }

    if (!endpoint) {
      if (!myshopifyDomain) {
        throw new Error(missingParametersErrorMessage);
      }
      const domain = sanitizeShopifyDomain(myshopifyDomain || '');
      endpoint = `https://${domain}.myshopify.com/api/2022-01/graphql`;
    }

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
        'X-Shopify-Storefront-Access-Token': storefrontCheckoutToken
      },
      body: JSON.stringify({ query, variables })
    }).then((res: Response) => res.json());
  };

  return gqlClient;
}
