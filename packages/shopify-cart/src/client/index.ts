import { createGqlClient } from '../utils';
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
import fragments from '../graphql/fragments';
import type { Cart } from '../types/cart.type';
import type {
  AttributeInput,
  CartInput,
  CartBuyerIdentityInput,
  CartLineInput,
  CartLineUpdateInput
} from '../types/shopify.type';

export type UserSuppliedFragmentType = Exclude<keyof typeof fragments, 'CART'>;
export type CustomFragments = Record<UserSuppliedFragmentType, string>;

export interface CreateClientParams {
  shopifyShopId?: string;
  shopifyStorefrontAccessToken: string;
  shopifyCustomEndpoint?: string;
  customFragments?: CustomFragments;
  fetchClient?: typeof fetch;
}

type FetchCart = (params: { cartId: string }) => Promise<Cart | void>;

type CartAttributesUpdate = (params: {
  cartId: string;
  attributes: AttributeInput[];
}) => Promise<Cart | void>;

type CartBuyerIdentityUpdate = (params: {
  cartId: string;
  buyerIdentity: CartBuyerIdentityInput;
}) => Promise<Cart | void>;

type CartCreate = (params: CartInput) => Promise<Cart | void>;

type CartDiscountCodesUpdate = (params: {
  cartId: string;
  discountCodes?: string[];
}) => Promise<Cart | void>;

type CartLinesAdd = (params: {
  cartId: string;
  lines: Array<CartLineInput>;
}) => Promise<Cart | void>;

type CartLinesUpdate = (params: {
  cartId: string;
  lines: Array<CartLineUpdateInput>;
}) => Promise<Cart | void>;

type CartLinesRemove = (params: {
  cartId: string;
  lineIds: Array<string>;
}) => Promise<Cart | void>;

type CartNoteUpdate = (params: {
  cartId: string;
  note: string;
}) => Promise<Cart | void>;

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
  customFragments,
  fetchClient
}: CreateClientParams): CartClient {
  const gqlClient = createGqlClient({
    shopifyShopId,
    shopifyStorefrontAccessToken,
    shopifyCustomEndpoint,
    fetchClient
  });

  return {
    cart: (params: { cartId: string }): Promise<Cart | void> =>
      cart({ customFragments, gqlClient, ...params }),
    cartAttributesUpdate: (params: {
      cartId: string;
      attributes: AttributeInput[];
    }): Promise<Cart | void> =>
      cartAttributesUpdate({ customFragments, gqlClient, ...params }),
    cartBuyerIdentityUpdate: (params: {
      cartId: string;
      buyerIdentity: CartBuyerIdentityInput;
    }): Promise<Cart | void> =>
      cartBuyerIdentityUpdate({ customFragments, gqlClient, ...params }),
    cartCreate: (params: CartInput): Promise<Cart | void> =>
      cartCreate({ customFragments, gqlClient, params }),
    cartDiscountCodesUpdate: (params: {
      cartId: string;
      discountCodes?: string[];
    }): Promise<Cart | void> =>
      cartDiscountCodesUpdate({ customFragments, gqlClient, ...params }),
    cartLinesAdd: (params: {
      cartId: string;
      lines: Array<CartLineInput>;
    }): Promise<Cart | void> => cartLinesAdd({ gqlClient, ...params }),
    cartLinesUpdate: (params: {
      cartId: string;
      lines: Array<CartLineUpdateInput>;
    }): Promise<Cart | void> =>
      cartLinesUpdate({ customFragments, gqlClient, ...params }),
    cartLinesRemove: (params: {
      cartId: string;
      lineIds: Array<string>;
    }): Promise<Cart | void> =>
      cartLinesRemove({
        customFragments,
        gqlClient,
        ...params
      }),
    cartNoteUpdate: (params: {
      cartId: string;
      note: string;
    }): Promise<Cart | void> =>
      cartNoteUpdate({ customFragments, gqlClient, ...params })
  };
}
