import { CartResponse } from '../types/cart.type';
import { Cart_CartFragment } from '../types/shopify.type';
import { cartFromGql } from './';

export type FormatCartResponseParams = Pick<
  CartResponse,
  'errors' | 'userErrors'
> & {
  cart: Cart_CartFragment | undefined;
};

/**
 * Convert a `shopifyResponse` from a Storefront GraphQL response to a `CartResponse`
 * @param params
 * @returns Formatted `Cart` object
 */
export default function formatCartResponse({
  cart,
  userErrors,
  errors
}: FormatCartResponseParams): CartResponse {
  const cartResponse: CartResponse = {
    cart: null,
    userErrors: null,
    errors: null
  };

  cartResponse.errors = errors ?? null;

  if (userErrors?.length) {
    cartResponse.userErrors = userErrors;
  }

  if (cart) {
    cartResponse.cart = cartFromGql({ cart });
  }

  return cartResponse;
}
