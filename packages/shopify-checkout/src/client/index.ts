import {
  findCheckout,
  putCheckout,
  applyDiscount,
  removeDiscount
} from '../client/actions';
import { FindCheckoutParams } from '../client/actions/findCheckout';
import { PutCheckoutParams } from '../client/actions/putCheckout';
import { ApplyDiscountParams } from '../client/actions/applyDiscount';
import { RemoveDiscountParams } from '../client/actions/removeDiscount';
import {
  cartItemsToCheckoutItems,
  createGqlClient,
  metafieldsToCustomAttributes
} from '../utils';
import { CartItem, Metafield, ShopifyCheckout } from '../checkout-client.types';

export interface CreateClientParams {
  storefrontCheckoutToken: string;
  myshopifyDomain?: string;
  customEndpoint?: string;
  fetchClient?: typeof fetch;
}

export type GetCheckoutParams = Pick<FindCheckoutParams, 'id'>;
export type DiscountApplyParams = Omit<ApplyDiscountParams, 'gqlClient'>;
export type DiscountRemoveParams = Omit<RemoveDiscountParams, 'gqlClient'>;

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

export type ApplyDiscount = (
  params: DiscountApplyParams
) => Promise<void | ShopifyCheckout>;

export type RemoveDiscount = (
  params: DiscountRemoveParams
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
  /**
   * Applies and validate discount code
   */
  discountApply: ApplyDiscount;
  /**
   * Applies and validate discount code
   */
  discountRemove: RemoveDiscount;
}

/**
 * Create a Shopify checkout client that can:
 * - `get` an existing Shopify checkout
 * - `process` a new Shopify checkout, or update an existing Shopify checkout
 */
export default function createShopifyCheckoutClient({
  storefrontCheckoutToken,
  myshopifyDomain,
  customEndpoint,
  fetchClient
}: CreateClientParams): CheckoutClient {
  const gqlClient = createGqlClient({
    customEndpoint,
    fetchClient,
    myshopifyDomain,
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

  async function discountApply({
    id,
    discountCode,
    queueToken
  }: DiscountApplyParams): Promise<ShopifyCheckout | void> {
    return await applyDiscount({ gqlClient, id, discountCode, queueToken });
  }

  async function discountRemove({
    id,
    queueToken
  }: DiscountRemoveParams): Promise<ShopifyCheckout | void> {
    return await removeDiscount({ gqlClient, id, queueToken });
  }

  return {
    get: getCheckout,
    process: processCheckout,
    discountApply,
    discountRemove
  };
}
