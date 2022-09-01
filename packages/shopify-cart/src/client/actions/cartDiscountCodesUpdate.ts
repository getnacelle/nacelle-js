import mutations from '../../graphql/mutations';
import { formatCartResponse } from '../../utils';
import type { CartResponse, CartFragmentResponse } from '../../types/cart.type';
import type { MutationFragments } from '../../graphql/mutations';
import type {
  CartDiscountCodesUpdatePayload,
  MutationCartDiscountCodesUpdateArgs
} from '../../types/shopify.type';
import type { GqlClient } from '../../cart-client.types';

export interface CreateDiscountCodesUpdateParams {
  cartId: string;
  gqlClient: GqlClient;
  customFragments?: MutationFragments;
  discountCodes?: string[];
}

export type CartDiscountCodesUpdateResponse = CartDiscountCodesUpdatePayload &
  CartFragmentResponse;

export interface MutationCartDiscountCodesUpdateResponse {
  cartDiscountCodesUpdate: CartDiscountCodesUpdateResponse;
}

export default async function cartDiscountCodesUpdate({
  cartId,
  customFragments,
  discountCodes,
  gqlClient
}: CreateDiscountCodesUpdateParams): Promise<void | CartResponse> {
  try {
    const shopifyResponse = await gqlClient<
      MutationCartDiscountCodesUpdateArgs,
      MutationCartDiscountCodesUpdateResponse
    >({
      query: mutations.CART_DISCOUNT_CODES_UPDATE(customFragments),
      variables: { cartId, discountCodes }
    }).catch((err) => {
      throw new Error(err);
    });

    return formatCartResponse({
      cart: shopifyResponse.data?.cartDiscountCodesUpdate.cart,
      userErrors: shopifyResponse.data?.cartDiscountCodesUpdate.userErrors,
      errors: shopifyResponse.errors
    });
  } catch (err) {
    throw new Error(String(err));
  }
}
