import mutations from '../../graphql/mutations';
import { handleShopifyError, cartFromGql } from '../../utils';
import type { Cart, CartFragmentResponse } from '../../types/cart.type';
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
}: CartLinesAddParams): Promise<void | Cart> {
  try {
    const cartResponse = await gqlClient<
      MutationCartLinesAddArgs,
      MutationCartLinesAddResponse
    >({
      query: mutations.CART_LINE_ADD(customFragments),
      variables: { cartId, lines }
    }).catch((err) => {
      throw new Error(err);
    });

    const errs = cartResponse.data?.cartLinesAdd.userErrors;

    if (errs?.length) {
      handleShopifyError(errs, { caller: 'cartLinesAdd' });
    }

    const cart = cartResponse.data?.cartLinesAdd.cart;

    if (cart) {
      return cartFromGql({ cart });
    }
  } catch (err) {
    throw new Error(String(err));
  }
}
