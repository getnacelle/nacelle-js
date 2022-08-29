import mutations from '../../graphql/mutations';
import { formatCartResponse } from '../../utils';
import { CartResponse, CartFragmentResponse } from '../../types/cart.type';
import {
  CartLineUpdateInput,
  CartLinesUpdatePayload,
  MutationCartLinesUpdateArgs
} from '../../types/shopify.type';
import { GqlClient } from '../../cart-client.types';

export interface CartLinesUpdateParams {
  gqlClient: GqlClient;
  cartId: string;
  lines: Array<CartLineUpdateInput>;
}

export type CartLinesUpdateResponse = CartLinesUpdatePayload &
  CartFragmentResponse;

export interface MutationCartLinesUpdateResponse {
  cartLinesUpdate: CartLinesUpdateResponse;
}

export default async function cartLinesUpdate({
  gqlClient,
  cartId,
  lines
}: CartLinesUpdateParams): Promise<void | CartResponse> {
  try {
    const shopifyResponse = await gqlClient<
      MutationCartLinesUpdateArgs,
      MutationCartLinesUpdateResponse
    >({
      query: mutations.CART_LINE_UPDATE,
      variables: { cartId, lines }
    }).catch((err) => {
      throw new Error(err);
    });

    return formatCartResponse({
      cart: shopifyResponse.data?.cartLinesUpdate.cart,
      userErrors: shopifyResponse.data?.cartLinesUpdate.userErrors,
      errors: shopifyResponse?.errors
    });
  } catch (err) {
    throw new Error(String(err));
  }
}
