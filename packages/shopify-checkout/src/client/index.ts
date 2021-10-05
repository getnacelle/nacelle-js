import { findCheckout, putCheckout } from '../client/actions';
import { FindCheckoutParams } from '../client/actions/findCheckout';
import { PutCheckoutParams } from '../client/actions/putCheckout';
import {
  cartItemsToCheckoutItems,
  createGqlClient,
  metafieldsToCustomAttributes
} from '../utils';
import { CartItem, Metafield, ShopifyCheckout } from '../checkout-client.types';

export interface CreateClientParams {
  storefrontCheckoutToken: string;
  storefrontApiVersion?: string;
  myshopifyDomain?: string;
  customEndpoint?: string;
  fetchClient?: typeof fetch;
}

export type GetCheckoutParams = Pick<FindCheckoutParams, 'id'>;

export type GetCheckout = (
  params: GetCheckoutParams
) => Promise<ShopifyCheckout | void>;

export type ProcessCheckoutParams = Pick<
  PutCheckoutParams,
  'id' | 'note' | 'queueToken'
> & { cartItems?: CartItem[]; metafields?: Metafield[] };

export type ProcessCheckout = (
  params: ProcessCheckoutParams
) => Promise<void | ShopifyCheckout>;

export interface CheckoutClient {
  /**
   * Retrieve a previously-created Shopify checkout.
   */
  get: GetCheckout;
  /**
   * Creates a Shopify checkout, or updates an existing Shopify checkout
   * if a valid `checkoutId` is provided.
   */
  process: ProcessCheckout;
}

/**
 * Create a Shopify checkout client that can:
 * - `get` an existing Shopify checkout
 * - `process` a new Shopify checkout, or update an existing Shopify checkout
 */
export default function createShopifyCheckoutClient({
  storefrontCheckoutToken,
  myshopifyDomain,
  storefrontApiVersion,
  customEndpoint,
  fetchClient
}: CreateClientParams): CheckoutClient {
  const gqlClient = createGqlClient({
    customEndpoint,
    fetchClient,
    myshopifyDomain,
    storefrontApiVersion,
    storefrontCheckoutToken
  });

  /**
   * Retrieves a previously-created Shopify checkout.
   */
  async function getCheckout({
    id
  }: GetCheckoutParams): Promise<ShopifyCheckout | void> {
    return await findCheckout({ gqlClient, id });
  }

  async function processCheckout({
    cartItems,
    id,
    metafields,
    note,
    queueToken
  }: ProcessCheckoutParams): Promise<ShopifyCheckout | void> {
    const lineItems = cartItems?.length
      ? cartItemsToCheckoutItems({ cartItems })
      : undefined;

    const customAttributes = metafields?.length
      ? metafieldsToCustomAttributes({ metafields })
      : undefined;

    return await putCheckout({
      gqlClient,
      lineItems,
      id,
      customAttributes,
      note,
      queueToken
    });
  }

  return {
    get: getCheckout,
    process: processCheckout
  };
}
