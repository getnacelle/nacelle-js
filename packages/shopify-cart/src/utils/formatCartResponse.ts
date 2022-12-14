import { cartFromGql } from './';
import type { CartResponse } from '../types/cart.type';
import type { Cart_CartFragment } from '../types/shopify.type';

export type FormatCartResponseParams = Pick<
  CartResponse,
  'errors' | 'userErrors'
> & {
  cart: Cart_CartFragment | undefined | null;
  shopifyShopId: string;
  locale: string;
};

/**
 * Convert a `shopifyResponse` from a Storefront GraphQL response to a `CartResponse`
 * @param params
 * @returns Formatted `Cart` object
 */
export default function formatCartResponse({
  cart,
  userErrors,
  errors,
  shopifyShopId,
  locale
}: FormatCartResponseParams): CartResponse {
  const cartResponse: CartResponse = {
    cart: null,
    userErrors: null,
    errors: null
  };

  if (errors?.length) {
    cartResponse.errors = errors;
  }

  if (userErrors?.length) {
    cartResponse.userErrors = userErrors;
  }

  if (cart) {
    cartResponse.cart = cartFromGql({
      cart,
      shopifyShopId,
      locale
    });
  }

  return cartResponse;
}
