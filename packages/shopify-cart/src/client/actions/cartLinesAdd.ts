import mutations from '../../graphql/mutations';
import { formatCartResponse } from '../../utils';
import { CartResponse, CartFragmentResponse } from '../../types/cart.type';
import {
  CartLineInput,
  CartLinesAddPayload,
  MutationCartLinesAddArgs
} from '../../types/shopify.type';
import { GqlClient } from '../../cart-client.types';

export interface CartLinesAddParams {
  gqlClient: GqlClient;
  cartId: string;
  lines: Array<CartLineInput>;
}

export type CartLinesAddResponse = CartLinesAddPayload & CartFragmentResponse;

export interface MutationCartLinesAddResponse {
  cartLinesAdd: CartLinesAddResponse;
}

export default async function cartLinesAdd({
  gqlClient,
  cartId,
  lines
}: CartLinesAddParams): Promise<void | CartResponse> {
  try {
    const shopifyResponse = await gqlClient<
      MutationCartLinesAddArgs,
      MutationCartLinesAddResponse
    >({
      query: mutations.CART_LINE_ADD,
      variables: { cartId, lines }
    }).catch((err) => {
      throw new Error(err);
    });

    return formatCartResponse({
      cart: shopifyResponse.data?.cartLinesAdd.cart,
      userErrors: shopifyResponse.data?.cartLinesAdd.userErrors,
      errors: shopifyResponse.errors
    });
  } catch (err) {
    throw new Error(String(err));
  }
}
