import { findCheckout, putCheckout } from '~/client/actions';
import { sanitizeShopifyDomain } from '~/utils';

import {
  CartItem,
  ShopifyCheckout,
  Attribute,
  GqlClient,
  GqlClientParams
} from '~/checkout-client.types';

export interface CreateClientParams {
  storefrontCheckoutToken: string;
  myshopifyDomain?: string;
  storefrontApiVersion?: string;
  customEndpoint?: string;
  fetchClient?: typeof fetch;
}

export interface GetCheckoutParams {
  checkoutId: string;
}

export type GetCheckout = (
  params: GetCheckoutParams
) => Promise<ShopifyCheckout | void>;

export interface ProcessCheckoutParams {
  cartItems: CartItem[];
  checkoutId?: string;
  customAttributes?: Attribute[];
  note?: string;
}

export type ProcessCheckout = (
  params: ProcessCheckoutParams
) => Promise<void | ShopifyCheckout>;

export interface CheckoutClientParams {
  gqlClient: GqlClient;
}

export interface CheckoutClient {
  checkout: {
    get: GetCheckout;
    process: ProcessCheckout;
  };
}

export function checkoutClient({
  gqlClient
}: CheckoutClientParams): CheckoutClient {
  const get: GetCheckout = async ({ checkoutId }) =>
    await findCheckout({ gqlClient, id: checkoutId });

  const process: ProcessCheckout = async ({
    cartItems,
    checkoutId,
    customAttributes,
    note
  }) =>
    await putCheckout({
      gqlClient,
      cartItems,
      checkoutId,
      customAttributes,
      note
    });

  return {
    checkout: {
      get,
      process
    }
  };
}

export default function createShopifyCheckoutClient(
  params: CreateClientParams
): CheckoutClient {
  const {
    storefrontCheckoutToken,
    myshopifyDomain,
    storefrontApiVersion,
    customEndpoint
  } = params;

  const gqlClient = ({ query, variables }: GqlClientParams) => {
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

    let fetchClient = params.fetchClient;

    if (!fetchClient) {
      if (typeof window !== 'undefined') {
        fetchClient = window.fetch;
      } else {
        throw new Error(
          '[@nacelle/shopify-checkout] in order to create a checkout server-side, ' +
            'you must provide a fetch API-compatible `fetchClient` capable of running ' +
            'on both the client & server. Examples include `isomorphic-unfetch` and `cross-fetch`.'
        );
      }
    }

    return fetchClient(endpoint, {
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

  return checkoutClient({ gqlClient });
}
