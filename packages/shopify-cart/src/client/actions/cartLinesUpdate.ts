import mutations from '../../graphql/mutations';
import { handleShopifyError, cartFromGql } from '../../utils';
import type { Cart, CartFragmentResponse } from '../../types/cart.type';
import type { MutationFragments } from '../../graphql/mutations';
import type {
  CartLineUpdateInput,
  CartLinesUpdatePayload,
  MutationCartLinesUpdateArgs
} from '../../types/shopify.type';
import type { GqlClient } from '../../cart-client.types';

export interface CartLinesUpdateParams {
  cartId: string;
  gqlClient: GqlClient;
  lines: Array<CartLineUpdateInput>;
  customFragments?: MutationFragments;
}

export type CartLinesUpdateResponse = CartLinesUpdatePayload &
  CartFragmentResponse;

export interface MutationCartLinesUpdateResponse {
  cartLinesUpdate: CartLinesUpdateResponse;
}

export default async function cartLinesUpdate({
  cartId,
  customFragments,
  gqlClient,
  lines
}: CartLinesUpdateParams): Promise<void | Cart> {
  try {
    const cartResponse = await gqlClient<
      MutationCartLinesUpdateArgs,
      MutationCartLinesUpdateResponse
    >({
      query: mutations.CART_LINE_UPDATE(customFragments),
      variables: { cartId, lines }
    }).catch((err) => {
      throw new Error(err);
    });

    const errs = cartResponse.data?.cartLinesUpdate.userErrors;

    if (errs?.length) {
      handleShopifyError(errs, { caller: 'cartLinesUpdate' });
    }

    const cart = cartResponse.data?.cartLinesUpdate.cart;

    if (cart) {
      return cartFromGql({ cart });
    }
  } catch (err) {
    throw new Error(String(err));
  }
}
