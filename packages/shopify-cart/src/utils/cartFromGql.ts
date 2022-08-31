import { Cart } from '../types/cart.type';
import { Cart_CartFragment } from '../types/shopify.type';

export interface CartFromGqlParams {
  cart: Cart_CartFragment;
}

/**
 * Conver a `cart` from a Storefront GraphQL response to a `Cart`
 * @param params
 * @param params.cart - the `cart` from a Storefront GraphQL response
 * @returns Formatted `Cart` object
 */
export default function cartFromGql({ cart }: CartFromGqlParams): Cart {
  return {
    ...cart,
    lines: cart.lines.nodes,
    note: cart.note ?? undefined
  };
}
