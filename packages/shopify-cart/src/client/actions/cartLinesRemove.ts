import mutations from '../../graphql/mutations';
import { formatCartResponse } from '../../utils';
import { CartResponse, CartFragmentResponse } from '../../types/cart.type';
import {
  CartLinesRemovePayload,
  MutationCartLinesRemoveArgs
} from '../../types/shopify.type';
import { GqlClient } from '../../cart-client.types';

export interface CartLinesRemoveParams {
  gqlClient: GqlClient;
  cartId: string;
  lineIds: Array<string>;
}

export type CartLinesRemoveResponse = CartLinesRemovePayload &
  CartFragmentResponse;

export interface MutationCartLinesRemoveResponse {
  cartLinesRemove: CartLinesRemoveResponse;
}

export default async function cartLinesRemove({
  gqlClient,
  cartId,
  lineIds
}: CartLinesRemoveParams): Promise<void | CartResponse> {
  try {
    const shopifyResponse = await gqlClient<
      MutationCartLinesRemoveArgs,
      MutationCartLinesRemoveResponse
    >({
      query: mutations.CART_LINE_REMOVE,
      variables: { cartId, lineIds }
    }).catch((err) => {
      throw new Error(err);
    });

    return formatCartResponse({
      cart: shopifyResponse.data?.cartLinesRemove.cart,
      userErrors: shopifyResponse.data?.cartLinesRemove.userErrors,
      errors: shopifyResponse?.errors
    });
  } catch (err) {
    throw new Error(String(err));
  }
}
