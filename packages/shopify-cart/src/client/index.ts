import { createGqlClient, sanitizeFragment } from '../utils';
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
export type CustomFragments = Partial<Record<UserSuppliedFragmentType, string>>;

export interface CreateClientParams {
  shopifyStorefrontAccessToken: string;
  customFragments?: CustomFragments;
  fetchClient?: typeof fetch;
  shopifyCustomEndpoint?: string;
  shopifyShopId?: string;
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
  fetchClient,
  customFragments
}: CreateClientParams): CartClient {
  const gqlClient = createGqlClient({
    shopifyShopId,
    shopifyStorefrontAccessToken,
    shopifyCustomEndpoint,
    fetchClient
  });

  const sanitizedCustomFragments: CustomFragments = {};

  if (customFragments) {
    // Ensure that `customFragments` matches the expected format
    if (typeof customFragments !== 'object' || Array.isArray(customFragments)) {
      throw new Error(
        "`customFragments` must be an object. Please refer to `@nacelle/shopify-cart`'s README."
      );
    }

    for (const [fragmentType, fragment] of Object.entries(customFragments)) {
      const fragmentKey = fragmentType as keyof CustomFragments;
      sanitizedCustomFragments[fragmentKey] = sanitizeFragment(
        fragment,
        fragmentKey
      );
    }
  }

  return {
    cart: (params: { cartId: string }): Promise<Cart | void> =>
      cart({ customFragments: sanitizedCustomFragments, gqlClient, ...params }),
    cartAttributesUpdate: (params: {
      cartId: string;
      attributes: AttributeInput[];
    }): Promise<Cart | void> =>
      cartAttributesUpdate({
        customFragments: sanitizedCustomFragments,
        gqlClient,
        ...params
      }),
    cartBuyerIdentityUpdate: (params: {
      cartId: string;
      buyerIdentity: CartBuyerIdentityInput;
    }): Promise<Cart | void> =>
      cartBuyerIdentityUpdate({
        customFragments: sanitizedCustomFragments,
        gqlClient,
        ...params
      }),
    cartCreate: (params: CartInput): Promise<Cart | void> =>
      cartCreate({
        customFragments: sanitizedCustomFragments,
        gqlClient,
        params
      }),
    cartDiscountCodesUpdate: (params: {
      cartId: string;
      discountCodes?: string[];
    }): Promise<Cart | void> =>
      cartDiscountCodesUpdate({
        customFragments: sanitizedCustomFragments,
        gqlClient,
        ...params
      }),
    cartLinesAdd: (params: {
      cartId: string;
      lines: Array<CartLineInput>;
    }): Promise<Cart | void> =>
      cartLinesAdd({
        customFragments: sanitizedCustomFragments,
        gqlClient,
        ...params
      }),
    cartLinesUpdate: (params: {
      cartId: string;
      lines: Array<CartLineUpdateInput>;
    }): Promise<Cart | void> =>
      cartLinesUpdate({
        customFragments: sanitizedCustomFragments,
        gqlClient,
        ...params
      }),
    cartLinesRemove: (params: {
      cartId: string;
      lineIds: Array<string>;
    }): Promise<Cart | void> =>
      cartLinesRemove({
        customFragments: sanitizedCustomFragments,
        gqlClient,
        ...params
      }),
    cartNoteUpdate: (params: {
      cartId: string;
      note: string;
    }): Promise<Cart | void> =>
      cartNoteUpdate({
        customFragments: sanitizedCustomFragments,
        gqlClient,
        ...params
      })
  };
}
