import mutations from '../../graphql/mutations';
import { formatCartResponse } from '../../utils';
import { CartResponse, CartFragmentResponse } from '../../types/cart.type';
import {
  CartDiscountCodesUpdatePayload,
  MutationCartDiscountCodesUpdateArgs
} from '../../types/shopify.type';
import { GqlClient } from '../../cart-client.types';

export interface CreateDiscountCodesUpdateParams {
  gqlClient: GqlClient;
  cartId: string;
  discountCodes?: string[];
}

export type CartDiscountCodesUpdateResponse = CartDiscountCodesUpdatePayload &
  CartFragmentResponse;

export interface MutationCartDiscountCodesUpdateResponse {
  cartDiscountCodesUpdate: CartDiscountCodesUpdateResponse;
}

export default async function cartDiscountCodesUpdate({
  gqlClient,
  cartId,
  discountCodes
}: CreateDiscountCodesUpdateParams): Promise<void | CartResponse> {
  try {
    const shopifyResponse = await gqlClient<
      MutationCartDiscountCodesUpdateArgs,
      MutationCartDiscountCodesUpdateResponse
    >({
      query: mutations.CART_DISCOUNT_CODES_UPDATE,
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
