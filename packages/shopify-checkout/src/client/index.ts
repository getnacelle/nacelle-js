import { Metafield } from '@nacelle/types';
import { findCheckout, putCheckout } from '~/client/actions';
import { createGqlClient, metafieldsToCustomAttributes } from '~/utils';
import { CartItem, ShopifyCheckout } from '~/checkout-client.types';

export interface CreateClientParams {
  storefrontCheckoutToken: string;
  storefrontApiVersion?: string;
  myshopifyDomain?: string;
  customEndpoint?: string;
  queueToken?: string;
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
  queueToken,
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
    checkoutId
  }: GetCheckoutParams): Promise<ShopifyCheckout | void> {
    return await findCheckout({ gqlClient, id: checkoutId });
  }

  /**
   * Creates a Shopify checkout, or updates an existing Shopify checkout
   * if a valid `checkoutId` is provided.
   */
  async function processCheckout({
    cartItems,
    checkoutId,
    metafields,
    note
  }: ProcessCheckoutParams): Promise<ShopifyCheckout | void> {
    const customAttributes = metafieldsToCustomAttributes({ metafields });
    const lineItems = cartItems.map((cartItem) => {
      return {
        ...cartItem,
        customAttributes: metafieldsToCustomAttributes({
          metafields: cartItem.metafields
        })
      };
    });

    await putCheckout({
      gqlClient,
      lineItems,
      checkoutId,
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
