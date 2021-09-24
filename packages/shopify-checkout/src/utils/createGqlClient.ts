import { GqlClient } from '~/checkout-client.types';
import { CreateClientParams } from '~/client';

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

  if (sanitizedDomain) {
    return sanitizedDomain;
  }

  return domain;
}

type CreateGqlClientParams = Pick<
  CreateClientParams,
  | 'customEndpoint'
  | 'fetchClient'
  | 'myshopifyDomain'
  | 'storefrontApiVersion'
  | 'storefrontCheckoutToken'
>;

/**
 * Create a GraphQL client using `window.fetch` or the provided `fetchClient`
 */
export default function createGqlClient({
  customEndpoint,
  fetchClient,
  myshopifyDomain,
  storefrontApiVersion,
  storefrontCheckoutToken
}: CreateGqlClientParams): GqlClient {
  const gqlClient: GqlClient = ({ query, variables }) => {
    let endpoint = customEndpoint;

    if (!endpoint) {
      if (!myshopifyDomain || !storefrontApiVersion) {
        throw new Error(
          '[@nacelle/shopify-checkout]: missing required parameters. ' +
            'Either use both `myshopifyDomain` and `storefrontApiVersion`, or provide a `customEndpoint`.'
        );
      }
      const domain = sanitizeShopifyDomain(myshopifyDomain || '');
      endpoint = `https://${domain}.myshopify.com/api/${storefrontApiVersion}/graphql`;
    }

    let fetcher = fetchClient;

    if (!fetcher) {
      if (typeof window !== 'undefined') {
        fetcher = window.fetch;
      } else {
        throw new Error(
          '[@nacelle/shopify-checkout] in order to create a checkout server-side, ' +
            'you must provide a fetch API-compatible `fetchClient` capable of running ' +
            'on both the client & server. Examples include `isomorphic-unfetch` and `cross-fetch`.'
        );
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
    })
      .then((res: Response) => res.json())
      .catch((err: string) => {
        throw new Error(
          `Could not complete Shopify Storefront API request:\n${err}`
        );
      });
  };

  return gqlClient;
}
