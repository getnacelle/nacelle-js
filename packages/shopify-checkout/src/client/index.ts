import { Metafield } from '@nacelle/types';
import { findCheckout, putCheckout } from '~/client/actions';
import { reconcileCustomAttributes, sanitizeShopifyDomain } from '~/utils';

import {
  CartItem,
  ShopifyCheckout,
  Attribute,
  GqlClientParams
} from '~/checkout-client.types';

export interface CreateClientParams {
  storefrontCheckoutToken: string;
  myshopifyDomain?: string;
  storefrontApiVersion?: string;
  customEndpoint?: string;
  fetchClient?: typeof fetch;
  queueToken?: string;
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
  metafields?: Metafield[];
  note?: string;
}

export type ProcessCheckout = (
  params: ProcessCheckoutParams
) => Promise<void | ShopifyCheckout>;

export interface CheckoutClient {
  get: GetCheckout;
  process: ProcessCheckout;
}

export default function createShopifyCheckoutClient({
  storefrontCheckoutToken,
  myshopifyDomain,
  storefrontApiVersion,
  customEndpoint,
  queueToken,
  ...params
}: CreateClientParams): CheckoutClient {
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

  async function getCheckout({
    checkoutId
  }: GetCheckoutParams): Promise<ShopifyCheckout | void> {
    return await findCheckout({ gqlClient, id: checkoutId });
  }

  async function processCheckout({
    cartItems,
    checkoutId,
    note,
    ...params
  }: ProcessCheckoutParams): Promise<ShopifyCheckout | void> {
    const customAttributes = reconcileCustomAttributes({
      customAttributes: params.customAttributes,
      metafields: params.metafields
    });

    await putCheckout({
      gqlClient,
      lineItems: cartItems,
      checkoutId,
      customAttributes,
      note,
      queueToken
    });
  }

  const checkoutClient: CheckoutClient = {
    get: getCheckout,
    process: processCheckout
  };

  return checkoutClient;
}
