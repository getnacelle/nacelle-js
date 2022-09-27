import { Cart } from '../types/cart.type';
import { Cart_CartFragment } from '../types/shopify.type';
import transformShopifyLineToNacelleLine from './transformShopifyLineToNacelleLine';

export interface CartFromGqlParams {
  cart: Cart_CartFragment;
  shopifyShopId: string;
  locale: string;
}

/**
 * Convert a `cart` from a Shopify Storefront GraphQL response to a `Cart`
 * @param params
 * @param params.cart - the `cart` from a Shopify Storefront GraphQL response
 * @param params.shopifyShopId - the `shopifyShopId` associated with cart
 * @param params.locale - the `locale` associated with cart
 * @returns Formatted `Cart` object
 */
export default function cartFromGql({
  cart,
  shopifyShopId,
  locale
}: CartFromGqlParams): Cart {
  return {
    ...cart,
    lines: transformShopifyLineToNacelleLine({
      lines: cart.lines.nodes,
      shopifyShopId,
      locale
    }),
    note: cart.note ?? undefined
  };
}
