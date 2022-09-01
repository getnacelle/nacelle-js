import mutations from '../../graphql/mutations';
import { formatCartResponse } from '../../utils';
import type { CartResponse, CartFragmentResponse } from '../../types/cart.type';
import type { MutationFragments } from '../../graphql/mutations';
import type {
  CartLineInput,
  CartLinesAddPayload,
  MutationCartLinesAddArgs
} from '../../types/shopify.type';
import type { GqlClient } from '../../cart-client.types';

export interface CartLinesAddParams {
  cartId: string;
  gqlClient: GqlClient;
  lines: Array<CartLineInput>;
  customFragments?: MutationFragments;
}

export type CartLinesAddResponse = CartLinesAddPayload & CartFragmentResponse;

export interface MutationCartLinesAddResponse {
  cartLinesAdd: CartLinesAddResponse;
}

export default async function cartLinesAdd({
  cartId,
  customFragments,
  gqlClient,
  lines
}: CartLinesAddParams): Promise<void | CartResponse> {
  try {
    const shopifyResponse = await gqlClient<
      MutationCartLinesAddArgs,
      MutationCartLinesAddResponse
    >({
      query: mutations.CART_LINE_ADD(customFragments),
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
