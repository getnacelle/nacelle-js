import { Cart, CartFragmentResponse } from '../../types/cart.type';
import mutations from '../../graphql/mutations';
import { handleShopifyError, cartFromGql } from '../../utils';
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
}: CartLinesUpdateParams): Promise<void | Cart> {
  try {
    const cartResponse = await gqlClient<
      MutationCartLinesUpdateArgs,
      MutationCartLinesUpdateResponse
    >({
      query: mutations.CART_LINE_UPDATE,
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
