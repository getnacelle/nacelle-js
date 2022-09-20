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
import type {
  CartResponse,
  NacelleCartInput,
  NacelleCartLineItemInput,
  NacelleCartLineItemUpdateInput
} from '../types/cart.type';
import type {
  AttributeInput,
  CartBuyerIdentityInput,
  CountryCode,
  LanguageCode
} from '../types/shopify.type';
import type { CustomFragments } from '../graphql/fragments';

export interface CreateClientParams {
  shopifyStorefrontAccessToken: string;
  customFragments?: CustomFragments;
  fetchClient?: typeof fetch;
  shopifyCustomEndpoint?: string;
  shopifyShopId?: string;
  language?: LanguageCode;
  country?: CountryCode;
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

type CartCreate = (params: NacelleCartInput) => Promise<CartResponse | void>;

type CartDiscountCodesUpdate = (params: {
  cartId: string;
  discountCodes?: string[];
}) => Promise<CartResponse | void>;

type CartLinesAdd = (params: {
  cartId: string;
  lines: Array<NacelleCartLineItemInput>;
}) => Promise<CartResponse | void>;

type CartLinesUpdate = (params: {
  cartId: string;
  lines: Array<NacelleCartLineItemUpdateInput>;
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
  customFragments,
  language = 'EN',
  country = 'ZZ'
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
      cart({
        customFragments,
        gqlClient,
        language,
        country,
        ...params
      }),
    cartAttributesUpdate: (params: {
      cartId: string;
      attributes: AttributeInput[];
    }): Promise<CartResponse | void> =>
      cartAttributesUpdate({
        customFragments: sanitizedCustomFragments,
        gqlClient,
        language,
        country,
        ...params
      }),
    cartBuyerIdentityUpdate: (params: {
      cartId: string;
      buyerIdentity: CartBuyerIdentityInput;
    }): Promise<CartResponse | void> =>
      cartBuyerIdentityUpdate({
        customFragments: sanitizedCustomFragments,
        gqlClient,
        language: language,
        country: country,
        ...params
      }),
    cartCreate: (params: NacelleCartInput): Promise<CartResponse | void> =>
      cartCreate({
        customFragments: sanitizedCustomFragments,
        gqlClient,
        language,
        country,
        params
      }),
    cartDiscountCodesUpdate: (params: {
      cartId: string;
      discountCodes?: string[];
    }): Promise<CartResponse | void> =>
      cartDiscountCodesUpdate({
        customFragments: sanitizedCustomFragments,
        gqlClient,
        language,
        country,
        ...params
      }),
    cartLinesAdd: (params: {
      cartId: string;
      lines: Array<NacelleCartLineItemInput>;
    }): Promise<CartResponse | void> =>
      cartLinesAdd({
        customFragments: sanitizedCustomFragments,
        gqlClient,
        language,
        country,
        ...params
      }),
    cartLinesUpdate: (params: {
      cartId: string;
      lines: Array<NacelleCartLineItemUpdateInput>;
    }): Promise<CartResponse | void> =>
      cartLinesUpdate({
        customFragments,
        gqlClient,
        language,
        country,
        ...params
      }),
    cartLinesRemove: (params: {
      cartId: string;
      lineIds: Array<string>;
    }): Promise<CartResponse | void> =>
      cartLinesRemove({
        customFragments: sanitizedCustomFragments,
        gqlClient,
        language,
        country,
        ...params
      }),
    cartNoteUpdate: (params: {
      cartId: string;
      note: string;
    }): Promise<CartResponse | void> =>
      cartNoteUpdate({
        customFragments,
        gqlClient,
        language,
        country,
        ...params
      })
  };
}
