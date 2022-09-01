import {
  cart,
  cartAttributesUpdate,
  cartBuyerIdentityUpdate,
  cartCreate,
  cartDiscountCodesUpdate,
  cartLinesAdd,
  cartLinesUpdate,
  cartLinesRemove,
  cartNoteUpdate
} from './actions';
import { createGqlClient, sanitizeFragments } from '../utils';
import fragments from '../graphql/fragments';
import type { CartResponse } from '../types/cart.type';
import type {
  AttributeInput,
  CartInput,
  CartBuyerIdentityInput,
  CartLineInput,
  CartLineUpdateInput
} from '../types/shopify.type';

export type UserSuppliedFragmentType = Exclude<
  keyof typeof fragments,
  'CART' | 'MERCHANDISE'
>;
export type CustomFragments = Partial<Record<UserSuppliedFragmentType, string>>;

export interface CreateClientParams {
  shopifyStorefrontAccessToken: string;
  customFragments?: CustomFragments;
  fetchClient?: typeof fetch;
  shopifyCustomEndpoint?: string;
  shopifyShopId?: string;
}

type FetchCart = (params: { cartId: string }) => Promise<CartResponse | void>;

type CartAttributesUpdate = (params: {
  cartId: string;
  attributes: AttributeInput[];
}) => Promise<CartResponse | void>;

type CartBuyerIdentityUpdate = (params: {
  cartId: string;
  buyerIdentity: CartBuyerIdentityInput;
}) => Promise<CartResponse | void>;

type CartCreate = (params: CartInput) => Promise<CartResponse | void>;

type CartDiscountCodesUpdate = (params: {
  cartId: string;
  discountCodes?: string[];
}) => Promise<CartResponse | void>;

type CartLinesAdd = (params: {
  cartId: string;
  lines: Array<CartLineInput>;
}) => Promise<CartResponse | void>;

type CartLinesUpdate = (params: {
  cartId: string;
  lines: Array<CartLineUpdateInput>;
}) => Promise<CartResponse | void>;

type CartLinesRemove = (params: {
  cartId: string;
  lineIds: Array<string>;
}) => Promise<CartResponse | void>;

type CartNoteUpdate = (params: {
  cartId: string;
  note: string;
}) => Promise<CartResponse | void>;

export interface CartClient {
  /**
   * Fetches an existing Shopify Cart.
   * @param {string} cartId Shopify cart id
   * @returns {object} Shopify cart object
   */
  cart: FetchCart;
  /**
   * Update attributes on an existing Shopify Cart.
   * @param {string} cartId Shopify cart id
   * @param {array} attributes Attributes to set on cart
   * @returns {object} Shopify cart object
   */
  cartAttributesUpdate: CartAttributesUpdate;
  /**
   * Update buyer on an existing Shopify Cart.
   * @param {string} cartId Shopify cart id
   * @param {object} buyerIdentity Buyer identity to set on cart
   * @returns {object} Shopify cart object
   */
  cartBuyerIdentityUpdate: CartBuyerIdentityUpdate;
  /**
   * Create a new Shopify Cart.
   * @param {string} cartId Shopify cart id
   * @param {array} attributes Attributes to set on cart
   * @param {object} buyerIdentity Buyer identity to set on cart
   * @param {array} discountCodes Discount codes to set on cart
   * @returns {object} Shopify cart object
   */
  cartCreate: CartCreate;
  /**
   * Update discounts on an existing Shopify Cart.
   * @param {string} cartId Shopify cart id
   * @param {array} discountCodes Discount codes to set on cart
   * @returns {object} Shopify cart object
   */
  cartDiscountCodesUpdate: CartDiscountCodesUpdate;
  /**
   * Add line items to cart.
   * @param {string} cartId Shopify cart id
   * @param {array} lines Line items to add to cart
   * @returns {object} Shopify cart object
   */
  cartLinesAdd: CartLinesAdd;
  /**
   * Update line items in cart.
   * @param {string} cartId Shopify cart id
   * @param {array} lines Line items to update on cart
   * @returns {object} Shopify cart object
   */
  cartLinesUpdate: CartLinesUpdate;
  /**
   * Remove line items from cart.
   * @param {string} cartId Shopify cart id
   * @param {array} linesIds Line item ids to remove from cart
   * @returns {object} Shopify cart object
   */
  cartLinesRemove: CartLinesRemove;
  /**
   * Update note on a Shopify Cart.
   * @param {string} cartId Shopify cart id
   * @param {string} note Note to set on cart
   * @returns {object} Shopify cart object
   */
  cartNoteUpdate: CartNoteUpdate;
}

/**
 * Create a Shopify cart client that can:
 * - `cartBuyerIdentityUpdate`: update buyer on an existing Shopify Cart
 * - `cartCreate`: create a new Shopify Cart
 * - `cartDiscountCodesUpdate`: update discounts on an existing Shopify Cart
 * - `cartNoteUpdate`: update note on an existing Shopify Cart
 */
export default function createShopifyCartClient({
  shopifyShopId,
  shopifyStorefrontAccessToken,
  shopifyCustomEndpoint,
  fetchClient,
  customFragments
}: CreateClientParams): CartClient {
  const gqlClient = createGqlClient({
    shopifyShopId,
    shopifyStorefrontAccessToken,
    shopifyCustomEndpoint,
    fetchClient
  });
  const sanitizedCustomFragments = sanitizeFragments(customFragments);

  return {
    cart: (params: { cartId: string }): Promise<CartResponse | void> =>
      cart({ customFragments, gqlClient, ...params }),
    cartAttributesUpdate: (params: {
      cartId: string;
      attributes: AttributeInput[];
    }): Promise<CartResponse | void> =>
      cartAttributesUpdate({
        customFragments: sanitizedCustomFragments,
        gqlClient,
        ...params
      }),
    cartBuyerIdentityUpdate: (params: {
      cartId: string;
      buyerIdentity: CartBuyerIdentityInput;
    }): Promise<CartResponse | void> =>
      cartBuyerIdentityUpdate({
        customFragments: sanitizedCustomFragments,
        gqlClient,
        ...params
      }),
    cartCreate: (params: CartInput): Promise<CartResponse | void> =>
      cartCreate({
        customFragments: sanitizedCustomFragments,
        gqlClient,
        params
      }),
    cartDiscountCodesUpdate: (params: {
      cartId: string;
      discountCodes?: string[];
    }): Promise<CartResponse | void> =>
      cartDiscountCodesUpdate({
        customFragments: sanitizedCustomFragments,
        gqlClient,
        ...params
      }),
    cartLinesAdd: (params: {
      cartId: string;
      lines: Array<CartLineInput>;
    }): Promise<CartResponse | void> =>
      cartLinesAdd({
        customFragments: sanitizedCustomFragments,
        gqlClient,
        ...params
      }),
    cartLinesUpdate: (params: {
      cartId: string;
      lines: Array<CartLineUpdateInput>;
    }): Promise<CartResponse | void> =>
      cartLinesUpdate({ customFragments, gqlClient, ...params }),
    cartLinesRemove: (params: {
      cartId: string;
      lineIds: Array<string>;
    }): Promise<CartResponse | void> =>
      cartLinesRemove({
        customFragments: sanitizedCustomFragments,
        gqlClient,
        ...params
      }),
    cartNoteUpdate: (params: {
      cartId: string;
      note: string;
    }): Promise<CartResponse | void> =>
      cartNoteUpdate({ customFragments, gqlClient, ...params })
  };
}
